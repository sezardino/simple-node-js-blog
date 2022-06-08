import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { PAGE_ROUTES } from "./types";
import { PAGE_TEMPLATES } from "./const";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

app.get(PAGE_ROUTES.HOME, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.HOME], { title: "Home" });
});

app.get(PAGE_ROUTES.POSTS, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POSTS], { title: "Posts" });
});

app.get(PAGE_ROUTES.POST, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POST], { title: "Post" });
});

app.get(PAGE_ROUTES.ADD_POST, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.ADD_POST], { title: "Add New Post" });
});

app.get(PAGE_ROUTES.CONTACT, (req: Request, res: Response) => {
  const links = [
    { link: "#", name: "Linkedin" },
    { link: "#", name: "GitHub" },
    { link: "#", name: "Website" },
  ];

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.CONTACT], {
    title: "Contact",
    links,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).render(PAGE_TEMPLATES.error, { title: "Error" });
});
