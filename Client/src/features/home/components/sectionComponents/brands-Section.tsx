import React from "react";
import Carousel from "../../../shared/components/Carousel.tsx";
import lgLogo from "../../assets/img/LG_logo.webp";
import panasonicLogo from "../../assets/img/panosonic_logo.webp";
import mideaLogo from "../../assets/img/midea_logo.webp";
import samsungLogo from "../../assets/img/Samsung_logo.webp";
import whirlpoolLogo from "../../assets/img/Whirlpool_Corporation_Logo.webp";
import sonyLogo from "../../assets/img/Sony_logo.webp";

interface Brand {
  id: number;
  imagePath: string;
}

const Brands: React.FC = () => {
  const brands: Brand[] = [
    { id: 1, imagePath: lgLogo },
    { id: 2, imagePath: panasonicLogo },
    { id: 3, imagePath: mideaLogo },
    { id: 4, imagePath: samsungLogo },
    { id: 5, imagePath: whirlpoolLogo },
    { id: 6, imagePath: sonyLogo },
  ];

  const carouselImages = brands.map((brand) => ({
    src: brand.imagePath,
    alt: "Logo de marca",
    classNameImage: "h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto",
  }));

  return (
    <section
      className="brands-section py-6 md:py-8"
      aria-labelledby="brands-title"
    >
      <header className="container mx-auto px-4 md:px-8 lg:px-16 mb-6 md:mb-8">
        <h2
          id="brands-title"
          className="brands-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-center"
        >
          Nuestras marcas
        </h2>
      </header>

      <div className="h-64 md:h-72 lg:h-80 overflow-hidden flex items-center">
        <Carousel
          images={carouselImages}
          className="w-full"
        />
      </div>
    </section>
  );
};

export default Brands;
