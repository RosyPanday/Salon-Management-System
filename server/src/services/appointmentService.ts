import type { AppointmentAttributes } from "#src/interfaces/appointmentInterface.js";
import { AppointmentRepository } from "#src/repositories/appointmentRepository.js";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  public async getAppointments(): Promise<AppointmentAttributes[]> {
    return this.appointmentRepository.findAll({raw:true});
  }

  public async addAppointment(
    appointmentData: AppointmentAttributes,
  ): Promise<void> {
    await this.appointmentRepository.create(appointmentData);
  }

  public async editAppointment(
    id: number,
    appointmentData: Partial<AppointmentAttributes>,
  ): Promise<[number]> {
    return this.appointmentRepository.update({
      where: { id },
      input: appointmentData,
    });
  }

  public async deleteAppointment(id: number): Promise<number> {
    return this.appointmentRepository.deleteOne(id);
  }
}
