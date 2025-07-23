"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.createTask = exports.searchTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN = process.env.JWT_TOKEN;
if (!TOKEN) {
    throw new Error("Variável de ambiente JWT_TOKEN não está definida.");
}
const searchTask = async (req, res) => {
    try {
        const tasks = await Task_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar chamados", error: error.message });
    }
};
exports.searchTask = searchTask;
const createTask = async (req, res) => {
    try {
        const { title, helpdesk, description, author, company } = req.body;
        const newTask = new Task_1.default({ title, helpdesk, description, author, company });
        await newTask.save();
        res.status(201).json({ message: "Chamado criado com sucesso", chamado: newTask });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar chamado", error: error.message });
    }
};
exports.createTask = createTask;
const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, helpdesk, description, author, company } = req.body;
        const updatedTask = await Task_1.default.findByIdAndUpdate(id, { title, helpdesk, description, author, company, updatedAt: Date.now() });
        if (!updatedTask) {
            res.status(404).json({ message: "Chamado não encontrado" });
            return;
        }
        res.json({ message: "Chamado atualizado com sucesso", chamado: updatedTask });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar chamado", error: error.message });
    }
};
exports.editTask = editTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({ message: "Chamado não encontrado" });
            return;
        }
        res.json({ message: "Chamado excluído com sucesso", chamado: deletedTask });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir chamado", error: error.message });
    }
};
exports.deleteTask = deleteTask;
