"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectIntoDB = exports.getSingleProjectFromDB = exports.getAllProjectsFromDB = exports.deleteProjectIntoDB = exports.createProjectIntoDB = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const project_model_1 = require("./project.model");
const createProjectIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findOne({ title: payload === null || payload === void 0 ? void 0 : payload.title });
    if (project) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "This project already exists");
    }
    const result = yield project_model_1.Project.create(payload);
    return result;
});
exports.createProjectIntoDB = createProjectIntoDB;
const getAllProjectsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.find({ isDeleted: false }).populate("technologies");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Projects not found!");
    }
    return result;
});
exports.getAllProjectsFromDB = getAllProjectsFromDB;
const getSingleProjectFromDB = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.findById(projectId).populate("technologies");
    ;
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Projects not found!");
    }
    return result;
});
exports.getSingleProjectFromDB = getSingleProjectFromDB;
const updateProjectIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findById(id);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found !");
    }
    // find project and update
    const result = yield project_model_1.Project.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to update project ");
    }
    return result;
});
exports.updateProjectIntoDB = updateProjectIntoDB;
const deleteProjectIntoDB = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findById(projectId);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found !");
    }
    const result = yield project_model_1.Project.findByIdAndUpdate(projectId, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to delete project ");
    }
    return result;
});
exports.deleteProjectIntoDB = deleteProjectIntoDB;
