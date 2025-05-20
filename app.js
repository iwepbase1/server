const express = require('express');
require("dotenv").config();
const logger = require("./src/logger/logger");
const mongoose = require("mongoose");
const routes = require("./src/routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

if (!process.env.DATABASE_URL || !process.env.PORT) {
    console.error("Missing required environment variables");
    process.exit(1);
  }

  app.use(bodyParser.json());

  app.use(cors({ credentials: true }));

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.statusCode || 500).send({ error: err.message });
  });

  app.use(process.env.VERSION, routes);

  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DATABASE_URL);
  
  const db = mongoose.connection;
  db.on("error", (error) => console.log("MongoDB Connection Error:", error));
  db.once("open", () => console.log("Connected to the Database"));
  
  app.listen(process.env.PORT, () => {
    console.log(`Server listening at PORT ${process.env.PORT}`);
  });
  
