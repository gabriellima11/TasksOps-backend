"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const MONGO = process.env.MONGO_CONNECTION || '';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
if (mongoose_1.default.connection.readyState === 0) {
    mongoose_1.default
        .connect(MONGO)
        .then(() => console.log('MongoDB conectado'))
        .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
}
// Exporta o app para o Vercel usar como função serverless
exports.default = app;
