import "reflect-metadata";
import "@shared/container";
import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/error.middleware";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorMiddleware);

export { app };

