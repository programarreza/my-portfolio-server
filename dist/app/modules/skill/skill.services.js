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
exports.updateSkillIntoDB = exports.getAllSkillsFromDB = exports.deleteSkillIntoDB = exports.createSkillIntoDB = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const skill_model_1 = require("./skill.model");
const createSkillIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findOne({ name: payload === null || payload === void 0 ? void 0 : payload.name });
    if (skill) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "This skill already exists");
    }
    const result = yield skill_model_1.Skill.create(payload);
    return result;
});
exports.createSkillIntoDB = createSkillIntoDB;
const getAllSkillsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_model_1.Skill.find({ isDeleted: false });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Skills not found!");
    }
    return result;
});
exports.getAllSkillsFromDB = getAllSkillsFromDB;
const updateSkillIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findById(id);
    if (!skill) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Skill not found !");
    }
    // find Skill and update
    const result = yield skill_model_1.Skill.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to update Skill ");
    }
    return result;
});
exports.updateSkillIntoDB = updateSkillIntoDB;
const deleteSkillIntoDB = (SkillId) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield skill_model_1.Skill.findById(SkillId);
    if (!skill) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Skill not found !");
    }
    const result = yield skill_model_1.Skill.findByIdAndUpdate(SkillId, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to delete Skill ");
    }
    return result;
});
exports.deleteSkillIntoDB = deleteSkillIntoDB;
