"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.editCompany = exports.createCompany = exports.searchCompany = void 0;
const Company_1 = __importDefault(require("../models/Company"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN = process.env.JWT_TOKEN;
if (!TOKEN) {
    throw new Error("Variável de ambiente JWT_TOKEN não está definida.");
}
const searchCompany = async (req, res) => {
    try {
        const company = await Company_1.default.find();
        res.json(company);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar empresa", error: error.message });
    }
};
exports.searchCompany = searchCompany;
const createCompany = async (req, res) => {
    try {
        const { title } = req.body;
        const newCompany = new Company_1.default({ title });
        await newCompany.save();
        res.status(201).json({ message: "Empresa criado com sucesso", chamado: newCompany });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar empresa", error: error.message });
    }
};
exports.createCompany = createCompany;
const editCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedCompany = await Company_1.default.findByIdAndUpdate(id, { title });
        if (!updatedCompany) {
            res.status(404).json({ message: "Empresa não encontrada" });
            return;
        }
        res.json({ message: "Empresa atualizado com sucesso", chamado: updatedCompany });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar empresa", error: error.message });
    }
};
exports.editCompany = editCompany;
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCompany = await Company_1.default.findByIdAndDelete(id);
        if (!deletedCompany) {
            res.status(404).json({ message: "Empresa não encontrado" });
            return;
        }
        res.json({ message: "Empresa excluído com sucesso", chamado: deletedCompany });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir empresa", error: error.message });
    }
};
exports.deleteCompany = deleteCompany;
