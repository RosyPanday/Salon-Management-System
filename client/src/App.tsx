import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./router.js";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;