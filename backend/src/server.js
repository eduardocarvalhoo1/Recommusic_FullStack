import express from 'express';
import authRoutes from '../src/routes/auth.js';
import artistasRoutes from '../src/routes/artistas.js'
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

const app = express();

app.use(cors());
app.use(compression());

app.use(morgan('dev'));

const limteReq = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {erro: 'Voce atingiu o limite de requisições. Tente novamente mais tarde.'}
})

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', limteReq, artistasRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ erro: 'Token inválido ou não fornecido' });
  }
  next(err);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})