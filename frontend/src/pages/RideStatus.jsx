import { useState, useEffect } from 'react';
import {
  Box, Typography, Stepper, Step, StepLabel, Paper, Avatar, Button, Divider,
} from '@mui/material';
import { Schedule, PersonPinCircle, DoneAll } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const statusSteps = [
  { label: 'Requested', icon: <Schedule /> },
  { label: 'Accepted', icon: <PersonPinCircle /> },
  { label: 'Completed', icon: <DoneAll /> },
];

const RideStatus = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log('RideStatus state:', state);
  const rideId = state?.rideId;

  const [ride, setRide] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

 
  const fetchRide = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/rides/${rideId}`);
      const data = await res.json();
      if (data.ride) {
        setRide(data.ride);
        if (data.ride.status === 'requested') setActiveStep(0);
        if (data.ride.status === 'in-progress') setActiveStep(1);
        if (data.ride.status === 'completed') setActiveStep(2);
      }
    } catch (err) {
      console.error('Failed to fetch ride', err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!rideId) return;
    fetchRide();  

    const interval = setInterval(() => {
      fetchRide();
    }, 10000);  

     
  }, [rideId]);

 

  const getStatusDetails = () => {
    switch (activeStep) {
      case 0: return 'Looking for available captains...';
      case 1: return `Captain is arriving`;
      case 2: return 'Ride successfully completed';
      default: return '';
    }
  };

  if (loading || !ride) return <Typography>Loading ride details...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">Your Ride Status</Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
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
          height: 120,
          border: `1px solid`,
          borderColor: activeStep === 2 ? 'success.main' : 'grey.400',
          p: 2,
          borderRadius: 1,
          mb: 3,
          textAlign: 'center',
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
          {activeStep === 1 && ride.driver_email && (
            <Typography sx={{ mt: 1 }}>
              {ride.driver_email} is on the way
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="body1" fontWeight="600" color="primary.main">Pickup</Typography>
            <Typography variant="body1">{ride.pickup_location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
            <Typography variant="body1" fontWeight="600" color="primary.main">Drop-off</Typography>
            <Typography variant="body1">{ride.drop_location}</Typography>
          </Box>
        </Box>

        {activeStep < 2 ? (
          <Button variant="outlined" color="error" fullWidth onClick={()=>{{navigate('/request-ride')}}}>
            Cancel Ride
          </Button>
        ) : (
          <Button variant="contained" fullWidth onClick={() => navigate('/request-ride')}>
            Finish Ride
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default RideStatus;
