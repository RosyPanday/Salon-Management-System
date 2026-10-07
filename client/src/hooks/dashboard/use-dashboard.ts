import { useState } from "react";
import type { UseDashboardReturn } from "../../types/layout.js";


export function useDashboard(): UseDashboardReturn {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return {
    isExpanded,
    toggleSidebar,
  };
}
