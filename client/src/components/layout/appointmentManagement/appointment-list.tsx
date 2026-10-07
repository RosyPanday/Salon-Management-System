import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteAppointmentMutation,
} from "../../../hooks/appointment-management/use-delete-appointment-mutation.js";
import { useViewAppointmentsQuery } from "../../../hooks/appointment-management/use-view-appointments-query.js";
import { useViewServicesQuery } from "../../../hooks/service-management/use-view-services-query.js";
import { useEditAppointmentMutation } from "../../../hooks/appointment-management/use-edit-appointment-mutation.js";
import type { AppointmentStatus } from "../../../types/appointments.js";

const statuses: AppointmentStatus[] = ["pending", "confirmed", "completed", "cancelled"];

function AppointmentList() {
  const appointmentsQuery = useViewAppointmentsQuery();
  const servicesQuery = useViewServicesQuery();
  const editMutation = useEditAppointmentMutation();
  const deleteMutation = useDeleteAppointmentMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedStatus, setEditedStatus] = useState<AppointmentStatus>("pending");
  const serviceNames = new Map(
    servicesQuery.data?.services.map((service) => [service.id, service.serviceName]) ?? [],
  );

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

  const saveStatus = async (id: number) => {
    try {
      await editMutation.mutateAsync({ id, status: editedStatus });
      setEditingId(null);
      toast.success("Appointment status updated");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to update appointment status.";
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
      <h2 className="text-lg font-semibold text-slate-900">All appointments</h2>
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
          <div className="flex flex-wrap items-center gap-2">
            {editingId === appointment.id ? (
              <>
                <label className="sr-only" htmlFor={`appointment-status-${appointment.id}`}>Appointment status</label>
                <select
                  id={`appointment-status-${appointment.id}`}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm"
                  value={editedStatus}
                  onChange={(event) => setEditedStatus(event.target.value as AppointmentStatus)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
                <button
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
                  type="button"
                  disabled={editMutation.isPending}
                  onClick={() => void saveStatus(appointment.id)}
                >
                  {editMutation.isPending ? "Saving…" : "Save"}
                </button>
                <button
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  type="button"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {appointment.status[0].toUpperCase() + appointment.status.slice(1)}
                </span>
                <button
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  type="button"
                  onClick={() => {
                    setEditingId(appointment.id);
                    setEditedStatus(appointment.status);
                  }}
                >
                  Edit
                </button>
              </>
            )}
            <button
              className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
              type="button"
              disabled={deleteMutation.isPending || editingId === appointment.id}
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
