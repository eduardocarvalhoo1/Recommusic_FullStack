import {TextField} from '@mui/material';

export default function CampoTexto({label, type = "text", value, onChange, required = true}) {
    return (
        <TextField
            label = {label}
            type = {type}
            fullWidth
            margin = "normal"
            value = {value}
            onChange = {onChange}
            required = {required}
        />
    )
}