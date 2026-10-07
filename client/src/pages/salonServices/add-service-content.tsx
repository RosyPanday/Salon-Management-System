import AddServiceForm from "../../components/form/services/addServiceForm.js";
import ServiceManagementDashboard from "./service-management-dashboard.js";

function AddServiceCreationContent() {
  return (
    <div>
      <ServiceManagementDashboard>
        <AddServiceForm />
      </ServiceManagementDashboard>
    </div>
  );
}

export default AddServiceCreationContent;
