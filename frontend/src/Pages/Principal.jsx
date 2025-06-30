import { useState } from "react";
import { Container, Typography, Box, Grid, Paper, Alert } from '@mui/material';
import CampoTexto from "../components/TextField";
import NavBar from "../components/NavBar";
import e from "cors";

export default function Principal({onLogout, onNavigate}) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState('');
    const [erro, setErro] = useState('');

    const handleBuscar = async (e) => {
        setErro('');
        setResultado('');
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/artistas?nome=${busca}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!res.ok) {
                const data = await res.json()
                const mensagem = data?.erro || 'Erro desconhecido';
                throw new Error(mensagem);
            }

            const data = await res.json();
            setResultado(data);

            if (data.length === 0) {
                setErro('Nenhum artista semelhante encontrado.');
            }

        } catch (error) {
            setErro(error.message);
        }
    }

    return(
    <>
        <NavBar onLogout={onLogout} onNavigate={onNavigate} />

        <Container maxWidth = "sm">
            <Box mt={5} textAlign={"center"}>
                <Typography variant="h4" gutterBottom>
                    Buscar artistas
                </Typography>

                {erro && <Alert severity="error" sx={{ mt: 2 }}>{erro}</Alert>}

                <form onSubmit={handleBuscar}>
                    <CampoTexto
                        label= "Nome do artista"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </form>

                {resultado.length > 0 && (
                    <Box mt={4}>
                        <Typography variant="h6">Artistas do mesmo genero musical:</Typography>
                        <Grid container spacing={2} mt={1}>
                            {resultado.map((artista) => (
                                <Grid item xs={12} key={artista.id}>
                                    <Paper sx={{p : 2}}>
                                        <strong>{artista.nome}</strong> - {artista.genero}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Container>
    </>
    )
}
