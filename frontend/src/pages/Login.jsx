import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography } from '@mui/material';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = () => {
    navigate("/request-ride");
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            name="email"
            register={register}
            
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
        
          />
          
          <Button>Login</Button>
        </form>
      </Box>
    </Container>
  );
}