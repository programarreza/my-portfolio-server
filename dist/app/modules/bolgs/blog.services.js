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
exports.updateBlogIntoDB = exports.getSingleBlogFromDB = exports.getAllBlogsFromDB = exports.deleteBlogIntoDB = exports.createBlogIntoDB = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findOne({ content: payload === null || payload === void 0 ? void 0 : payload.content });
    if (blog) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "This blog already exists");
    }
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
exports.createBlogIntoDB = createBlogIntoDB;
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const itemQuery = new QueryBuilder_1.default(blog_model_1.Blog.find(), query)
        .search(["content"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield itemQuery.modelQuery;
    const meta = yield itemQuery.countTotal();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Content not found!");
    }
    return { result, meta };
});
exports.getAllBlogsFromDB = getAllBlogsFromDB;
const getSingleBlogFromDB = (BlogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(BlogId);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blogs not found!");
    }
    return result;
});
exports.getSingleBlogFromDB = getSingleBlogFromDB;
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found !");
    }
    // find Blog and update
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to update Blog ");
    }
    return result;
});
exports.updateBlogIntoDB = updateBlogIntoDB;
const deleteBlogIntoDB = (BlogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(BlogId);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found !");
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(BlogId, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Failed to delete Blog ");
    }
    return result;
});
exports.deleteBlogIntoDB = deleteBlogIntoDB;
