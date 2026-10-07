import type { ServiceInterface } from "#src/interfaces/serviceInterface.js";
import Model from "#src/models/index.js";
import { BaseRepository } from "./baseRepository.js";

export class SalonServiceRepository extends BaseRepository<
  ServiceInterface,
  ServiceInterface
> {
  constructor() {
    super(Model.Service);
  }

  public async getService(id: number): Promise<ServiceInterface | null> {
    return this.findByPk(id);
  }

  public async editService(
    id: number,
    serviceData: Partial<ServiceInterface>,
  ): Promise<[number]> {
    return this.updateOne({ id, input: serviceData });
  }

  public async deleteService(id: number): Promise<number> {
    return this.deleteOne(id);
  }
}
