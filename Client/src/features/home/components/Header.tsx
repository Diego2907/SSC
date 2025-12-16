import { Link, useLocation } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";
import Button from "../../shared/components/Button";
import Image from "../../shared/components/Image";
import logo from "../assets/img/Logo.webp";
import Modal from "./login-modal";
import { useState, useEffect } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-20 bg-white dark:bg-gray-900 h-16 sm:h-20 md:h-24 shadow-lg transition-colors duration-300">
      <Link to="/">
        <Image
          SrcImage={logo}
          AltImage="Logo"
          classNameImage="w-20 h-10 sm:w-[102.47px] sm:h-[52.87px] dark:brightness-0 dark:invert"
        />
      </Link>

      <Navbar
        Links={[
          "Conócenos",
          "Servicios",
          "Marcas que trabajamos",
          "Preguntas frecuentes",
        ]}
        NavClassName="hidden md:flex gap-4 lg:gap-6"
        LinkClassName="font-poppins font-bold text-base lg:text-xl text-[#1D4289] dark:text-blue-400 hover:text-[#44D62c] transition-colors duration-200"
      />
      <Button
        ClassNameButton="hidden sm:block font-poppins text-[#1D4289] text-xs sm:text-sm lg:text-[15px] font-semibold bg-[#FFE900] w-auto px-4 lg:w-[260px] h-10 lg:h-[51px] border-black rounded-[10px] shadow-lg cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#E6D200] hover:text-[#14356E] hover:font-bold"
        onClick={abrirModal}
        textButton="Iniciar sesión | Registrarse"
      />
      <Modal isOpen={isModalOpen} onClose={cerrarModal} />
    </header>
  );
};

export default Header;
