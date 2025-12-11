import { useState } from "react";
import Logo_amarillo from "../assets/img/Logo - Amarillo.webp"; // Ajusta la ruta si es diferente
import { Link, useLocation } from "react-router-dom";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f2f7a] to-[#072053] relative">
      {/* Header superior solo blanco (opcional según tu proyecto) */}

      {/* Logo centrado */}
      <img src={Logo_amarillo} alt="Logo SHC" className="mt-14 w-36 sm:w-44" />

      {/* Card Form */}
      <section className="mt-6 bg-white w-[90%] max-w-md rounded-xl shadow-xl p-8 font-poppins">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Crear cuenta
        </h2>

        {/* Nombre */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Tu nombre</label>
          <input
            type="text"
            placeholder="Nombre y apellidos"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
          />
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
          />
        </div>

        {/* Repetir contraseña */}
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700">
            Vuelve a escribir la contraseña
          </label>
          <input
            type="password"
            placeholder="*******"
            onChange={(e) => setRepeatPass(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
          />
          {/* Mensaje de error */}
          {repeatPass && repeatPass !== password && (
            <p className="flex items-center gap-2 mt-1 text-red-600 text-xs font-medium">
              <span className="text-lg">●</span> La contraseña debe de tener al
              menos seis caracteres.
            </p>
          )}
        </div>

        {/* Botón */}
        <button className="mt-4 w-full bg-[#1D4289] hover:bg-[#163670] text-white py-2 font-semibold rounded-lg transition-colors">
          Continuar
        </button>

        {/* Footer */}
        <input type="checkbox" />
        <p className="text-[11px] mt-4 text-center text-gray-500">
          He aceptado las{" "}
          <a href="#" className="text-[#1D4289] underline">
            Condiciones de uso
          </a>{" "}
          y el{" "}
          <a href="#" className="text-[#1D4289] underline">
            Aviso de Privacidad
          </a>{" "}
          de SHC
        </p>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#1D4289] font-semibold">
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
