import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default UserLayout;
