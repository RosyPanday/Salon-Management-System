import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  addAppointmentSchema,
  type AddAppointmentInput,
  type AddAppointmentOutput,
} from "../../../schemas/add-appointment-schema.js";
import { useAddAppointmentMutation } from "../../../hooks/appointment-management/use-add-appointment-mutation.js";
import { useViewServicesQuery } from "../../../hooks/service-management/use-view-services-query.js";

function AddAppointmentForm() {
  const addAppointmentMutation = useAddAppointmentMutation();
  const servicesQuery = useViewServicesQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddAppointmentInput, unknown, AddAppointmentOutput>({
    resolver: zodResolver(addAppointmentSchema),
    defaultValues: { notes: "" },
  });

  const onSubmit: SubmitHandler<AddAppointmentOutput> = async (data) => {
    try {
      await addAppointmentMutation.mutateAsync(data);
      toast.success("Appointment created");
      reset({ notes: "" });
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to create the appointment.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Add appointment</h2>

      <label className="flex flex-col gap-1 text-sm text-slate-700">
        Customer name
        <input className="rounded-lg bg-slate-100 px-3 py-2" {...register("customerName")} />
      </label>
      {errors.customerName && <p className="text-sm text-red-600">{errors.customerName.message}</p>}

      <label className="flex flex-col gap-1 text-sm text-slate-700">
        Customer phone
        <input className="rounded-lg bg-slate-100 px-3 py-2" type="tel" {...register("customerPhone")} />
      </label>
      {errors.customerPhone && <p className="text-sm text-red-600">{errors.customerPhone.message}</p>}

      <label className="flex flex-col gap-1 text-sm text-slate-700">
        Service
        <select className="rounded-lg bg-slate-100 px-3 py-2" defaultValue="" {...register("serviceId", { valueAsNumber: true })}>
          <option value="" disabled>
            {servicesQuery.isPending ? "Loading services…" : "Choose a service"}
          </option>
          {servicesQuery.data?.services.map((service) => (
            <option value={service.id} key={service.id}>
              {service.serviceName}
            </option>
          ))}
          {servicesQuery.data?.services.length === 0 && (
            <option value="" disabled>No services available</option>
          )}
        </select>
      </label>
      {errors.serviceId && <p className="text-sm text-red-600">{errors.serviceId.message}</p>}
      {servicesQuery.isError && (
        <div className="text-sm text-red-600" role="alert">
          <p>
            Could not load services: {axios.isAxiosError<{ message?: string }>(servicesQuery.error)
              ? servicesQuery.error.response?.data?.message ?? servicesQuery.error.message
              : "Unknown error"}
          </p>
          <button
            className="mt-1 underline"
            type="button"
            onClick={() => void servicesQuery.refetch()}
          >
            Retry loading services
          </button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Date
          <input className="rounded-lg bg-slate-100 px-3 py-2" type="date" {...register("appointmentDate")} />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Time
          <input className="rounded-lg bg-slate-100 px-3 py-2" type="time" {...register("appointmentTime")} />
        </label>
      </div>
      {errors.appointmentDate && <p className="text-sm text-red-600">{errors.appointmentDate.message}</p>}
      {errors.appointmentTime && <p className="text-sm text-red-600">{errors.appointmentTime.message}</p>}

      <label className="flex flex-col gap-1 text-sm text-slate-700">
        Notes (optional)
        <textarea className="rounded-lg bg-slate-100 px-3 py-2" rows={3} {...register("notes")} />
      </label>

      <button
        className="self-start rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
        type="submit"
        disabled={isSubmitting || addAppointmentMutation.isPending || servicesQuery.isError || servicesQuery.isPending}
      >
        {addAppointmentMutation.isPending ? "Saving…" : "Save appointment"}
      </button>
    </form>
  );
}

export default AddAppointmentForm;
