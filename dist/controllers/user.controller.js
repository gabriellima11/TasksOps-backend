"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
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
