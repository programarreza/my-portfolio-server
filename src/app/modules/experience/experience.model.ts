import { Schema, model } from "mongoose";
import { TExperience } from "./experience.interface";

const experienceSchema = new Schema<TExperience>(
  {
    date: {
      type: String,
      required: [true, "date is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Experience = model<TExperience>("Experience", experienceSchema);
