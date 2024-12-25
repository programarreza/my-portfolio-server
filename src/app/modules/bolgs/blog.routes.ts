import { NextFunction, Request, Response, Router } from "express";
import { multerUpload } from "../../config/multer.config";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";

import auth from "../../middleware/auth";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "./blog.controller";
import {
  createBlogValidationSchema,
  updateBlogValidationSchema,
} from "./blog.validation";

const blogRoutes = Router();

blogRoutes.post(
  "/create-blog",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createBlogValidationSchema),
  createBlog
);

blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:blogId", getSingleBlog);

blogRoutes.patch(
  "/:blogId",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(updateBlogValidationSchema),
  updateBlog
);

blogRoutes.delete("/:blogId", auth(USER_ROLE.ADMIN), deleteBlog);

export default blogRoutes;
