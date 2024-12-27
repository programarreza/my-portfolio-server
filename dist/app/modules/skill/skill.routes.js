"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middleware/auth"));
const skill_controller_1 = require("./skill.controller");
const skillRoutes = (0, express_1.Router)();
skillRoutes.post("/create-skill", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, skill_controller_1.createSkill);
skillRoutes.get("/", skill_controller_1.getAllSkills);
skillRoutes.patch("/:skillId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, skill_controller_1.updateSkill);
skillRoutes.delete("/:skillId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), skill_controller_1.deleteSkill);
exports.default = skillRoutes;
