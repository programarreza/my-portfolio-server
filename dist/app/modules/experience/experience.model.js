"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const mongoose_1 = require("mongoose");
const experienceSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: [true, "date is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    content: {
        type: String,
        required: [true, "content is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Experience = (0, mongoose_1.model)("Experience", experienceSchema);
