"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middleware/auth"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const blogRoutes = (0, express_1.Router)();
blogRoutes.post("/create-blog", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(blog_validation_1.createBlogValidationSchema), blog_controller_1.createBlog);
blogRoutes.get("/", blog_controller_1.getAllBlogs);
blogRoutes.get("/:blogId", blog_controller_1.getSingleBlog);
blogRoutes.patch("/:blogId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(blog_validation_1.updateBlogValidationSchema), blog_controller_1.updateBlog);
blogRoutes.delete("/:blogId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), blog_controller_1.deleteBlog);
exports.default = blogRoutes;
