import { z } from "zod";

export const addAppointmentSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(1, "Customer phone is required"),
  serviceId: z.coerce.number().int().positive("Choose a service"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  notes: z.string().optional(),
});

export type AddAppointmentInput = z.input<typeof addAppointmentSchema>;
export type AddAppointmentOutput = z.output<typeof addAppointmentSchema>;
