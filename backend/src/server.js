import express from 'express';
import authRoutes from '../src/routes/auth.js';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));

const limteReq = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: 'Voce atingiu o limite de requisições. Tente novamente mais tarde.'
})

app.use(express.json());

app.use('/api', authRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})