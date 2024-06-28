import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import appRouter from "./src/routes/router-index.js";

config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// remove in prod
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
