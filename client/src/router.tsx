import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard.js";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  }
]);
