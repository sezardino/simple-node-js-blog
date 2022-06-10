import { Router } from "express";
import { contactController } from "../controller";
import { PAGE_ROUTES } from "../types";

const router = Router();

router.get(PAGE_ROUTES.CONTACT, contactController.getContact);

export { router as contactRouter };
