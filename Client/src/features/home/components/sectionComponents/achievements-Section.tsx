import React from "react";
import svgExample from "../../assets/icons/x.svg";

const Achievements: React.FC = () => {

    const stats = [
    {
      number: "+1500",
      description: "Reparaciones concluidas",
      icon: <img src={svgExample} alt="Ícono de reparaciones" className="w-16 h-16" />
    },
    {
      number: "+900",
      description: "Clientes satisfechos",
      icon: <img src={svgExample} alt="Ícono de reparaciones" className="w-16 h-16" />
    },
    {
      number: "+15",
      description: "Reconocimientos de calidad",
      icon: <img src={svgExample} alt="Ícono de reparaciones" className="w-16 h-16" />
    },
    {
      number: "+9",
      description: "Sucursales en el estado",
      icon: <img src={svgExample} alt="Ícono de reparaciones" className="w-16 h-16" />
    }
  ];

  return (
       <section className="bg-blue-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none">
          {stats.map((stat, index) => (
            <li 
              key={index} 
              className={`flex items-center gap-4 ${index > 0 ? 'border-l-0 lg:border-l border-yellow-700 lg:pl-8' : ''}`}
            >
              <figure className="flex-shrink-0 transition-transform duration-500 hover:rotate-12">
                {stat.icon}
              </figure>
              <article>
                <strong className="text-4xl font-bold text-white block">{stat.number}</strong>
                <p className="text-white text-sm mt-1">{stat.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  
  );
};

export default Achievements;
