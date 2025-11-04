import React from 'react';
import achievementImage from '../assets/img/Group-1000005811.webp';

const Achievements: React.FC = () => {
  return (
    <section className="bg-[#1D4488] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex justify-center items-center">
          <img
            src={achievementImage}
            alt="Logros de la empresa - +1500 Reparaciones concluidas, +900 Clientes satisfechos, +15 Reconocimientos de calidad, +9 Sucursales en el estado"
            className="w-full max-w-6xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Achievements;