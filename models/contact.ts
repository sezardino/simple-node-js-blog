import { Schema, model } from "mongoose";

export interface IContact {
  name: string;
  link: string;
}

const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },
});

export const Contact = model<IContact>("Contact", contactSchema);
