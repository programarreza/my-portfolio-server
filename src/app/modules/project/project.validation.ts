import { z } from "zod";

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: "title is required" }),
    description: z.string({ invalid_type_error: "description is required" }),
    deployLink: z.string({ invalid_type_error: "deployLink is required" }),
    features: z
      .array(z.string(), {
        invalid_type_error: "features must be an array of strings",
      })
      .nonempty("features is required"),
    isDeleted: z.boolean().optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    deployLink: z.string().optional(),
    features: z.array(z.string()).optional(),
    image: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export { createProjectValidationSchema, updateProjectValidationSchema };
