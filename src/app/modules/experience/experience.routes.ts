import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import {
  createExperience,
  getAllExperience,
  updateExperience,
} from "./experience.controller";
import {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
} from "./experience.validation";

const experienceRoutes = Router();

experienceRoutes.post(
  "/create-experience",
  auth(USER_ROLE.ADMIN),
  validateRequest(createExperienceValidationSchema),
  createExperience
);

experienceRoutes.get("/", getAllExperience);

experienceRoutes.patch(
  "/:experienceId",
  auth(USER_ROLE.ADMIN),
  validateRequest(updateExperienceValidationSchema),
  updateExperience
);

export default experienceRoutes;
