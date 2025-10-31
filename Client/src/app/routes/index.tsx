import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";
import HomePage from "../../features/home/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/", // Ruta base
    element: <MainLayout />, // Layout que engloba las páginas
    children: [
      {
        index: true, // Ruta principal -> "/"
        element: <HomePage />, // Página que se muestra
      },
    ],
  },
]);

export default router;
