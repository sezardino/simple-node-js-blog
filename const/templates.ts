import { getTemplatePath } from "../helpers";
import { PAGE_ROUTES } from "../types";

export const PAGE_TEMPLATES = {
  [PAGE_ROUTES.HOME]: getTemplatePath("index"),
  [PAGE_ROUTES.ADD_POST]: getTemplatePath("add-post"),
  [PAGE_ROUTES.CONTACT]: getTemplatePath("contact"),
  [PAGE_ROUTES.POST]: getTemplatePath("post"),
  [PAGE_ROUTES.POSTS]: getTemplatePath("posts"),
  error: getTemplatePath("error"),
};
