import ViewServices from "../../components/layout/serviceManagement/view-services.js";
import ServiceManagementDashboard from "./service-management-dashboard.js";

function ViewServicesContent() {
  return (
    <div>
      <ServiceManagementDashboard>
         <ViewServices />
      </ServiceManagementDashboard>
    </div>
  );
}

export default ViewServicesContent;
