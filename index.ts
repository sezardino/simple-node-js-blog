import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { PAGE_ROUTES } from "./types";
import { PAGE_TEMPLATES, posts } from "./const";

dotenv.config();

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

app.get(PAGE_ROUTES.POSTS, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POSTS], { title: "Posts", posts });
});

app.get(PAGE_ROUTES.POST, (req: Request, res: Response) => {
  const postId = req.params.id;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    res.redirect("/404");
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POST], { title: "Post", post });
});

app.get(PAGE_ROUTES.ADD_POST, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.ADD_POST], { title: "Add New Post" });
});

app.post(PAGE_ROUTES.ADD_POST, (req: Request, res: Response) => {
  const newPost = {
    id: posts.length.toString(),
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    date: new Date().toLocaleDateString(),
  };

  posts.push(newPost);
  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
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
