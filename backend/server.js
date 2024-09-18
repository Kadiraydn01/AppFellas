import express from "express";
import cors from "cors";
import https from "https";
import connectToMongoDB from "./db/connectToMongoDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/api/flights", (req, res) => {
  const flightDirection = req.query.flightDirection || "D";

  const options = {
    method: "GET",
    hostname: "api.schiphol.nl",
    port: null,
    path: `/public-flights/flights?flightDirection=${flightDirection}`,
    headers: {
      ResourceVersion: "v4",
      app_id: "bf4b36d7",
      app_key: "576aefd3fb8491b8069f9f5a17d62c35",
    },
  };

  https
    .request(options, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        res.json(JSON.parse(data));
      });
    })
    .on("error", (e) => {
      res.status(500).send(`Problem with request: ${e.message}`);
    })
    .end();
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
