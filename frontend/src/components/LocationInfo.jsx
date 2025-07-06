import { Box, Typography } from '@mui/material';

export default function LocationInfoBox({ pickup, dropoff }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="body1" fontWeight="600" color="primary.main">
          Pickup
        </Typography>
        <Typography variant="body1">{pickup}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
        <Typography variant="body1" fontWeight="600" color="primary.main">
          Drop-off
        </Typography>
        <Typography variant="body1">{dropoff}</Typography>
      </Box>
    </Box>
  );
}