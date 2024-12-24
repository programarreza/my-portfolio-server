import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "name is required" }),
    email: z.string({ invalid_type_error: "email is required" }),
    password: z.string({ invalid_type_error: "password is required" }),
    phone: z.string({ invalid_type_error: "phone is required" }),
    address: z.string({ invalid_type_error: "address is required" }),
    image: z.string({ invalid_type_error: "image is required" }).optional(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ invalid_type_error: "email is required" }),
    password: z.string({ invalid_type_error: "password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z
      .string({
        required_error: "Refresh token is required ",
      })
      .optional(),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "User email is required",
    }),
  }),
});

export {
  createUserValidationSchema,
  forgetPasswordValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
};
