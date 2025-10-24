import React from "react";
import esqueleto from "../assets/img/background_logo_example.webp";

interface Brand {
  id: number;
  name: string;
  imagePath: string;
}

const Brands: React.FC = () => {
  // Centraliza las marcas en un array para fácil mantenimiento
  const brands: Brand[] = [
    { id: 1, name: "LG", imagePath: esqueleto },
    { id: 2, name: "Panasonic", imagePath: esqueleto },
    { id: 3, name: "Midea", imagePath: esqueleto },
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

        <div className="brands-grid flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-20">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="brand-item transition-transform duration-300 hover:scale-110"
            >



              <img
                src={brand.imagePath}
                alt={`Logo de ${brand.name}`}
                className="brand-logo w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto object-contain"
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
