import React, { useState } from 'react';
import obrero from '../assets/img/obrero.webp';

// Datos de los servicios con sus electrodomésticos
const servicesData = {
  mantenimiento: {
    title: 'Mantenimiento',
    description: 'Cuidamos tus electrodomésticos con mantenimiento preventivo y correctivo, garantizando su óptimo rendimiento.',
    items: ['Aires acondicionados', 'Lavadoras', 'Secadoras', 'Refrigeradores']
  },
  reparacion: {
    title: 'Reparación',
    description: 'Soluciones rápidas y efectivas para que tus electrodomésticos vuelvan a funcionar como nuevos.',
    items: ['Aires acondicionados', 'Lavadoras', 'Secadoras', 'Refrigeradores', 'Estufas', 'Hornos']
  },
  instalacion: {
    title: 'Instalación',
    description: 'Instalación profesional con garantía para que disfrutes de tus equipos con total seguridad y eficiencia.',
    items: ['Aires acondicionados', 'Lavadoras', 'Secadoras', 'Refrigeradores', 'Estufas', 'Hornos', 'Televisores']
  }
};

type CardKey = 'mantenimiento' | 'reparacion' | 'instalacion';

const Services: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    mantenimiento: false,
    reparacion: false,
    instalacion: false
  });

  const toggleCard = (cardKey: CardKey) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  const isExpanded = (cardKey: CardKey) => expandedCards[cardKey];

  return (
    <section id="servicios" className="relative bg-[#1D4289] text-white overflow-hidden min-h-[600px]">
      <img
        src={obrero}
        alt="Técnico profesional de Servi Hogar"
        className="hidden lg:block absolute left-0 bottom-0 h-full max-h-[650px] w-auto object-contain object-left-bottom pointer-events-none select-none z-[5]"
        style={{ 
          filter: 'drop-shadow(4px 0 20px rgba(0,0,0,0.3))',
          marginLeft: '-20px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block bg-[#DA291C] text-white px-4 py-1.5 text-xs font-semibold mb-4 font-poppins rounded">
            ¿En qué podemos ayudarte?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-poppins">
            Nuestros servicios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto items-start">
          
          <article className="bg-white text-[#1A1A1A] rounded-xl p-5 lg:p-6 shadow-lg flex flex-col">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A] font-poppins text-center">
              {servicesData.mantenimiento.title}
            </h3>
            <p className="text-[#4B5563] mb-4 leading-relaxed font-poppins text-xs md:text-sm text-center">
              {servicesData.mantenimiento.description}
            </p>
            
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded('mantenimiento') ? 'max-h-[180px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
              <div className="grid grid-cols-2 gap-2">
                {servicesData.mantenimiento.items.map((item, index) => (
                  <button 
                    key={index}
                    className="bg-[#44D62C] hover:bg-[#3bc025] text-white text-[11px] md:text-xs font-semibold px-2 py-2 rounded-md transition-all duration-200 font-poppins"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-auto">
              <button 
                onClick={() => toggleCard('mantenimiento')}
                className="border border-[#5B8DEF] text-[#5B8DEF] hover:bg-[#5B8DEF]/10 font-medium px-6 py-2 rounded-full transition-all duration-300 inline-flex items-center gap-2 font-poppins text-sm"
              >
                {isExpanded('mantenimiento') ? 'Ocultar' : 'Ver más'}
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 ${isExpanded('mantenimiento') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </article>

          <article className="bg-white text-[#1A1A1A] rounded-xl p-5 lg:p-6 shadow-lg flex flex-col">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A] font-poppins text-center">
              {servicesData.reparacion.title}
            </h3>
            <p className="text-[#4B5563] mb-4 leading-relaxed font-poppins text-xs md:text-sm text-center">
              {servicesData.reparacion.description}
            </p>
            
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded('reparacion') ? 'max-h-[180px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
              <div className="grid grid-cols-2 gap-2">
                {servicesData.reparacion.items.map((item, index) => (
                  <button 
                    key={index}
                    className="bg-[#44D62C] hover:bg-[#3bc025] text-white text-[11px] md:text-xs font-semibold px-2 py-2 rounded-md transition-all duration-200 font-poppins"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-auto">
              <button 
                onClick={() => toggleCard('reparacion')}
                className="border border-[#5B8DEF] text-[#5B8DEF] hover:bg-[#5B8DEF]/10 font-medium px-6 py-2 rounded-full transition-all duration-300 inline-flex items-center gap-2 font-poppins text-sm"
              >
                {isExpanded('reparacion') ? 'Ocultar' : 'Ver más'}
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 ${isExpanded('reparacion') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </article>

          <article className="bg-white text-[#1A1A1A] rounded-xl p-5 lg:p-6 shadow-lg flex flex-col md:col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-[#1A1A1A] font-poppins text-center">
              {servicesData.instalacion.title}
            </h3>
            <p className="text-[#4B5563] mb-4 leading-relaxed font-poppins text-xs md:text-sm text-center">
              {servicesData.instalacion.description}
            </p>
            
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded('instalacion') ? 'max-h-[220px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
              <div className="grid grid-cols-2 gap-2">
                {servicesData.instalacion.items.slice(0, 6).map((item, index) => (
                  <button 
                    key={index}
                    className="bg-[#44D62C] hover:bg-[#3bc025] text-white text-[11px] md:text-xs font-semibold px-2 py-2 rounded-md transition-all duration-200 font-poppins"
                  >
                    {item}
                  </button>
                ))}
                {servicesData.instalacion.items.length > 6 && (
                  <button 
                    className="bg-[#44D62C] hover:bg-[#3bc025] text-white text-[11px] md:text-xs font-semibold px-2 py-2 rounded-md transition-all duration-200 font-poppins col-span-2"
                  >
                    {servicesData.instalacion.items[6]}
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-auto">
              <button 
                onClick={() => toggleCard('instalacion')}
                className="border border-[#5B8DEF] text-[#5B8DEF] hover:bg-[#5B8DEF]/10 font-medium px-6 py-2 rounded-full transition-all duration-300 inline-flex items-center gap-2 font-poppins text-sm"
              >
                {isExpanded('instalacion') ? 'Ocultar' : 'Ver más'}
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 ${isExpanded('instalacion') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
