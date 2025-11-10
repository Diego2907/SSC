
import React from "react";
import lgLogo from "../assets/img/LG_logo.webp";
import panasonicLogo from "../assets/img/panosonic_logo.webp";
import mideaLogo from "../assets/img/midea_logo.webp";

interface Brand {
  id: number;
  name: string;
  imagePath: string;
}

const Brands: React.FC = () => {
  // Centraliza las marcas en un array para fácil mantenimiento
  const brands: Brand[] = [
    { id: 1, name: "LG", imagePath: lgLogo },
    { id: 2, name: "Panasonic", imagePath: panasonicLogo },
    { id: 3, name: "Midea", imagePath: mideaLogo },
  ];

  return (
    <section 
      className="brands-section py-16 md:py-20 lg:py-24" 
      aria-labelledby="brands-title"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2
          id="brands-title"
          className="brands-title text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10 md:mb-12 lg:mb-16 text-center"
        >
          Nuestras marcas
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-24">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="brand-item"
            >
              <img
                src={brand.imagePath}
                alt={`Logo de ${brand.name}`}
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
