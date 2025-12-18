import { useState } from "react";
import { Link } from "react-router-dom";
import User from "../assets/icons/User.svg";
import SignOut from "../assets/icons/SignOut.svg";

const SideBar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  {
    /* ===== SIDEBAR ===== */
  }

  return (
    <div>
      <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)]">
        <nav className="px-4 py-6 space-y-2">
          <button className="w-full px-4 py-3 rounded-xl text-white flex items-center gap-3">
            <img src={User} alt="" className="w-5 h-5" />
            <Link to="/user/profile">
              <span className="text-black">Mi perfil</span>
            </Link>
          </button>

          <button className="w-full px-4 py-3 rounded-xl bg-[#1D4289]  flex items-center gap-3">
            <Link to="/user/settings">
              <span className="font-semibold text-white">Configuración</span>
            </Link>
          </button>
        </nav>

        <div className="px-4 py-6">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 text-red-500 font-semibold"
          >
            <img src={SignOut} alt="" className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-xl">
            <img
              src={SignOut}
              alt="Cerrar sesión"
              className="w-20 mx-auto mb-6"
            />

            <p className="text-lg font-medium mb-6">
              ¿Estás seguro de querer cerrar sesión?
            </p>

            <div className="flex flex-col gap-3">
              <button
                className="py-2 rounded-md bg-gray-300"
                onClick={() => {
                  console.log("Cerrar sesión real aquí");
                }}
              >
                <Link to="/login">Cerrar sesión</Link>
              </button>

              <button
                className="py-2 rounded-md bg-[#1D4289] text-white"
                onClick={() => setShowLogoutModal(false)}
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
