import { Outlet } from "react-router-dom";
import Header from "../features/home/components/Header";
import Footer from "../features/home/components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
