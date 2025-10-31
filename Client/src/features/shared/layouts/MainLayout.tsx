import { Outlet } from "react-router-dom";
import Header from "../../features/home/components/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
