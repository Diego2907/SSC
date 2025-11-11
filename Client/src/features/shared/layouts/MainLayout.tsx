import { Outlet } from "react-router-dom";
import Header from "../../home/components/Header";
import { useState, useEffect } from "react";
import botonImg from "../../home/assets/img/boton.webp";
import flechaBotonImg from "../../home/assets/img/flecha_boton.webp";

const MainLayout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Mostrar el botón cuando se haya scrolleado más de 400px
      setShowButton(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <Header />
      <Outlet />
      
      {/* Botón flotante para volver arriba */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-20 md:h-20 
                     transition-all duration-300 transform hover:scale-110 active:scale-95
                     focus:outline-none"
          aria-label="Volver arriba"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {/* Imagen de fondo del botón (círculo amarillo) */}
          <div className="relative w-full h-full">
            <img
              src={botonImg}
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
            />
            
            {/* Flecha encima del botón - tamaño reducido */}
            <img
              src={flechaBotonImg}
              alt="Flecha arriba"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         w-6 h-6 md:w-7 md:h-7 object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default MainLayout;