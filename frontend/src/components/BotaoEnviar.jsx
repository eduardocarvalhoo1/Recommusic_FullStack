import { Button } from '@mui/material';

export default function BotaoEnviar({ children = "Enviar", ...props }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 2,
        backgroundColor: '#082567',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#061943',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
