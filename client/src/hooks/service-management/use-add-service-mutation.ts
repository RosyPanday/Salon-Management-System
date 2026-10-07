import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import type { AddServiceOutput } from "../../schemas/add-service-schema.js";

export function useAddServiceMutation() {
  return useMutation({
    mutationFn: async (data: AddServiceOutput) => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${apiUrl}/api/services`, data);
      return response.data;
    },
  });
}