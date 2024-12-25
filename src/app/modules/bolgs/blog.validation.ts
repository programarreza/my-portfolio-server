import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    content: z.string({ invalid_type_error: "content is required" }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    content: z.string({ invalid_type_error: "content is required" }).optional(),
  }),
});

export { createBlogValidationSchema, updateBlogValidationSchema };
