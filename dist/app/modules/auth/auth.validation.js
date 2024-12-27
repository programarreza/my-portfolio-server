"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidationSchema = exports.loginUserValidationSchema = exports.forgetPasswordValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: "name is required" }),
        email: zod_1.z.string({ invalid_type_error: "email is required" }),
        password: zod_1.z.string({ invalid_type_error: "password is required" }),
        phone: zod_1.z.string({ invalid_type_error: "phone is required" }),
        address: zod_1.z.string({ invalid_type_error: "address is required" }),
        image: zod_1.z.string({ invalid_type_error: "image is required" }).optional(),
    }),
});
exports.createUserValidationSchema = createUserValidationSchema;
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ invalid_type_error: "email is required" }),
        password: zod_1.z.string({ invalid_type_error: "password is required" }),
    }),
});
exports.loginUserValidationSchema = loginUserValidationSchema;
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z
            .string({
            required_error: "Refresh token is required ",
        })
            .optional(),
    }),
});
exports.refreshTokenValidationSchema = refreshTokenValidationSchema;
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "User email is required",
        }),
    }),
});
exports.forgetPasswordValidationSchema = forgetPasswordValidationSchema;
