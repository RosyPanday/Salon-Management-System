import type { GetServicesResponse } from "../../../types/services.js";

function ServiceList({ data }: { data: GetServicesResponse }) {
  return data.services.map((service) => {
    let statusStyle="";
    return (
      <div className="bg-white rounded-lg flex flex-col gap-3 p-3 mt-3 w-70 flex-1" key={service.id}>
        {/* image */}
        <div className="flex justify-start flex-col">
            <div className="flex justify-between items-center">
           <label className="text-gray-600 text-sm">Service Name:</label>
           <label className="text-sm"> {service.serviceName}</label>
        </div>
        <div className="flex justify-between items-center flex-col">
           <label className="text-gray-600 text-sm">Price:</label>
           <label className="text-sm"> {service.price}</label>
        </div>
          <div className="flex justify-between items-center flex-col">
           <label className="text-gray-600 text-sm">duration:</label>
           <label className="text-sm"> {service.duration}</label>
        </div>
      </div>
      </div>
    );
  });
}
export default ServiceList;