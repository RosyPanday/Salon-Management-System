export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface AppointmentInterface {
  id: number;
  customerName: string;
  customerPhone: string;
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes: string | null;
  status: AppointmentStatus;
}

export interface AddAppointmentInput {
  customerName: string;
  customerPhone: string;
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}

export interface GetAppointmentsResponse {
  appointments: AppointmentInterface[];
}
