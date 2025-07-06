import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { 
 
  Box, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup,
  Link
} from '@mui/material';
 
import { useState } from 'react';
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { 
    register, 
    handleSubmit
  } = useForm();
  const { login } = useAuth();
  const [userType, setUserType] = useState('rider');
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
  const userData = { name: data.name, email: data.email, userType };
  login("dummy-token", userData);
  navigate(userType === "captain" ? "/driver" : "/request-ride");
};

  const handleUserTypeChange = (event, newType) => {
    if (newType) setUserType(newType);
  };

  return (
  
     <Box sx={{ mt: 4, p: 3, boxShadow: 1, borderRadius: 2 ,maxWidth:600, mx: 'auto'}}>
        <Typography variant="h4"  align="center" gutterBottom>
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
    
  );
}