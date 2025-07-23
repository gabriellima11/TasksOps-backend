import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import Routes from './routes/routes';

dotenv.config();

const MONGO = process.env.MONGO_CONNECTION || '';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', Routes);

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(MONGO)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
}

// Exporta o app para o Vercel usar como função serverless
export default app;
