import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider
} from '@mui/material';

const initialRides = [
  {
    id: 1,
    rider: 'Ali Raza',
    pickup: 'Mall Road',
    dropoff: 'Airport',
    status: 'requested'
  },
  {
    id: 2,
    rider: 'Zainab Khan',
    pickup: 'University',
    dropoff: 'Central Market',
    status: 'in-progress'
  }
];

const DriverDashboard = () => {
  const [rides, setRides] = useState(initialRides);

  const handleAccept = (rideId) => {
    setRides(prev =>
      prev.map(ride =>
        ride.id === rideId ? { ...ride, status: 'in-progress' } : ride
      )
    );
  };

  const handleComplete = (rideId) => {
    setRides(prev =>
      prev.map(ride =>
        ride.id === rideId ? { ...ride, status: 'completed' } : ride
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Driver Dashboard
      </Typography>

      {rides.map((ride) => (
        ride.status !== 'completed' && (
        <Box
          key={ride.id}
          elevation={2}
          sx={{ p: 2, mb: 3, borderRadius: 2,bgcolor:"#232323" }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">{ride.rider}</Typography>
            <Chip
              label={ride.status}
              sx={{
                textTransform: 'capitalize',
                bgcolor:
                  ride.status === 'completed'
                    ? 'success.main'
                    : ride.status === 'in-progress'
                    ? 'warning.main'
                    : 'grey.600',
                color: 'white'
              }}
            />
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Pickup</Typography>
            <Typography>{ride.pickup}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Dropoff</Typography>
            <Typography>{ride.dropoff}</Typography>
          </Box>

          {ride.status === 'requested' && (
            <Button
              variant="contained"
              onClick={() => handleAccept(ride.id)}
              fullWidth
            >
              Accept Ride
            </Button>
          )}

          {ride.status === 'in-progress' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleComplete(ride.id)}
              fullWidth
            >
              Mark as Completed
            </Button>
          )}
        </Box>
      )))}
    </Box>
  );
};

export default DriverDashboard;
