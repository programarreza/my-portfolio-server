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
    githubClientLink: z.string({
      invalid_type_error: "githubClientLink is required",
    }),
    githubServerLink: z.string({
      invalid_type_error: "githubServerLink is required",
    }),
    projectChallenges: z.string({
      invalid_type_error: "projectChallenges is required",
    }),
    improvement: z.string({
      invalid_type_error: "improvement is required",
    }),
    technologies: z
      .array(z.string(), {
        invalid_type_error: "technologies must be an array of strings",
      })
      .nonempty("technologies is required"),
    isDeleted: z.boolean().optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    deployLink: z.string().optional(),
    features: z.array(z.string()).optional(),
    githubClientLink: z.string().optional(),
    githubServerLink: z.string().optional(),
    projectChallenges: z.string().optional(),
    improvement: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export { createProjectValidationSchema, updateProjectValidationSchema };
