import Model from "#src/models/index.js";
import { BaseRepository } from "./baseRepository.js";

export class ProductRepository extends BaseRepository<
  ProductInterface,
  ProductInterface
> {
  constructor() {
    super(Model.Product);
  }
}
