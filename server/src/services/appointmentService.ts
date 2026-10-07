import type { AppointmentStatusEnum } from "#src/interfaces/appointmentInterface.js";
import type { AppointmentInterface } from "#src/interfaces/AppointmentInterface.js";
import { AppointmentRepository } from "#src/repositories/appointmentRepository.js";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  public async getAppointments(
    status: AppointmentStatusEnum,
  ): Promise<AppointmentInterface[]> {
    return this.appointmentRepository.findAll({ where: { status: status } });
  }

  public async addAppointment(
    appointmentData: AppointmentInterface,
  ): Promise<void> {
    await this.appointmentRepository.create(appointmentData);
  }

  public async editAppointment(
    id: number,
    appointmentData: Partial<AppointmentInterface>,
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