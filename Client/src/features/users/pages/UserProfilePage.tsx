import Header from "../components/Header";
import SideBar from "../components/SideBar";

const UserProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6">MI PERFIIIIIL</main>
      </div>
    </div>
  );
};

export default UserProfilePage;
