import { AppBar, Toolbar, Button } from '@mui/material';

export default function NavBar({ onLogout, onNavigate }) {
  return (
    <AppBar position='static' sx={{ mb: 4, backgroundColor: '#082567' }}>
      <Toolbar>
        <Button color="inherit" onClick={() => onNavigate('principal')}>Início</Button>
        <Button color='inherit' onClick={() => onNavigate('cadastro')}>Cadastrar novo artista</Button>
        <Button color='inherit' onClick={onLogout}>Sair</Button>
      </Toolbar>
    </AppBar>
  );
}
