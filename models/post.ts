import { Schema, model } from "mongoose";

export interface IPost {
  title: string;
  text: string;
  author: string;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
