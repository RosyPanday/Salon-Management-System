import { useAddServices } from "../../../hooks/service-management/use-add-services.js";

function AddServiceForm() {
  const {
    register,
    handleSubmit,
    onSubmitEvent,
    errors,
    isPending,
    setValue,
    control,
  } = useAddServices();
  return (
    <form onSubmit={handleSubmit(onSubmitEvent)}>
      <div className="text-gray-800">Service Name *</div>
      <input
        className="px-4 py-2 rounded-lg bg-gray-100 xs:w-30"
        {...register("serviceName")}
        type="text"
        placeholder="Enter Service Name"
      />
      {errors.serviceName && (
        <p className="text-red-600">{errors.serviceName.message}</p>
      )}
      {/* price */}
      <div className="text-gray-800">Service Price *</div>
      <input
        className="px-4 py-2 rounded-lg bg-gray-100 xs:w-30"
        {...register("price")}
        type="text"
        placeholder="Enter Service Price"
      />
      {errors.price && (
        <p className="text-red-600">{errors.price.message}</p>
      )}
      {/* duration */}
      <div className="text-gray-800">Service Duration *</div>
      <input
        className="px-4 py-2 rounded-lg bg-gray-100 xs:w-30"
        {...register("duration", { valueAsNumber: true })}
        type="number"
        min="1"
        step="1"
        placeholder="Duration in minutes"
      />
      {errors.duration && (
        <p className="text-red-600">{errors.duration.message}</p>
      )}
      {errors.root && (
        <p role="alert" className="text-red-600">{errors.root.message}</p>
      )}
      {/* button */}
         <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 p-4 text-white cursor-pointer"
      >
        {isPending ? (
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Saving</span>
          </div>
        ) : (
          "Save Service"
        )}
      </button>
    </form>
  );
}

export default AddServiceForm;
