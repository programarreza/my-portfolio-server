import { Schema, model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    deployLink: {
      type: String,
      required: [true, "deployLink is required"],
    },
    features: {
      type: [String],
      required: [true, "features is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Project = model<TProject>("Project", projectSchema);
