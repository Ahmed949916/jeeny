import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RideRequest from "../pages/RideRequest";
import RideStatus from "../pages/RideStatus";
import RideHistory from "../pages/RideHistory";
import DriverDashboard from "../pages/DriverDashboard";
 
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/request-ride" element={<RideRequest />} />
      <Route path="/ride-status" element={<RideStatus />} />
      <Route path="/ride-history" element={<RideHistory />} />
      <Route path="/driver" element={<DriverDashboard />} />
    </Routes>
  );
}
