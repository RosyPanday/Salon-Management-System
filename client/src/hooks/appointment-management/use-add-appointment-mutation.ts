import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddAppointmentOutput } from "../../schemas/add-appointment-schema.js";

export function useAddAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddAppointmentOutput) => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/api/appointments`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
