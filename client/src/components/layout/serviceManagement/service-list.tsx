import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import {
  addServiceSchema,
  type AddServiceInput,
  type AddServiceOutput,
} from "../../../schemas/add-service-schema.js";
import type { GetServicesResponse, ServiceInterface } from "../../../types/services.js";
import { useDeleteServiceMutation } from "../../../hooks/service-management/use-delete-service-mutation.js";
import { useEditServiceMutation } from "../../../hooks/service-management/use-edit-service-mutation.js";

function ServiceCard({ service }: { service: ServiceInterface }) {
  const [isEditing, setIsEditing] = useState(false);
  const editMutation = useEditServiceMutation();
  const deleteMutation = useDeleteServiceMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddServiceInput, unknown, AddServiceOutput>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      serviceName: service.serviceName,
      price: service.price,
      duration: service.duration,
    },
  });

  const onSubmit = async (data: AddServiceOutput) => {
    try {
      const { serviceName, price, duration } = data;
      await editMutation.mutateAsync({
        id: service.id,
        data: { serviceName, price, duration },
      });
      reset({ serviceName, price, duration });
      toast.success("Service updated");
      setIsEditing(false);
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to update the service.";
      toast.error(message);
    }
  };

  const onDelete = async () => {
    try {
      await deleteMutation.mutateAsync(service.id);
      toast.success("Service deleted");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to delete the service.";
      toast.error(message);
    }
  };

  return (
    <article className="mt-3 flex w-full flex-col gap-3 rounded-lg bg-white p-4 shadow-sm sm:w-80">
      {isEditing ? (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-1 text-sm text-gray-600">
            Service name
            <input className="rounded-lg bg-gray-100 px-3 py-2 text-gray-900" {...register("serviceName")} />
          </label>
          {errors.serviceName && <p className="text-sm text-red-600">{errors.serviceName.message}</p>}

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            Price
            <input className="rounded-lg bg-gray-100 px-3 py-2 text-gray-900" type="number" min="1" step="0.01" {...register("price", { valueAsNumber: true })} />
          </label>
          {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            Duration (minutes)
            <input className="rounded-lg bg-gray-100 px-3 py-2 text-gray-900" type="number" min="1" step="1" {...register("duration", { valueAsNumber: true })} />
          </label>
          {errors.duration && <p className="text-sm text-red-600">{errors.duration.message}</p>}

          <div className="flex gap-2">
            <button className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-medium text-white disabled:opacity-60" type="submit" disabled={isSubmitting || editMutation.isPending}>
              Save changes
            </button>
            <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <dl className="flex flex-col gap-2">
            <div className="flex justify-between gap-3">
              <dt className="text-sm text-gray-600">Service name</dt>
              <dd className="text-right text-sm text-gray-900">{service.serviceName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-sm text-gray-600">Price</dt>
              <dd className="text-right text-sm text-gray-900">{service.price}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-sm text-gray-600">Duration</dt>
              <dd className="text-right text-sm text-gray-900">{service.duration} min</dd>
            </div>
          </dl>
          <div className="flex gap-2 border-t border-slate-100 pt-3">
            <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200" type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60" type="button" onClick={onDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </>
      )}
    </article>
  );
}

function ServiceList({ data }: { data: GetServicesResponse }) {
  if (data.services.length === 0) {
    return <p className="text-slate-600">No salon services yet.</p>;
  }

  return data.services.map((service) => (
    <ServiceCard key={service.id} service={service} />
  ));
}

export default ServiceList;
