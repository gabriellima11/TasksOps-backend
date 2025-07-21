import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import Routes from './routes/routes'

dotenv.config()

const PORT = process.env.PORT
const MONGO = process.env.MONGO_CONNECTION || ""
const app = express()
app.use(cors())
app.use(express.json())

// Rotas base
app.use("/api", Routes);

mongoose.connect(MONGO).then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => {
        console.log(`Servidor iniciado na porta ${PORT}`)
    })
}).catch(err => {
    console.error("Erro ao conectar no MongoDB:", err);
  });


