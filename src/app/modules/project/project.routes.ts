import { NextFunction, Request, Response, Router } from "express";
import { multerUpload } from "../../config/multer.config";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";

import auth from "../../middleware/auth";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "./project.controller";
import {
  createProjectValidationSchema,
  updateProjectValidationSchema,
} from "./project.validation";

const projectRoutes = Router();

projectRoutes.post(
  "/create-project",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createProjectValidationSchema),
  createProject
);

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/:projectId", getSingleProject);

projectRoutes.patch(
  "/:projectId",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(updateProjectValidationSchema),
  updateProject
);

projectRoutes.delete("/:projectId", auth(USER_ROLE.ADMIN), deleteProject);

export default projectRoutes;
