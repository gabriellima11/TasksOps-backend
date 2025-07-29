"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.searchUser = exports.register = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_TOKEN;
if (!JWT_SECRET) {
    throw new Error("Variável de ambiente JWT_TOKEN não está definida.");
}
//LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        // Verifica a senha
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha inválida" });
        }
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, admin: user.admin }, JWT_SECRET, { expiresIn: "8h" });
        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                admin: user.admin
            }
        });
    }
    catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
exports.login = login;
// REGISTER
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            admin: false
        });
        res.status(201).json({
            message: "Usuário registrado com sucesso",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }
    catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
exports.register = register;
const searchUser = async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar chamados", error: error.message });
    }
};
exports.searchUser = searchUser;
const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, admin } = req.body;
    try {
        const user = await User_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (password) {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            user.password = hashedPassword;
        }
        if (typeof admin === "boolean") {
            user.admin = admin;
        }
        await user.save();
        res.status(200).json({
            message: "Usuário atualizado com sucesso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                admin: user.admin,
            },
        });
    }
    catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
exports.editUser = editUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        res.json({ message: "Usuário excluído com sucesso", chamado: deletedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir chamado", error: error.message });
    }
};
exports.deleteUser = deleteUser;
