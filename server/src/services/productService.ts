import type {
  ProductCategoryEnum,
  ProductStatusEnum,
} from "#src/enums/productEnum.js";
import type { ProductInterface } from "#src/interfaces/productInterface.js";
import { ProductRepository } from "#src/repositories/productRepository.js";

export class ProductService {
  private ProductRepository: ProductRepository;

  constructor() {
    this.ProductRepository = new ProductRepository();
  }

  formatFileUrl = (filePath: string): string => {
    const normalizedPath = filePath.replace(/\\/g, "/");

    return normalizedPath.startsWith("/")
      ? normalizedPath
      : `/${normalizedPath}`;
  };


  public async getProducts(): Promise<ProductInterface[]> {
    return await this.ProductRepository.findAll({ raw: true });
  }
}