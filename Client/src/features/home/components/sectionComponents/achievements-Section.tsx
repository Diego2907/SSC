import React from "react";
import handsIcon from "../../assets/icons/achievements-Icons/hands.svg";
import clientsIcon from "../../assets/icons/achievements-Icons/clients.svg";
import branchesIcon from "../../assets/icons/achievements-Icons/branches.svg";

const Achievements: React.FC = () => {
  const stats = [
    {
      number: "+1500",
      description: "Reparaciones\nconcluidas",
      icon: handsIcon,
      alt: "Ícono de reparaciones concluidas",
    },
    {
      number: "+900",
      description: "Clientes\nsatisfechos",
      icon: clientsIcon,
      alt: "Ícono de clientes satisfechos",
    },
    /*{
      number: "+15",
      description: "Reconocimientos de\ncalidad",
      icon: qualityIcon,
      alt: "Ícono de reconocimientos de calidad",
    },*/
    {
      number: "+9",
      description: "Sucursales\nen el estado",
      icon: branchesIcon,
      alt: "Ícono de sucursales en el estado",
    },
    {
      number: "+20",
      description: "Territorios\nde cobertura",
      alt: "Icono de territorios de cobertura",
    },
  ];

  return (
    <section className="bg-[#1D4289] py-10 px-4 sm:px-6 md:py-16 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 list-none">
          {stats.map((stat, index) => (
            <li
              key={index}
              className={`flex items-center gap-4 sm:gap-6 px-4 sm:px-8 md:px-16 w-full md:w-auto justify-center ${
                index > 0
                  ? "border-t md:border-t-0 md:border-l border-[#FFE900]/40 pt-8 md:pt-0"
                  : ""
              }`}
            >
              {index > 0 && (
                <span className="hidden md:block absolute left-0 top-1/2 h-20 -translate-y-1/2 border-l border-[#FFE900]/40" />
              )}

              <figure className="flex-shrink-0">
                <img
                  src={stat.icon}
                  alt={stat.alt}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 hover:scale-125 transition-transform duration-300"
                />
              </figure>

              <article className="text-left">
                <strong className="text-3xl sm:text-4xl md:text-6xl font-bold text-white block">
                  {stat.number}
                </strong>
                <p className="text-white text-sm sm:text-base md:text-lg mt-1 md:mt-2 whitespace-pre-line leading-tight">
                  {stat.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;
