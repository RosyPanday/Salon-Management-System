import { useSearchParams } from "react-router-dom";
import AddAppointmentForm from "../../components/form/appointments/addAppointmentForm.js";
import AppointmentList from "../../components/layout/appointmentManagement/appointment-list.js";
import AppointmentManagementNavbar from "../../components/layout/navbar/AppointmentManagementNavbar.js";

function AppointmentManagementContent() {
  const [searchParams] = useSearchParams();
  const isAddingAppointment = searchParams.get("view") === "add";

  return (
    <>
      <AppointmentManagementNavbar />
      <main className="mx-auto min-h-[calc(100vh-73px)] max-w-7xl bg-slate-50 p-5">
        {isAddingAppointment ? <AddAppointmentForm /> : <AppointmentList />}
      </main>
    </>
  );
}

export default AppointmentManagementContent;
