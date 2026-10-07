import type { AppointmentAttributes } from "#src/interfaces/appointmentInterface.js";
import Model from "#src/models/index.js";
import { BaseRepository } from "./baseRepository.js";

export class AppointmentRepository extends BaseRepository<
  AppointmentAttributes,
  AppointmentAttributes
> {
  constructor() {
    super(Model.Appointment);
  }
}
