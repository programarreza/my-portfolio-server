import { z } from "zod";

const createExperienceValidationSchema = z.object({
  body: z.object({
    date: z.string({ invalid_type_error: "date is required" }),
    category: z.string({ invalid_type_error: "category is required" }),
    content: z.string({ invalid_type_error: "content is required" }),
  }),
});

const updateExperienceValidationSchema = z.object({
  body: z.object({
    date: z.string({ invalid_type_error: "date is required" }).optional(),
    category: z
      .string({ invalid_type_error: "category is required" })
      .optional(),
    content: z.string({ invalid_type_error: "content is required" }).optional(),
  }),
});

export { createExperienceValidationSchema, updateExperienceValidationSchema };
