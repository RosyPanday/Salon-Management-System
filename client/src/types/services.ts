export interface ServiceInterface {
  id: number;
  serviceName: string;
  price: number;
  duration: number;
}

export interface GetServicesResponse {
  message: string;
  services: ServiceInterface[];
}
