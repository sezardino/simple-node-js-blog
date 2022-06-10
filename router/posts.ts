import { Router, Request, Response } from "express";
import { PAGE_TEMPLATES } from "../const";
import { Post } from "../models";
import { PAGE_ROUTES } from "../types";

const router = Router();

router.get(PAGE_ROUTES.POSTS, async (req: Request, res: Response) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POSTS], { title: "Posts", posts });
});

router.delete(PAGE_ROUTES.POST, async (req: Request, res: Response) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((error) => res.render(PAGE_TEMPLATES.error, { title: "Error" }));
});

router.get(PAGE_ROUTES.POST, async (req: Request, res: Response) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    res.redirect("/404");
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POST], { title: "Post", post });
});

router.get(PAGE_ROUTES.ADD_POST, (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.ADD_POST], { title: "Add New Post" });
});

router.get(PAGE_ROUTES.EDIT_POST, async (req: Request, res: Response) => {
  const neededPost = await Post.findById(req.params.id);

  if (!neededPost) {
    res.redirect(PAGE_TEMPLATES.error);
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.EDIT_POST], {
    title: "Edit Post",
    post: neededPost,
  });
});

router.post(PAGE_ROUTES.EDIT_POST, async (req: Request, res: Response) => {
  const postID = req.params.id;
  const { title, text, author } = req.body;

  await Post.findByIdAndUpdate(postID, { title, text, author });

  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
});

router.post(PAGE_ROUTES.ADD_POST, async (req: Request, res: Response) => {
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
  });

  await newPost.save();

  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
});

export { router as postsRouter };
