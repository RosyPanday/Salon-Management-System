import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { GetAppointmentsResponse } from "../../types/appointments.js";

export function useViewAppointmentsQuery() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get<GetAppointmentsResponse>(
        `${apiUrl}/api/appointments`,
      );
      return response.data;
    },
  });
}
