import type { AppointmentInterface } from "#src/interfaces/AppointmentInterface.js";
import { AppointmentRepository } from "#src/repositories/appointmentRepository.js";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  public async getAppointments(): Promise<AppointmentInterface[]> {
    return this.appointmentRepository.getAppointments();
  }

  public async addAppointment(
    appointmentData: AppointmentInterface,
  ): Promise<void> {
    await this.appointmentRepository.addAppointment(appointmentData);
  }

  public async editAppointment(
    id: number,
    appointmentData: Partial<AppointmentInterface>,
  ): Promise<[number]> {
    return this.appointmentRepository.editAppointment(id, appointmentData);
  }

  public async deleteAppointment(id: number): Promise<number> {
    return this.appointmentRepository.deleteAppointment(id);
  }
}
