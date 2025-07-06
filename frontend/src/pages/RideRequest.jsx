import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import { 
   
   ToggleButton, ToggleButtonGroup,
  Box, 
  Typography, 
  TextField, 
  Button, 
 
} from '@mui/material';

export default function RideRequest() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
   const [vehicle, setVehicle] = useState('car');

  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
     e.preventDefault();
    console.log({ pickup, dropoff, vehicle });
    navigate('/ride-status',{state: { 
        pickupLocation: pickup,
        dropoffLocation: dropoff,
         
      } });
  };

  return (
 
      <Box sx={{ mt: 4, p: 3, boxShadow: 1, borderRadius: 2 ,maxWidth:600, mx: 'auto'}}>
        <Typography variant="h4"   align="center">
          Request a Ride
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            fullWidth
            margin="normal"
            required
            placeholder="e.g. Mall Road"
          />

          <TextField
            label="Drop-off Location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            fullWidth
            margin="normal"
            required
            placeholder="e.g. Airport"
          />

<ToggleButtonGroup
  value={vehicle}
  exclusive
  onChange={(e, newVal) => setVehicle(newVal)}
  fullWidth
  sx={{ my: 2 }}
>
  <ToggleButton 
    value="bike"
  >
    Bike
  </ToggleButton>
  <ToggleButton 
    value="car"
  >
    Car
  </ToggleButton>
  <ToggleButton 
    value="rickshaw"
  >
    Rickshaw
  </ToggleButton>
</ToggleButtonGroup>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3, py: 1.5 }}
            disabled={!pickup || !dropoff}
          >
            Request Ride
          </Button>
        </form>
      </Box>
    
  );
}