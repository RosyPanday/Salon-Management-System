import type { AppointmentInterface } from "#src/interfaces/AppointmentInterface.js";
import Model from "#src/models/index.js";
import { BaseRepository } from "./baseRepository.js";

export class AppointmentRepository extends BaseRepository<
  AppointmentInterface,
  AppointmentInterface
> {
  constructor() {
    super(Model.Appointment);
  }
}