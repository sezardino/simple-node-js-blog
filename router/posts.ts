import { Router } from "express";
import { PAGE_ROUTES } from "../types";
import { postsController } from "../controller";

const router = Router();

router.get(PAGE_ROUTES.POSTS, postsController.getPosts);

router.delete(PAGE_ROUTES.POST, postsController.deletePost);

router.get(PAGE_ROUTES.POST, postsController.getPost);

router.get(PAGE_ROUTES.ADD_POST, postsController.getAddPost);

router.get(PAGE_ROUTES.EDIT_POST, postsController.getEditPost);

router.post(PAGE_ROUTES.EDIT_POST, postsController.editPost);

router.post(PAGE_ROUTES.ADD_POST, postsController.addPost);

export { router as postsRouter };
