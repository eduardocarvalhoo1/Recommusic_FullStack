import { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import CampoTexto from '../components/TextField';
import BotaoEnviar from '../components/BotaoEnviar';
import NavBar from '../components/NavBar';

export default function CadastroArtista({onLogout, onNavigate}) {
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();
        setMensagem('');
        setErro('');

        try {
            const res = await fetch ('http://localhost:3000/api/artistas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ nome, genero })
            })

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.erro || 'Erro ao cadastrar artista');
                
            }

            setMensagem('Artista cadastrado com sucesso');
            setNome('');
            setGenero('');

        } catch (error) {
            setErro(error.message)
        }
    }

    return(
    <>
        
        <NavBar onLogout={onLogout} onNavigate={onNavigate} />
        <Container maxWidth="sm">
            <Box mt={5} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Cadastrar novo artista
                </Typography>

                {mensagem && <Alert severity="success" sx={{ mt: 2 }}>{mensagem}</Alert>}
                {erro && <Alert severity="error" sx={{ mt: 2 }}>{erro}</Alert>}

                <form onSubmit={handleCadastro}>
                    <CampoTexto
                        label="Nome do artista"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <CampoTexto
                        label="Gênero musical"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    />

                    <BotaoEnviar>Cadastrar</BotaoEnviar>
                </form>
            </Box>
        </Container>
    </>
    )
}
