import { useState, useEffect } from "react";
import botonImg from "../assets/img/boton.webp";
import flechaBotonImg from "../assets/img/flecha_boton.webp";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Mostrar o no el botón dependiendo del scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-20 md:h-20 
                 transition-all duration-300 transform hover:scale-110 active:scale-95
                 focus:outline-none"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        outline: "none",
      }}
      aria-label="Volver arriba"
    >
      <div className="relative w-full h-full">
        <img
          src={botonImg}
          alt=""
          className="w-full h-full object-contain drop-shadow-lg"
        />

        <img
          src={flechaBotonImg}
          alt="Flecha arriba"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-6 h-6 md:w-7 md:h-7 object-contain"
        />
      </div>
    </button>
  );
};

export default ScrollToTopButton;
