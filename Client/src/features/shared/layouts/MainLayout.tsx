import { Outlet } from "react-router-dom";
import Header from "../../home/components/Header";

const MainLayout = () => {
  return (
    <div className="relative">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
