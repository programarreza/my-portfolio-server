"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectValidationSchema = exports.createProjectValidationSchema = void 0;
const zod_1 = require("zod");
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ invalid_type_error: "title is required" }),
        description: zod_1.z.string({ invalid_type_error: "description is required" }),
        deployLink: zod_1.z.string({ invalid_type_error: "deployLink is required" }),
        features: zod_1.z
            .array(zod_1.z.string(), {
            invalid_type_error: "features must be an array of strings",
        })
            .nonempty("features is required"),
        githubClientLink: zod_1.z.string({
            invalid_type_error: "githubClientLink is required",
        }),
        githubServerLink: zod_1.z.string({
            invalid_type_error: "githubServerLink is required",
        }),
        projectChallenges: zod_1.z.string({
            invalid_type_error: "projectChallenges is required",
        }),
        improvement: zod_1.z.string({
            invalid_type_error: "improvement is required",
        }),
        technologies: zod_1.z
            .array(zod_1.z.string(), {
            invalid_type_error: "technologies must be an array of strings",
        })
            .nonempty("technologies is required"),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.createProjectValidationSchema = createProjectValidationSchema;
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        deployLink: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        githubClientLink: zod_1.z.string().optional(),
        githubServerLink: zod_1.z.string().optional(),
        projectChallenges: zod_1.z.string().optional(),
        improvement: zod_1.z.string().optional(),
        technologies: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.updateProjectValidationSchema = updateProjectValidationSchema;
