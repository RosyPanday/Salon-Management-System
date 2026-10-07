import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/api/services/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
}
