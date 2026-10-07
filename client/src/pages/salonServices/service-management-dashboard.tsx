import ServiceManagementNavbar from "../../components/layout/navbar/ServiceManagementNavbar.js";

function ServiceManagementDashboard({children}: {children?: React.ReactNode}) {
  return (
    <>
      <ServiceManagementNavbar />
      <main>{children}</main>
    </>
  );
}

export default ServiceManagementDashboard;