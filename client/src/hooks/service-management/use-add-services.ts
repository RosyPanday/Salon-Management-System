import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 
import axios from "axios";
import { addServiceSchema, type AddServiceInput, type AddServiceOutput } from "../../schemas/add-service-schema.js";
import { useAddServiceMutation } from "./use-add-service-mutation.js";


export function useAddServices() {
  const navigate = useNavigate();
  const addServiceMutation = useAddServiceMutation();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddServiceInput, any, AddServiceOutput>({
    resolver: zodResolver(addServiceSchema),
  });

  const onSubmitEvent: SubmitHandler<AddServiceOutput> = async (data) => {
    try {
      await addServiceMutation.mutateAsync(data);
      toast.success("Service added to database successfully. View services to view the new service");
      reset();
      navigate("/");
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? error.message
        : "Unable to save the service. Please try again.";
      setError("root", {
        message,
      });
    }
  };

  return {
    register,
    handleSubmit,
    setError,
    errors,
    control,
    setValue,
    onSubmitEvent,
    isPending: addServiceMutation.isPending || isSubmitting,
  };
}