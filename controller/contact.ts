import { Request, Response } from "express";
import { PAGE_TEMPLATES } from "../const";
import { Contact } from "../models";
import { PAGE_ROUTES } from "../types";

const getContact = async (req: Request, res: Response) => {
  const links = await Contact.find();

  res.render(PAGE_TEMPLATES[PAGE_ROUTES.CONTACT], {
    title: "Contact",
    links,
  });
};

export const contactController = { getContact };
