import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddServiceOutput } from "../../schemas/add-service-schema.js";

type EditableService = Omit<AddServiceOutput, "id">;

export function useEditServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: EditableService }) => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.put(`${apiUrl}/api/services/${id}`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
}
