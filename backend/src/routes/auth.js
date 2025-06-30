import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const jwt_secret = 'segredo'; // Colocar no .env se eu resolver subir

const limitador = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8, // Se der zebra muda de limit pra max
    message:{ erro: 'Muitas tentativas de login. Tente novamente mais tarde.'},
})

router.post('/login', limitador, async (req, res) => {
    const { email, senha } = req.body;

    try{
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        })

        if (!usuario) {
            console.warn(`[LOGIN FALHOU] E-mail inválido: ${email}`);
            return res.status(401).json({erro: 'Credenciais inválidas'});
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            console.warn(`[LOGIN FALHOU] Senha incorreta para o e-mail: ${email}`);
            return res.status(401).json({erro: 'Senha incorreta'});
        }

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            jwt_secret,
            {expiresIn: '3h'}
        );

        return res.json({ token });

    } catch(erro){
        return res.status(500).json({erro: 'Erro no sistema de login'});
    }


});

export default router;