import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/rides');
      const data = await res.json();
      setRides(data.rides || []);
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (rideId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rides/${rideId}/accept`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driver_email: "captain@example.com" })  // Ideally get from context
      });

      const result = await res.json();
      if (result.success) {
        fetchRides(); // Refresh list
      }
    } catch (error) {
      console.error('Accept failed:', error);
    }
  };

  const handleComplete = async (rideId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rides/${rideId}/complete`, {
        method: 'PUT'
      });

      const result = await res.json();
      if (result.success) {
        fetchRides();
      }
    } catch (error) {
      console.error('Complete failed:', error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Driver Dashboard
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}><CircularProgress /></Box>
      ) : (
        rides.filter(ride => ride.status !== 'completed').map((ride) => (
          <Paper key={ride._id} elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: "#232323" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6">{ride.passenger_email}</Typography>
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
              <Typography>{ride.pickup_location}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Dropoff</Typography>
              <Typography>{ride.drop_location}</Typography>
            </Box>

            {ride.status === 'requested' && (
              <Button
                variant="contained"
                onClick={() => handleAccept(ride._id)}
                fullWidth
              >
                Accept Ride
              </Button>
            )}

            {ride.status === 'in-progress' && (
              <Button
                variant="contained"
                color="success"
                onClick={() => handleComplete(ride._id)}
                fullWidth
              >
                Mark as Completed
              </Button>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default DriverDashboard;
