import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography ,Link} from '@mui/material';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = () => {
    navigate("/request-ride");
  };

  return (
     
       <Box sx={{ mt: 4, p: 3, boxShadow: 1, borderRadius: 2 ,maxWidth:600, mx: 'auto'}}>
        <Typography variant="h4"   align="center" gutterBottom>
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
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account? <Link 
            href="/register" 
            
          >
            Register
          </Link>
        </Typography>
       
      </Box>
 
  );
}