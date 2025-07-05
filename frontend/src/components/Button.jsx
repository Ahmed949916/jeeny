import Button from '@mui/material/Button';

export default function MuiButton({ type = "submit", children, onClick, className = "" }) {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      color="primary"
      fullWidth
      className={className}
      sx={{ py: 1.5, mt: 1 }}
    >
      {children}
    </Button>
  );
}