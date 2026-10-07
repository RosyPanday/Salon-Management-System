import type { ServiceInterface } from "#src/interfaces/serviceInterface.js";
import { SalonServiceRepository } from "#src/repositories/salonRepository.js";

export class SalonService {
  private SalonServiceRepository: SalonServiceRepository;

  constructor() {
    this.SalonServiceRepository = new SalonServiceRepository();
  }

  public async getServices(): Promise<ServiceInterface[]> {
    return await this.SalonServiceRepository.findAll({ raw: true });
  }
  public async getSingleService(id: number): Promise<ServiceInterface | null> {
    return this.SalonServiceRepository.findOne({where:{id}, raw:true});
  }
  public async addService(serviceData:ServiceInterface): Promise<void> {
    await this.SalonServiceRepository.create(serviceData);
  }

  public async editService(id: number, serviceData: Partial<ServiceInterface>): Promise<void> {
    await this.SalonServiceRepository.updateOne({id, input:serviceData});
  }

  public async deleteService(id: number): Promise<void> {
    await this.SalonServiceRepository.deleteOne(id);
  }
}