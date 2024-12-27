"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    deployLink: {
        type: String,
        required: [true, "deployLink is required"],
    },
    features: {
        type: [String],
        required: [true, "features is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    githubClientLink: {
        type: String,
        required: [true, "githubClientLink is required"],
    },
    githubServerLink: {
        type: String,
        required: [true, "githubServerLink is required"],
    },
    projectChallenges: {
        type: String,
        required: [true, "projectChallenges is required"],
    },
    improvement: {
        type: String,
        required: [true, "improvement is required"],
    },
    technologies: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Skill",
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
