import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          draggable
          rtl={false}
          newestOnTop
          closeButton
          pauseOnHover
          closeOnClick
          theme="light"
          hideProgressBar
          pauseOnFocusLoss
          autoClose={5000}
          position="bottom-right"
        />
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </>
  )
}
