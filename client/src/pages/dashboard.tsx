import Layout from "../components/layout/layout.js";
import DashboardContent from "../components/layout/dashboard/dashboard-content.js";
import { useDashboard } from "../hooks/dashboard/use-dashboard.js";

function Dashboard() {
  const { isExpanded, toggleSidebar }: UseDashboardReturn = useDashboard();

  return (
    <div className={`flex lg:flex font-['Arial']`}>
      <Layout isExpanded={isExpanded} toggleSidebar={toggleSidebar}>
        <DashboardContent />
      </Layout>
    </div>
  );
}
export default Dashboard;
