import Logo from "../assets/img/Logo.webp";
import Image from "../../shared/components/Image";
import { Link } from "react-router-dom";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Contenedor del modal */}
      <div
        className="
        bg-gradient-to-b from-blue-500 via-blue-900 to-black
        rounded-2xl shadow-2xl relative
        w-full max-w-[590px] 
        min-h-[674px]
        p-10
        text-white
      "
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
        >
          ✕
        </button>

        {/* Logo (puedes reemplazar por tu image tag) */}
        <div className="w-full flex justify-center mb-6">
          <Image SrcImage={Logo} AltImage="Logo" classNameImage="w-32 h-auto" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-6">
          Iniciar sesión
        </h2>

        {/* Google button */}
        <button className="w-full bg-white text-black rounded-lg py-2 mb-3 flex items-center gap-3 justify-center shadow">
          Iniciar sesión con Google
        </button>

        {/* Facebook button */}
        <button className="w-full bg-white text-black rounded-lg py-2 mb-8 flex items-center gap-3 justify-center shadow">
          Iniciar sesión con Facebook
        </button>

        {/* Línea divisora */}
        <div className="flex items-center gap-4 mb-8">
          <span className="flex-1 h-px bg-gray-500"></span>
          <span className="text-gray-300">o</span>
          <span className="flex-1 h-px bg-gray-500"></span>
        </div>

        {/* Email */}
        <label className="text-sm">Email</label>
        <input
          type="email"
          className="w-full bg-white text-black rounded-lg p-2 mb-4"
        />

        {/* Contraseña */}
        <label className="text-sm">Contraseña</label>
        <input
          type="password"
          className="w-full bg-white text-black rounded-lg p-2 mb-6"
        />

        {/* Iniciar sesión */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold">
          Iniciar sesión
        </button>

        {/* Registro */}
        <p className="text-center text-sm text-gray-300 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Modal;
