import axios from "axios";
import { toast } from "sonner";
import {
  useDeleteAppointmentMutation,
} from "../../../hooks/appointment-management/use-delete-appointment-mutation.js";
import {
  useEditAppointmentMutation,
} from "../../../hooks/appointment-management/use-edit-appointment-mutation.js";
import { useViewAppointmentsQuery } from "../../../hooks/appointment-management/use-view-appointments-query.js";
import { useViewServicesQuery } from "../../../hooks/service-management/use-view-services-query.js";
import type { AppointmentStatus } from "../../../types/appointments.js";

const statuses: AppointmentStatus[] = ["pending", "processing", "completed"];

function AppointmentList() {
  const appointmentsQuery = useViewAppointmentsQuery();
  const servicesQuery = useViewServicesQuery();
  const editMutation = useEditAppointmentMutation();
  const deleteMutation = useDeleteAppointmentMutation();
  const serviceNames = new Map(
    servicesQuery.data?.services.map((service) => [service.id, service.serviceName]) ?? [],
  );

  const changeStatus = async (id: number, status: AppointmentStatus) => {
    try {
      await editMutation.mutateAsync({ id, status });
      toast.success("Appointment status updated");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to update the appointment.";
      toast.error(message);
    }
  };

  const deleteAppointment = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Appointment deleted");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to delete the appointment.";
      toast.error(message);
    }
  };

  if (appointmentsQuery.isPending) {
    return <p className="text-slate-600">Loading appointments…</p>;
  }
  if (appointmentsQuery.isError) {
    return <p role="alert" className="text-red-700">Could not load appointments.</p>;
  }
  if (appointmentsQuery.data.appointments.length === 0) {
    return <p className="text-slate-600">No appointments yet.</p>;
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-slate-900">Appointments</h2>
      {appointmentsQuery.data.appointments.map((appointment) => (
        <article className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between" key={appointment.id}>
          <div>
            <h3 className="font-semibold text-slate-900">{appointment.customerName}</h3>
            <p className="text-sm text-slate-600">{appointment.customerPhone}</p>
            <p className="text-sm text-slate-600">
              {serviceNames.get(appointment.serviceId) ?? `Service #${appointment.serviceId}`}
              {" · "}{appointment.appointmentDate} at {appointment.appointmentTime}
            </p>
            {appointment.notes && <p className="mt-1 text-sm text-slate-500">{appointment.notes}</p>}
          </div>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor={`appointment-status-${appointment.id}`}>Appointment status</label>
            <select
              id={`appointment-status-${appointment.id}`}
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm"
              value={appointment.status}
              disabled={editMutation.isPending}
              onChange={(event) => void changeStatus(appointment.id, event.target.value as AppointmentStatus)}
            >
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <button
              className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => void deleteAppointment(appointment.id)}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default AppointmentList;
