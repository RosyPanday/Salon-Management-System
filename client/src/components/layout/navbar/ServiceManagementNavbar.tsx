import { NavLink } from "react-router-dom";
import { useServiceManagementDashboard } from "../../../hooks/service-management/use-service-management-dashboard.js";

function ServiceManagementNavbar() {
  const { togglePage } = useServiceManagementDashboard();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-violet-100 text-violet-800"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <NavLink
            to="/service-management/create-services"
            className={linkClass}
          >
            Add a service
          </NavLink>
          <NavLink to="/service-management/services" className={linkClass}>
            View salon services
          </NavLink>
        </div>
        <button
          type="button"
          onClick={togglePage}
          className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-800"
        >
          Go to appointment management
        </button>
      </nav>
    </header>
  );
}

export default ServiceManagementNavbar;
