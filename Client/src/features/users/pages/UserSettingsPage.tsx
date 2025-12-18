import { useState } from "react";
import Header from "../components/Header";
import avatar from "../assets/icons/avatar.svg";
import chats from "../assets/icons/chats.svg";
import edit from "../assets/icons/edit.svg";
import Mensajes from "../assets/icons/Mensajes.svg";
import Notificaciones from "../assets/icons/Notificaciones.svg";
import SignOut from "../assets/icons/SignOut.svg";
import User from "../assets/icons/User.svg";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
const UserSettingsPage = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2f7a] to-[#072053]">
      {/* ===== HEADER ===== */}
      <Header />

      <div className="flex">
        {/* ===== SIDEBAR ===== */}
        <SideBar />
        {/* ===== CONTENT ===== */}
        <main className="flex-1 p-8">
          <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Usuario */}
            <section className="bg-[#F7F8FA] rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6">Usuario</h2>

              <div className="flex gap-6">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full shadow"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Milene Bejarano</p>
                    <button className="p-2 bg-white rounded-full shadow">
                      <img src={edit} alt="" className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-semibold mt-6 mb-3">Datos personales</h3>

                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded border">
                      Milene Itzel
                    </div>
                    <div className="bg-white p-3 rounded border">Bejarano</div>
                    <div className="bg-white p-3 rounded border">Gutiérrez</div>
                    <div className="bg-white p-3 rounded border">
                      Av Carlos Páez Stille 408, Cd. Guzmán
                    </div>
                    <div className="bg-white p-3 rounded border">
                      312 589 4786
                    </div>
                    <div className="bg-white p-3 rounded border">
                      corrfal456@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seguridad */}
            <section className="bg-[#F7F8FA] rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">
                Contraseña y autenticación
              </h2>

              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Contraseña actual"
                  className="w-full p-3 rounded border"
                />
                <input
                  type="password"
                  placeholder="Contraseña nueva"
                  className="w-full p-3 rounded border"
                />
                <input
                  type="password"
                  placeholder="Confirmar nueva contraseña"
                  className="w-full p-3 rounded border"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button className="px-4 py-2 bg-gray-300 rounded">
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-[#1D4289] text-white rounded">
                  Listo
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ===== MODAL CERRAR SESIÓN ===== */}
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

export default UserSettingsPage;
