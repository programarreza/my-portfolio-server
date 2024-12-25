import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { createExperience, getAllExperience } from "./experience.controller";
import { createExperienceValidationSchema } from "./experience.validation";

const experienceRoutes = Router();

experienceRoutes.post(
  "/create-experience",
  auth(USER_ROLE.ADMIN),
  validateRequest(createExperienceValidationSchema),
  createExperience
);

experienceRoutes.get("/", getAllExperience);

export default experienceRoutes;
