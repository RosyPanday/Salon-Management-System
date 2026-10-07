import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { GetServicesResponse } from "../../types/services.js";

export function useViewServicesQuery() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get<GetServicesResponse>(
        `${apiUrl}/api/services`,
      );
      return response.data;
    },
  });
}