import { useState, useEffect } from 'react';
import {
  Box, Typography, Stepper, Step, StepLabel, Paper, Avatar, Button, Divider
} from '@mui/material';
import { Schedule, PersonPinCircle, DoneAll } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import LocationInfoBox from '../components/LocationInfo';
const statusSteps = [
  { label: 'Requested', icon: <Schedule /> },
  { label: 'Accepted', icon: <PersonPinCircle /> },
  { label: 'In Progress', icon: <PersonPinCircle/>},
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
      console.log('Fetched ride data:', ride);
      if (data.ride) {
        setRide(data.ride);
       if (data.ride.status === 'requested') setActiveStep(0);
if (data.ride.status === 'accepted') setActiveStep(1);
if (data.ride.status === 'in-progress') setActiveStep(2);
if (data.ride.status === 'completed') setActiveStep(3);

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
    }, 3000);  
     return () => clearInterval(interval);
  }, [rideId]);

 

  const getStatusDetails = () => {
  switch (activeStep) {
    case 0:
      return 'Looking for available captains...';
    case 1:
      return 'Captain accepted your ride.';
    case 2:
      return 'Ride is in progress...';
    case 3:
      return 'Ride successfully completed!';
    default:
      return '';
  }
};


  if (loading || !ride) {
    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }}/>
  }
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
<LocationInfoBox pickup={state.pickupLocation} dropoff={state.dropoffLocation} />
       

        {activeStep < 2 ? (
<Button
  variant="outlined"
  color="error"
  fullWidth
  onClick={() => {
    const confirmCancel = window.confirm('Are you sure you want to cancel the ride?');
    if (confirmCancel) {
      navigate('/request-ride');
    }
  }}
>
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
