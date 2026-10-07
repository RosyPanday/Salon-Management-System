import AddAppointmentForm from "../../components/form/appointments/addAppointmentForm.js";
import AppointmentList from "../../components/layout/appointmentManagement/appointment-list.js";
import AppointmentManagementNavbar from "../../components/layout/navbar/AppointmentManagementNavbar.js";

function AppointmentManagementContent() {
  return (
    <>
      <AppointmentManagementNavbar />
      <main className="mx-auto grid max-w-7xl gap-6 bg-slate-50 p-5 lg:grid-cols-[minmax(280px,380px)_1fr]">
        <AddAppointmentForm />
        <AppointmentList />
      </main>
    </>
  );
}

export default AppointmentManagementContent;
