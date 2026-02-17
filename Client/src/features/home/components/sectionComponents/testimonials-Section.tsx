import React from "react";
import testimonialsBg from "../../assets/img/lo_que_dicen_nuestros_clientes.webp";

const Testimonials: React.FC = () => {
  return (
    <section id="preguntas-frecuentes" className="testimonials-section py-8 md:py-12">
      <div className="w-full">
        <img
          src={testimonialsBg}
          alt="Lo que dicen nuestros clientes - Testimonios de clientes satisfechos con nuestros servicios de reparación"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Testimonials;
