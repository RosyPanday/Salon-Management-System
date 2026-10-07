import { useNavigate, useSearchParams } from "react-router-dom";

function AppointmentManagementNavbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAddingAppointment = searchParams.get("view") === "add";

  return (
    <header className="border-b border-slate-200 bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <h1 className="text-lg font-semibold">Appointment management</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/appointment-management?view=add")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${isAddingAppointment ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
          >
            Add appointment
          </button>
          <button
            type="button"
            onClick={() => navigate("/appointment-management")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${!isAddingAppointment ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
          >
            View appointments
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
          >
            Go to service management
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AppointmentManagementNavbar;
