import express from "express";
import cors from "cors";
import https from "https";
import connectToMongoDB from "./db/connectToMongoDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import { createClient } from "redis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

const fetchFlightData = async (flightDirection, page = 1, allFlights = []) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "api.schiphol.nl",
      port: null,
      path: `/public-flights/flights?flightDirection=${flightDirection}&page=${page}`,
      headers: {
        ResourceVersion: "v4",
        app_id: "bf4b36d7",
        app_key: "576aefd3fb8491b8069f9f5a17d62c35",
      },
    };

    const req = https.request(options, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        const flights = JSON.parse(data).flights || [];
        allFlights.push(...flights);

        if (flights.length > 0 && page < 100) {
          fetchFlightData(flightDirection, page + 1, allFlights)
            .then(resolve)
            .catch(reject);
        } else {
          resolve(allFlights);
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};

app.get("/api/flights", async (req, res) => {
  const flightDirection = req.query.flightDirection || "D";
  const redisKey = `flights_${flightDirection}`;

  try {
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const allFlights = await fetchFlightData(flightDirection);
    await redisClient.set(redisKey, JSON.stringify(allFlights), {
      EX: 3600,
    });

    res.json({ flights: allFlights });
  } catch (error) {
    res.status(500).send(`Problem with request: ${error.message}`);
  }
});

const updateFlightData = async () => {
  const flightDirection = "D";
  const redisKey = `flights_${flightDirection}`;

  try {
    const allFlights = await fetchFlightData(flightDirection);
    await redisClient.set(redisKey, JSON.stringify(allFlights), {
      EX: 3600,
    });

    console.log("Flight data updated in Redis.");
  } catch (error) {
    console.error(`Error updating flight data: ${error.message}`);
  }
};

updateFlightData();
setInterval(updateFlightData, 3600000);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
