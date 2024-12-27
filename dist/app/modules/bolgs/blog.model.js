"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: [true, "image is required"],
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
function checkAccessRestrictions(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
}
// Applying the middleware for find, findOne, 
blogSchema.pre("find", checkAccessRestrictions);
blogSchema.pre("findOne", checkAccessRestrictions);
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
