import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.delete(`${apiUrl}/api/appointments/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
