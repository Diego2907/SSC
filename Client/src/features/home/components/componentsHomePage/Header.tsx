import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";
import Button from "../../../shared/components/Button";
import Image from "../../../shared/components/Image";
import logo from "../../assets/img/Logo.webp";
import Modal from "../login-modal";
import { useState, useEffect } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    setIsModalOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Cerrar menú móvil cuando se hace resize a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-20 bg-white dark:bg-gray-900 h-14 sm:h-16 md:h-24 shadow-lg transition-colors duration-300">
        <Link to="/">
          <Image
            SrcImage={logo}
            AltImage="Logo"
            classNameImage="w-16 h-8 sm:w-20 sm:h-10 md:w-[102.47px] md:h-[52.87px] dark:brightness-0 dark:invert"
          />
        </Link>

        {/* Navbar Desktop */}
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

        {/* Botón Desktop */}
        <Button
          ClassNameButton="hidden md:block font-poppins text-[#1D4289] text-xs sm:text-sm lg:text-[15px] font-semibold bg-[#FFE900] w-auto px-4 lg:w-[260px] h-10 lg:h-[51px] border-black rounded-[10px] shadow-lg cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#E6D200] hover:text-[#14356E] hover:font-bold"
          onClick={abrirModal}
          textButton="Iniciar sesión | Registrarse"
        />

        {/* Botón Hamburguesa Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-[#1D4289] p-2 transition-all duration-300"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white rounded my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        <Modal isOpen={isModalOpen} onClose={cerrarModal} />
      </header>

      {/* Menú Móvil Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        ></div>

        {/* Drawer Panel */}
        <nav
          className={`absolute top-14 right-0 w-72 max-w-[85vw] h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col p-6 space-y-4">
            <a
              href="#conocenos"
              onClick={closeMobileMenu}
              className="font-poppins font-bold text-lg text-[#1D4289] dark:text-blue-400 hover:text-[#44D62C] py-3 border-b border-gray-100 dark:border-gray-700 transition-colors"
            >
              Conócenos
            </a>
            <a
              href="#servicios"
              onClick={closeMobileMenu}
              className="font-poppins font-bold text-lg text-[#1D4289] dark:text-blue-400 hover:text-[#44D62C] py-3 border-b border-gray-100 dark:border-gray-700 transition-colors"
            >
              Servicios
            </a>
            <a
              href="#marcas"
              onClick={closeMobileMenu}
              className="font-poppins font-bold text-lg text-[#1D4289] dark:text-blue-400 hover:text-[#44D62C] py-3 border-b border-gray-100 dark:border-gray-700 transition-colors"
            >
              Marcas que trabajamos
            </a>
            <a
              href="#preguntas-frecuentes"
              onClick={closeMobileMenu}
              className="font-poppins font-bold text-lg text-[#1D4289] dark:text-blue-400 hover:text-[#44D62C] py-3 border-b border-gray-100 dark:border-gray-700 transition-colors"
            >
              Preguntas frecuentes
            </a>

            {/* CTA Móvil */}
            <Button
              ClassNameButton="mt-4 w-full font-poppins text-[#1D4289] text-sm font-semibold bg-[#FFE900] h-12 rounded-[10px] shadow-lg cursor-pointer transition-all duration-200"
              onClick={() => {
                closeMobileMenu();
                abrirModal();
              }}
              textButton="Iniciar sesión"
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
