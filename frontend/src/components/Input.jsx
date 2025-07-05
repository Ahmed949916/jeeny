import TextField from '@mui/material/TextField';

export default function Input({ label, name, register, rules = {}, type = "text" }) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      {...register(name, rules)}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
}