import { Box, Typography, Paper, Chip } from '@mui/material';
 
const rideHistory = [
  {
    id: 1,
    pickup: 'Mall Road, City Center',
    dropoff: 'Airport Terminal 1',
    vehicle: 'Toyota Corolla',
    status: 'completed',
  },
  {
    id: 2,
    pickup: 'University Campus',
    dropoff: 'Central Station',
    vehicle: 'Honda Civic',
    status: 'in-progress',
  },
  {
    id: 3,
    pickup: 'Home',
    dropoff: 'Shopping Mall',
    vehicle: 'Hyundai Elantra',
    status: 'canceled',
  },
];
 
function RideHistory() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Ride History
      </Typography>

      {rideHistory.map((ride) => (
        <Paper
          key={ride.id}
          elevation={1}
          sx={{ p: 2, mb: 2, borderRadius: 2 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Vehicle
            </Typography>
            <Typography variant="body2">{ride.vehicle}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Pickup
            </Typography>
            <Typography variant="body2">{ride.pickup}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Drop-off
            </Typography>
            <Typography variant="body2">{ride.dropoff}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Chip
 
              label={ride.status}
              size="small"
              sx={{ textTransform: 'capitalize',backgroundColor: ride.status === 'completed' ? 'primary.main' : ride.status === 'in-progress' ? 'gray' : ride.status === 'in-progress' ? 'orange' : 'red', color: 'white' }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default RideHistory;
