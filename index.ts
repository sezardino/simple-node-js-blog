import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { PAGE_ROUTES } from "./types";
import { PAGE_TEMPLATES } from "./const";
import { contactRouter, postsRouter } from "./router";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.lnxjdcd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

app.get(PAGE_ROUTES.HOME, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.HOME], { title: "Home" });
});

app.use(contactRouter);
app.use(postsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).render(PAGE_TEMPLATES.error, { title: "Error" });
});
