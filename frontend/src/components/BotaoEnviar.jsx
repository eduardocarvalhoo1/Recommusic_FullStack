import {Button} from '@mui/material';

export default function BotaoEnviar({children = "Enviar", ...props}) {
    return(
        <Button
            type = "submit"
            fullWidth
            variant = "contained"
            sx = {{mt: 2}}
            {...props}
        >
            {children}
        </Button>
    )
}