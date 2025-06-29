import { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import CampoTexto from '../components/TextField';
import BotaoEnviar from '../components/BotaoEnviar';

export default function Login({onLogin}) {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro(null);
        
        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, senha})
            })

            if(!res.ok) { 
                const data = await res.json();
                throw new Error(data?.erro);
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            onLogin();
        } catch (error) {
            setErro(error.message);
        }
    }

    return(
        <Container maxWidth="xs">
            <Box mt={10}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                {erro && <Alert severity="error">{erro}</Alert>}

                <form onSubmit={handleLogin}>
                    <CampoTexto
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CampoTexto
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <BotaoEnviar>Entrar</BotaoEnviar>
                </form>
            </Box>
        </Container>

    )
}