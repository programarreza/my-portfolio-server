"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExperienceValidationSchema = exports.createExperienceValidationSchema = void 0;
const zod_1 = require("zod");
const createExperienceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ invalid_type_error: "date is required" }),
        category: zod_1.z.string({ invalid_type_error: "category is required" }),
        content: zod_1.z.string({ invalid_type_error: "content is required" }),
    }),
});
exports.createExperienceValidationSchema = createExperienceValidationSchema;
const updateExperienceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ invalid_type_error: "date is required" }).optional(),
        category: zod_1.z
            .string({ invalid_type_error: "category is required" })
            .optional(),
        content: zod_1.z.string({ invalid_type_error: "content is required" }).optional(),
    }),
});
exports.updateExperienceValidationSchema = updateExperienceValidationSchema;
