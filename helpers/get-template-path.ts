import path from "path";

export const getTemplatePath = (page: string) =>
  path.resolve(__dirname, "..", "..", "views", `${page}.ejs`);
