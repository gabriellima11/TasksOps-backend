"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    helpdesk: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    company: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Task", taskSchema);
