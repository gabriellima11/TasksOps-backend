import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import Routes from './routes/routes'

dotenv.config()

const PORT = process.env.PORT
const MONGO = process.env.MONGO_CONNECTION || ""
const app = express()
const port = 3000

const corsOption = {
	origin: 'http://task-ops-interface.vercel.app',
	credentials: true,
};

app.use(cors(corsOption))
app.use(express.json())

// Rotas base
app.use("/api", Routes);

mongoose.connect(MONGO).then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor iniciado na porta ${port}`)
    })
}).catch(err => {
    console.error("Erro ao conectar no MongoDB:", err);
  });


