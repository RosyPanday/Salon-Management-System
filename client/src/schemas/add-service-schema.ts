import { z } from "zod";

export const addServiceSchema = z.object({
   id: z.number().optional(),
   serviceName: z.string().min(4, "Service name must be at least 4 characters long"),
   price:z.coerce.number(). min(1).max(10000),
   duration: z.coerce.number().int().positive("Duration must be a positive number of minutes"),
     
});

export type AddServiceInput = z.input<typeof addServiceSchema>;

export type AddServiceOutput = z.output<typeof addServiceSchema>;
