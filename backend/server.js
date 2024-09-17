const express = require("express");
const cors = require("cors");
const https = require("https");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/flights", (req, res) => {
  const options = {
    method: "GET",
    hostname: "api.schiphol.nl",
    port: null,
    path: "/public-flights/flights",
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
