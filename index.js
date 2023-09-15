import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import licenseRouter from "./routes/license.routes.js";
import userRouter from "./routes/user.routes.js";

configDotenv();

const PORT = parseInt(process.env.PORT) || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/", licenseRouter);
app.use("/user", userRouter);

app;

mongoose.connect(MONGODB_URL);

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
