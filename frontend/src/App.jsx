import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/Theme";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const toggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      {!isAuthPage && (
        <>
          <MenuIcon
            onClick={toggleSidebar}
            sx={{
              display: { md: "none" },
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1201,
              cursor: "pointer",
            }}
          />
          <Sidebar open={mobileOpen} onClose={toggleSidebar} />
        </>
      )}

      <Box sx={{ ml: !isAuthPage ? { md: 30 } : 0, p: 3 }}>
        <AppRoutes />
      </Box>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
