"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const experience_controller_1 = require("./experience.controller");
const experience_validation_1 = require("./experience.validation");
const experienceRoutes = (0, express_1.Router)();
experienceRoutes.post("/create-experience", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(experience_validation_1.createExperienceValidationSchema), experience_controller_1.createExperience);
experienceRoutes.get("/", experience_controller_1.getAllExperience);
experienceRoutes.patch("/:experienceId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(experience_validation_1.updateExperienceValidationSchema), experience_controller_1.updateExperience);
exports.default = experienceRoutes;
