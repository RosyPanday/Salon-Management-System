import { useViewServicesQuery } from "../../../hooks/service-management/use-view-services-query.js";
import ServiceList from "./service-list.js";


function ViewServices() {
  const {data,isPending,error}= useViewServicesQuery();
  return (
    <div className="flex flex-col gap-3 p-4 bg-pink-100">
     
      <div className="flex flex-col gap-3">
          {isPending && <div className="ml-100 mt-50 size-50 justify-center items-center rounded-full border-20 border-white/30 border-t-white animate-spin"/>}
          {error &&  <p className="text-red-900">something went wrong</p>}
          <div className="flex flex-wrap gap-4">
          {data && <ServiceList data={data}/>}
          </div>
      </div>
    </div>
  );
}

export default ViewServices;