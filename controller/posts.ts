import { Request, Response } from "express";
import { PAGE_TEMPLATES } from "../const";
import { Post } from "../models";
import { PAGE_ROUTES } from "../types";

const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POSTS], { title: "Posts", posts });
};

const deletePost = async (req: Request, res: Response) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((error) => res.render(PAGE_TEMPLATES.error, { title: "Error" }));
};

const getPost = async (req: Request, res: Response) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    res.redirect("/404");
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.POST], { title: "Post", post });
};

const getAddPost = (req: Request, res: Response) => {
  res.render(PAGE_TEMPLATES[PAGE_ROUTES.ADD_POST], { title: "Add New Post" });
};

const getEditPost = async (req: Request, res: Response) => {
  const neededPost = await Post.findById(req.params.id);

  if (!neededPost) {
    res.redirect(PAGE_TEMPLATES.error);
  }

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.EDIT_POST], {
    title: "Edit Post",
    post: neededPost,
  });
};

const editPost = async (req: Request, res: Response) => {
  const postID = req.params.id;
  const { title, text, author } = req.body;

  await Post.findByIdAndUpdate(postID, { title, text, author });

  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
};

const addPost = async (req: Request, res: Response) => {
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
  });

  await newPost.save();

  res.redirect(PAGE_TEMPLATES[PAGE_ROUTES.POSTS]);
};

export const postsController = {
  getPosts,
  deletePost,
  getPost,
  getAddPost,
  getEditPost,
  editPost,
  addPost,
};
