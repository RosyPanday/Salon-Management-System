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

  public async getAppointment(id: number): Promise<AppointmentInterface | null> {
    return this.findByPk(id);
  }

  public async editService(
    id: number,
    appointmentData: Partial<AppointmentInterface>,
  ): Promise<[number]> {
    return this.updateOne({ id, input: appointmentData });
  }

  public async deleteAppointment(id: number): Promise<number> {
    return this.deleteOne(id);
  }
}