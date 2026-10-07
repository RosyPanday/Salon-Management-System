import { createBrowserRouter } from "react-router-dom";
import AddServiceCreationContent from "./pages/salonServices/add-service-content.js";
import ViewServicesContent from "./pages/salonServices/view-services-content.js";
import ServiceManagementDashboard from "./pages/salonServices/service-management-dashboard.js";
import AppointmentManagementContent from "./pages/appointmentManagement/appointment-management-content.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ServiceManagementDashboard />,
  },
  {
    path: "/appointment-management",
    element: <AppointmentManagementContent />,
  },
  {
    path: "service-management/create-services",
    element: <AddServiceCreationContent />,
  },
  {
    path: "/service-management/services",
    element: <ViewServicesContent />,
  },
]);
