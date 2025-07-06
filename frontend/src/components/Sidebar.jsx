import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleNavigate = (path) => {
    navigate(path);
    if (!isLargeScreen && onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const commonLinks = [
    { label: 'Ride History', path: '/ride-history' },
  ];

  const driverLinks = [
    { label: 'Driver Dashboard', path: '/driver' },
    ...commonLinks,
  ];

  const customerLinks = [
    { label: 'Request Ride', path: '/request-ride' },
    ...commonLinks,
  ];

  const linksToRender = user?.userType === 'captain' ? driverLinks : customerLinks;

  const sidebarContent = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        mt: 6,
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Hello, {user?.name || 'User'}
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {linksToRender.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={idx}
              onClick={() => handleNavigate(item.path)}
              sx={{
                cursor: 'pointer',
                mb: 1,
                borderRadius: 1,
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'white' : 'inherit',
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>

      <ListItem
        button
        onClick={handleLogout}
        sx={{
            cursor: 'pointer',
          mt: 'auto',
          borderRadius: 1,
        }}
      >
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );

  if (isLargeScreen) {
    return (
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <Drawer
          variant="permanent"
          anchor="left"
          open
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      {sidebarContent}
    </Drawer>
  );
}
