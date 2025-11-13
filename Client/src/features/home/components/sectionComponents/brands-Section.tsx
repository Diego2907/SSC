import React from "react";
import lgLogo from "../../assets/img/LG_logo.webp";
import panasonicLogo from "../../assets/img/panosonic_logo.webp";
import mideaLogo from "../../assets/img/midea_logo.webp";
import Carousel from "../../../shared/components/Carousel"; // 🔹 Ajusta la ruta

const Brands: React.FC = () => {
  const images = [
    { src: lgLogo, alt: "Logo de LG", classNameImage: "h-48 object-contain" },
    {
      src: panasonicLogo,
      alt: "Logo de Panasonic",
      classNameImage: "h-48 object-contain",
    },
    {
      src: mideaLogo,
      alt: "Logo de Midea",
      classNameImage: "h-48 object-contain",
    },
  ];

  return (
    <section
      className="brands-section py-8 md:py-10 lg:py-12 "
      aria-labelledby="brands-title"
    >
      <div className="container mx-auto px-10 md:px-2 lg:px-2 relative mt-10">
        <h2
          id="brands-title"
          className="brands-title text-3xl md:text-4xl lg:text-5xl font-extrabold mb-16 md:mb-12 lg:mb-16 text-center"
        >
          Nuestras marcas
        </h2>

        {/* 🔹 Aquí se muestra el carrusel */}
        <Carousel
          images={images}
          className="max-w-20xl mx-auto"
          autoplayInterval={3000}
        />
      </div>
    </section>
  );
};

export default Brands;
