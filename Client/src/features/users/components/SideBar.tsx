import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import User from "../assets/icons/User.svg";
import SignOut from "../assets/icons/SignOut.svg";

const SideBar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  {
    /* ===== SIDEBAR ===== */
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <aside className="flex flex-col h-full">
        <nav className="px-4 py-6 space-y-2">
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `w-full px-4 py-3 rounded-xl flex items-center gap-3
            ${
              isActive
                ? "bg-[#1D4289] text-white"
                : "text-black hover:bg-gray-100"
            }`
            }
          >
            <img src={User} alt="" className="w-5 h-5" />
            <span>Mi perfil</span>
          </NavLink>

          <NavLink
            to="/user/settings"
            className={({ isActive }) =>
              `w-full px-4 py-3 rounded-xl flex items-center gap-3
            ${
              isActive
                ? "bg-[#1D4289] text-white"
                : "text-black hover:bg-gray-100"
            }`
            }
          >
            <span>Configuracion</span>
          </NavLink>
        </nav>

        <div className="px-4 py-6 mt-auto">
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
