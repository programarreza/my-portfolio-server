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
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const projectRoutes = (0, express_1.Router)();
projectRoutes.post("/create-project", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(project_validation_1.createProjectValidationSchema), project_controller_1.createProject);
projectRoutes.get("/", project_controller_1.getAllProjects);
projectRoutes.get("/:projectId", project_controller_1.getSingleProject);
projectRoutes.patch("/:projectId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(project_validation_1.updateProjectValidationSchema), project_controller_1.updateProject);
projectRoutes.delete("/:projectId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), project_controller_1.deleteProject);
exports.default = projectRoutes;
