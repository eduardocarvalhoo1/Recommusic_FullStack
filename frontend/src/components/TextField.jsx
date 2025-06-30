import { TextField } from '@mui/material';

export default function CampoTexto({ label, type = "text", value, onChange, required = true }) {
  return (
    <TextField
      label={label}
      type={type}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required={required}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, 
          backgroundColor: '#E3F2FD', 
          '& fieldset': {
            borderColor: '#0D47A1', 
          },
          '&:hover fieldset': {
            borderColor: '#1565C0', 
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0D47A1',
            borderWidth: '2px',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#0D47A1',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#0D47A1',
        },
      }}
    />
  );
}
