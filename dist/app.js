"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const auth_routes_1 = __importDefault(require("./app/modules/auth/auth.routes"));
const experience_routes_1 = __importDefault(require("./app/modules/experience/experience.routes"));
const project_routes_1 = __importDefault(require("./app/modules/project/project.routes"));
const skill_routes_1 = __importDefault(require("./app/modules/skill/skill.routes"));
const blog_routes_1 = __importDefault(require("./app/modules/bolgs/blog.routes"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
// application route
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/projects", project_routes_1.default);
app.use("/api/v1/experiences", experience_routes_1.default);
app.use("/api/v1/skills", skill_routes_1.default);
app.use("/api/v1/blogs", blog_routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to portfolio server");
});
app.use(globalErrorHandler_1.default);
exports.default = app;
