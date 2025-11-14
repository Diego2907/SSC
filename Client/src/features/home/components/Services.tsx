import React from 'react';
import banner from '../assets/img/banner.webp';
import obrero from '../assets/img/obrero.webp';

const Services: React.FC = () => {
  return (
    <section className="relative bg-[#183a7a] text-white overflow-hidden">
      {/* Background banner image - subtle */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${banner})` }}
        aria-hidden="true"
      />

      {/* Obrero image - positioned on the LEFT side, large and expanded */}
      <img
        src={obrero}
        alt="Obrero"
        className="hidden lg:block absolute left-0 top-0 w-auto object-contain object-left-top opacity-90 pointer-events-none"
        style={{ 
          height: '100%',
          maxHeight: '600px',
          maxWidth: '40%',
          filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.4))'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-24 relative z-10">
        {/* Header section */}
        <div className="mb-12 lg:mb-16">
          <p className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-semibold mb-6">
            ¿En qué podemos ayudarte?
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Nuestros servicios
          </h2>
          <p className="text-base md:text-lg text-gray-100 max-w-3xl leading-relaxed">
            Ofrecemos mantenimiento, reparación e instalación de línea blanca
            con personal certificado. Selecciona el servicio que necesites
            y te atenderemos de manera rápida y profesional.
          </p>
        </div>

        {/* Cards Grid - 3 columns with auto heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Card 1: Mantenimiento */}
          <article className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl h-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">
              Mantenimiento
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Cuidamos tus electrodomésticos con mantenimiento preventivo y 
              correctivo, garantizando su óptimo rendimiento.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Aires acondicionados
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Lavadoras
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Secadoras
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Refrigeradores
              </button>
            </div>
            <div className="flex justify-center">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-2">
                Ocultar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </article>

          {/* Card 2: Reparación - Más corta */}
          <article className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl h-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">
              Reparación
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Soluciones rápidas y efectivas para que tus electrodomésticos 
              vuelvan a funcionar como nuevos.
            </p>
            <div className="flex justify-center">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-2">
                Ver más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </article>

          {/* Card 3: Instalación - Más alta */}
          <article className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl h-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">
              Instalación
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Instalación profesional con garantía para que disfrutes de tus 
              equipos con total seguridad y eficiencia.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Aires acondicionados
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Lavadoras
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Secadoras
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Refrigeradores
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Estufas
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Hornos
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg col-span-2 transition-colors">
                Televisores
              </button>
            </div>
            <div className="flex justify-center">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-2">
                Ocultar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Services;