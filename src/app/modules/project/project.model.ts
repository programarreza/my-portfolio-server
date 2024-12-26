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
    githubClientLink: {
      type: String,
      required: [true, "githubClientLink is required"],
    },
    githubServerLink: {
      type: String,
      required: [true, "githubServerLink is required"],
    },
    projectChallenges: {
      type: String,
      required: [true, "projectChallenges is required"],
    },
    improvement: {
      type: String,
      required: [true, "improvement is required"],
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Project = model<TProject>("Project", projectSchema);
