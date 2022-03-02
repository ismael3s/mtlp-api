import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import "dotenv/config"
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { router } from "./routes";
import createConnection from "../../infra/typeorm/";

const app = express();

createConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorMiddleware);

export { app };
