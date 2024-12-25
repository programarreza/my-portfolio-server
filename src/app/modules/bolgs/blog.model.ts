/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    image: {
      type: String,
      required: [true, "image is required"],
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

function checkAccessRestrictions(this: any, next: any) {
  this.find({ isDeleted: { $ne: true } });

  next();
}

// Applying the middleware for find, findOne, 
blogSchema.pre("find", checkAccessRestrictions);
blogSchema.pre("findOne", checkAccessRestrictions);

export const Blog = model<TBlog>("Blog", blogSchema);
