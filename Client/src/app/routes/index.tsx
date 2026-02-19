import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../features/shared/layouts/MainLayout";
import UserLayout from "../../features/shared/layouts/UserLayout";
import HomePage from "../../features/home/pages/HomePage";
import RegisterPage from "../../features/home/pages/ResgisterPage";
import LoginPage from "../../features/home/pages/LoginPage";
import UserProfilePage from "../../features/users/pages/UserProfilePage";
import UserSettingsPage from "../../features/users/pages/UserSettingsPage";
import RegisterTechnicianPage from "../../features/tecnicos/pages/RegisterTechnicianPage";
import LoginTechnicianPage from "../../features/tecnicos/pages/LoginTechnicianPage";
import TechnicianDashboardPage from "../../features/tecnicos/pages/TechnicianDashboardPage";
import SettingsTechnicianPage from "../../features/tecnicos/pages/SettingsTechnicianPage";
import TechnicianProfilePage from "../../features/tecnicos/pages/TechnicianProfilePage";
import SearchCenterPage from "../../features/tecnicos/pages/SearchCenterPage";
import ODSRequestsPage from "../../features/tecnicos/pages/ODSRequestsPage";
import ManualsPage from "../../features/tecnicos/pages/ManualsPage";
import PerceptionsPage from "../../features/tecnicos/pages/PerceptionsPage";

const router = createBrowserRouter([
  {
    path: "/", // Ruta base
    element: <MainLayout />, // Layout que engloba las páginas
    children: [
      {
        index: true, 
        element: <HomePage />, 
      },
      {
        path: "register", 
        element: <RegisterPage />,
      },
      {
        path: "login",  
        element: <LoginPage />,
      },
      {
        path: "technician/register", 
        element: <RegisterTechnicianPage />,
      },
      {
        path: "technician/login", 
        element: <LoginTechnicianPage />,
      },
      {
        path: "technician/dashboard", 
        element: <TechnicianDashboardPage />,
      },
      {
        path: "technician/profile", 
        element: <TechnicianProfilePage />,
      },
      {
        path: "technician/settings", 
        element: <SettingsTechnicianPage />,
      },
      {
        path: "technician/search", 
        element: <SearchCenterPage />,
      },
      {
        path: "technician/ods-requests", 
        element: <ODSRequestsPage />,
      },
      {
        path: "technician/manuals", 
        element: <ManualsPage />,
      },
      {
        path: "technician/perceptions", 
        element: <PerceptionsPage />,
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
