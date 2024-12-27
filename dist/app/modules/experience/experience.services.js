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
exports.updateExperienceIntoDB = exports.getAllExperienceFromDB = exports.createExperienceIntoDB = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const experience_model_1 = require("./experience.model");
const createExperienceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield experience_model_1.Experience.findOne({ content: payload === null || payload === void 0 ? void 0 : payload.content });
    if (project) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "This experience already exists");
    }
    const result = yield experience_model_1.Experience.create(payload);
    return result;
});
exports.createExperienceIntoDB = createExperienceIntoDB;
const getAllExperienceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_model_1.Experience.find({ isDeleted: false });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Experience not found!");
    }
    return result;
});
exports.getAllExperienceFromDB = getAllExperienceFromDB;
const updateExperienceIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield experience_model_1.Experience.findById(id);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Experiences not found !");
    }
    // find Experience and update
    const result = yield experience_model_1.Experience.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to update experience ");
    }
    return result;
});
exports.updateExperienceIntoDB = updateExperienceIntoDB;
