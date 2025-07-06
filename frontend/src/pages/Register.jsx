import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup,
  Link
} from '@mui/material';
 
import { useState } from 'react';

export default function Register() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const [userType, setUserType] = useState('rider');
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    console.log({ ...data, userType });
    navigate("/request-ride");
  };

  const handleUserTypeChange = (event, newType) => {
    if (newType) setUserType(newType);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Create Account
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToggleButtonGroup
            color="primary"
            value={userType}
            exclusive
            onChange={handleUserTypeChange}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="rider">
               Rider
            </ToggleButton>
            <ToggleButton value="captain">
               Captain
            </ToggleButton>
          </ToggleButtonGroup>

          <Input
            label="Full Name"
            name="name"
            register={register}
            
          />

          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
           
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
           
        
          />

          <Button type="submit" sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link 
            href="/login" 
            
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}