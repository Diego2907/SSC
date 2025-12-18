import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../features/shared/layouts/MainLayout";
import UserLayout from "../../features/shared/layouts/UserLayout";
import HomePage from "../../features/home/pages/HomePage";
import RegisterPage from "../../features/home/pages/ResgisterPage";
import LoginPage from "../../features/home/pages/LoginPage";
import UserProfilePage from "../../features/users/pages/UserProfilePage";
import UserSettingsPage from "../../features/users/pages/UserSettingsPage";

const router = createBrowserRouter([
  {
    path: "/", // Ruta base
    element: <MainLayout />, // Layout que engloba las páginas
    children: [
      {
        index: true, // Ruta principal -> "/"
        element: <HomePage />, // Página que se muestra
      },
      {
        path: "register", // Ruta para registro -> "/register"
        element: <RegisterPage />,
      },
      {
        path: "login", // Ruta para registro -> "/register"
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "settings",
        element: <UserSettingsPage />,
      },
      {
        path: "profile",
        element: <UserProfilePage />,
      },
    ],
  },
]);

export default router;
