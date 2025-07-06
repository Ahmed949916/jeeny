import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  Button,
  Divider,
 
} from '@mui/material';
import {
  
  Schedule,
  PersonPinCircle,
 
  DoneAll
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const statusSteps = [
  { label: 'Requested', icon: <Schedule /> },
  { label: 'Accepted', icon: <PersonPinCircle /> },
  { label: 'Completed', icon: <DoneAll /> }
];

const RideStatus = () => {
   const { state } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [driver, setDriver] = useState(null);
  const [timeToArrival, setTimeToArrival] = useState(5);
  const navigate = useNavigate();
  const pickupLocation = state?.pickupLocation || '';
  const dropoffLocation = state?.dropoffLocation || '';
 

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeStep < statusSteps.length - 1) {
        setActiveStep((prev) => prev + 1);
        
        if (activeStep === 0) {
          setDriver({
            name: 'Ahmad Abdullah',
            
          });
        }
        
        if (activeStep === 1 && timeToArrival > 0) {
          setTimeToArrival(t => t - 1);
        }
      } else {
        clearInterval(timer);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [activeStep, timeToArrival]);

  const getStatusDetails = () => {
    switch (activeStep) {
      case 0: return 'Looking for available captains...';
      case 1: return `Captain arriving`;
      case 2: return 'Ride successfully completed';
      default: return '';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Ride Status
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{ mb: 4 }}
        >
          {statusSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <Avatar sx={{ 
                    bgcolor: activeStep >= index ? 'primary.main' : 'grey.300',
                    color: activeStep >= index ? 'white' : 'grey.700'
                  }}>
                    {step.icon}
                  </Avatar>
                )}
              >
                <Typography variant="subtitle2">{step.label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        
        <Box sx={{ 
          height:120,

             border: `1px solid`,
    borderColor: activeStep === 2 ? 'success.main' : 'grey.400',
          p: 2, 
          borderRadius: 1,
          mb: 3,
          textAlign: 'center',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
<Typography
  variant="body1"
  sx={{
    fontWeight: 'bold',
    color:
      activeStep === 1
        ? 'primary.main'
        : activeStep === 2
        ? 'success.main'
        : 'text.primary'
  }}
>
  

            {getStatusDetails()}
          </Typography>
          {activeStep == 1 && driver && (
              <Typography sx={{alignSelf: 'center',mt:1}}>
                {driver.name} is on the way  
              </Typography>
           
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        
        <Box 
          direction="row" 
          justifyContent="space-between" 
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"space-between",gap:2 }}>
            <Typography variant="body1" sx={{fontWeight:"600"}}color="primary.main">
              Pickup
            </Typography>
            <Typography variant="body1">{pickupLocation}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"space-between",gap:2 }}>
            <Typography sx={{fontWeight:"600"}} variant="body1" color="primary.main">
              Drop-off
            </Typography>
            <Typography variant="body1">{dropoffLocation}</Typography>
          </Box>
        </Box>

      
        {activeStep < statusSteps.length - 1 ? (
          <Button
            variant="outlined"
            color='error' 
            fullWidth
            onClick={() => { 
              if (window.confirm('Cancel this ride?')) {
                navigate('/request-ride');
              }
            }}
          >
            Cancel Ride
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              
              navigate('/request-ride');
            }}
          >
            Finish Ride
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default RideStatus;