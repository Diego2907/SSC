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
    <section className="bg-[#1D4289] py-14 px-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-col md:flex-row items-stretch list-none gap-10 md:gap-0">
          {stats.map((stat, index) => (
            <li
              key={index}
              className="relative flex flex-1 items-center justify-center gap-6 px-6"
            >
              {index > 0 && (
                <span className="hidden md:block absolute left-0 top-1/2 h-20 -translate-y-1/2 border-l border-[#FFE900]/40" />
              )}

              <figure className="flex-shrink-0">
                <img
                  src={stat.icon}
                  alt={stat.alt}
                  className="w-20 h-20 md:w-24 md:h-24 hover:scale-125 transition-transform duration-300"
                />
              </figure>

              <article className="text-left">
                <strong className="text-5xl md:text-6xl font-bold text-white block">
                  {stat.number}
                </strong>
                <p className="text-white text-base md:text-lg mt-2 whitespace-pre-line leading-tight">
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
