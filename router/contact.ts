import { Router, Request, Response } from "express";
import { PAGE_TEMPLATES } from "../const";
import { Contact } from "../models";
import { PAGE_ROUTES } from "../types";

const router = Router();

router.get(PAGE_ROUTES.CONTACT, async (req: Request, res: Response) => {
  const links = await Contact.find();

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.CONTACT], {
    title: "Contact",
    links,
  });
});

export { router as contactRouter };
