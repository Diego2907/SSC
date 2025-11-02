import { Outlet } from "react-router-dom";
<<<<<<< HEAD:Client/src/layouts/MainLayout.tsx
import Header from "../features/home/components/Header";
=======
import Header from "../../home/components/Header";
>>>>>>> d3327d521f8617a9f7f95600582885bc9424cedf:Client/src/features/shared/layouts/MainLayout.tsx

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
