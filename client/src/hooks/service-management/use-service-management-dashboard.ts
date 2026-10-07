import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useServiceManagementDashboard() {
  const [isPage, setIsPage] = useState("service-management");
  const navigate = useNavigate();
  const togglePage = () => {
    if (isPage === "service-management") {
      navigate("/appointment-management");
    } else {
      navigate("/service-management");
    }
  };

  return {
    togglePage,
    isPage,
  };
}