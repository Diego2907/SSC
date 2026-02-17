import Header from "../components/Header";
import SideBar from "../components/SideBar";

const UserProfilePage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#0f2f7a] to-[#072053] flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-[#0f2f7a] to-[#072053]">
          MI PERFIIIIIL
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
