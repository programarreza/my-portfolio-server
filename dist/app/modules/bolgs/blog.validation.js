"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidationSchema = exports.createBlogValidationSchema = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({ invalid_type_error: "content is required" }),
    }),
});
exports.createBlogValidationSchema = createBlogValidationSchema;
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({ invalid_type_error: "content is required" }).optional(),
    }),
});
exports.updateBlogValidationSchema = updateBlogValidationSchema;
