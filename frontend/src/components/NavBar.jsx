import {AppBar, Toolbar, Button} from '@mui/material';

export default function NavBar({onLogout}) {
    return(
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Button color='inherit'>Cadastrar novo artista</Button>
                <Button color='inherit'>Ver artistas cadastrados</Button>
                <Button color='inherit' onClick={onLogout}>Sair</Button>
            </Toolbar>

        </AppBar>
    )
}