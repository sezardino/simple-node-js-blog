import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { PAGE_ROUTES } from "./types";
import { PAGE_TEMPLATES, posts } from "./const";
import { Contact, Post } from "./models";

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

app.get(PAGE_ROUTES.POSTS, async (req: Request, res: Response) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POSTS], { title: "Posts", posts });
});

app.delete(PAGE_ROUTES.POST, async (req: Request, res: Response) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((error) => res.render(PAGE_TEMPLATES.error, { title: "Error" }));
});

app.get(PAGE_ROUTES.POST, async (req: Request, res: Response) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    res.redirect("/404");
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POST], { title: "Post", post });
});

app.get(PAGE_ROUTES.ADD_POST, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.ADD_POST], { title: "Add New Post" });
});

app.get(PAGE_ROUTES.EDIT_POST, async (req: Request, res: Response) => {
  const neededPost = await Post.findById(req.params.id);

  if (!neededPost) {
    res.redirect(PAGE_TEMPLATES.error);
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.EDIT_POST], {
    title: "Edit Post",
    post: neededPost,
  });
});

app.post(PAGE_ROUTES.EDIT_POST, async (req: Request, res: Response) => {
  const postID = req.params.id;
  const { title, text, author } = req.body;

  await Post.findByIdAndUpdate(postID, { title, text, author });

  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
});

app.post(PAGE_ROUTES.ADD_POST, async (req: Request, res: Response) => {
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
  });

  await newPost.save();

  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
});

app.get(PAGE_ROUTES.CONTACT, async (req: Request, res: Response) => {
  const links = await Contact.find();

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.CONTACT], {
    title: "Contact",
    links,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).render(PAGE_TEMPLATES.error, { title: "Error" });
});
