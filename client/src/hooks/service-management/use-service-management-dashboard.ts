import { useLocation, useNavigate } from "react-router-dom";

export function useServiceManagementDashboard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAppointmentPage = pathname.startsWith("/appointment-management");

  const togglePage = () => {
    navigate(isAppointmentPage ? "/" : "/appointment-management");
  };

  return {
    togglePage,
    isAppointmentPage,
  };
}
