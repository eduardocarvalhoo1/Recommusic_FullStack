import { expressjwt } from "express-jwt";

const jwt_secret = 'segredo'; // Colocar no .env se eu resolver subir

const autenticarToken = expressjwt({
    secret: jwt_secret,
    algorithms: ['HS256'],
})

export default autenticarToken;