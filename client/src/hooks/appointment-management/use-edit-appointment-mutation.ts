import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AppointmentStatus } from "../../types/appointments.js";

export function useEditAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: AppointmentStatus }) => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.patch(
        `${apiUrl}/api/appointments/${id}/status`,
        { status },
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
