import { NextFunction, Request, Response, Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { USER_ROLE } from "../user/user.constant";

import auth from "../../middleware/auth";
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "./skill.controller";

const skillRoutes = Router();

skillRoutes.post(
  "/create-skill",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  createSkill
);

skillRoutes.get("/", getAllSkills);

skillRoutes.patch(
  "/:skillId",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  updateSkill
);

skillRoutes.delete("/:skillId", auth(USER_ROLE.ADMIN), deleteSkill);

export default skillRoutes;
