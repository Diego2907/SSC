import React from "react";
import handsIcon from "../../assets/stats-icons/hands.svg";
import clientsIcon from "../../assets/stats-icons/Mask group.svg";
import qualityIcon from "../../assets/stats-icons/reconocimientos de calidad.svg";

const Achievements: React.FC = () => {
  const stats = [
    {
      number: "+1500",
      description: "Reparaciones\nconcluidas",
      icon: handsIcon,
      alt: "Ícono de reparaciones concluidas"
    },
    {
      number: "+900",
      description: "Clientes\nsatisfechos",
      icon: clientsIcon,
      alt: "Ícono de clientes satisfechos"
    },
    {
      number: "+15",
      description: "Reconocimientos de\ncalidad",
      icon: qualityIcon,
      alt: "Ícono de reconocimientos de calidad"
    }
  ];

  return (
    <section className="bg-[#1D4289] py-14 px-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0 list-none">
          {stats.map((stat, index) => (
            <li 
              key={index} 
              className={`flex items-center gap-6 px-10 md:px-16 ${
                index > 0 ? 'border-t md:border-t-0 md:border-l border-[#FFE900]/40 pt-10 md:pt-0' : ''
              }`}
            >
              <figure className="flex-shrink-0">
                <img 
                  src={stat.icon} 
                  alt={stat.alt} 
                  className="w-20 h-20 md:w-24 md:h-24"
                />
              </figure>
              <article className="text-left">
                <strong className="text-5xl md:text-6xl font-bold text-white block">{stat.number}</strong>
                <p className="text-white text-base md:text-lg mt-2 whitespace-pre-line leading-tight">{stat.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;
