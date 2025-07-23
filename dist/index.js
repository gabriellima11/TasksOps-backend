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
const PORT = process.env.PORT;
const MONGO = process.env.MONGO_CONNECTION || "";
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas base
app.use("/api", routes_1.default);
mongoose_1.default.connect(MONGO).then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor iniciado na porta ${port}`);
    });
}).catch(err => {
    console.error("Erro ao conectar no MongoDB:", err);
});
