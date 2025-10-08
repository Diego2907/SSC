import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ props }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
primera - entrega - landing;
