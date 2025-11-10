import Carousel from "../../shared/components/Carousel.tsx";
import Image from "../../shared/components/Image";
import Brands from "../components/sectionComponents/brands-Section.tsx";
import Contact from "../components/sectionComponents/contact-Section.tsx";
import persona from "../assets/img/vista-lateral-hombre-trabajando-como-fontanero.webp";
import UbicacionImg from "../assets/img/Ubicacion.webp";
import UbicationIcon from "../assets/icons/ubicationIcon.svg";

import img1TechTeam from "../assets/img/Technical-Theme/Technical-theme-1.webp";
import img2TechTeam from "../assets/img/Technical-Theme/Technical-theme-2.webp";
import img3TechTeam from "../assets/img/Technical-Theme/Technical-theme-3.webp";
import img4TechTeam from "../assets/img/Technical-Theme/Technical-theme-4.webp";
import img5TechTeam from "../assets/img/Technical-Theme/Technical-theme-5.webp";
import img6TechTeam from "../assets/img/Technical-Theme/Technical-theme-6.webp";

import altoAngulo from "../assets/img/hombre-de-alto-angulo-trabajando-como-fontanero.webp";
import lavadora from "../assets/img/hombre_reparando_lavadora.webp";
import radiador from "../assets/img/radiador.webp";

import Achievements from "../components/sectionComponents/achievements-Section.tsx";
import Testimonials from "../components/sectionComponents/testimonials-Section.tsx";
import ContactSchedule from "../components/sectionComponents/contactSchedule-Section.tsx";

const HomePage = () => {
  return (
    <main className="main-content">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-10 pb-0">
        <p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
          ¡Preparados para ganar!
        </p>
        <h2 className="font-[Sora] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8">
          SHC es una empresa con más de
          <span className="text-green-600"> 30 años en el mercado </span> con
          técnicos
          <span className="text-[#1D4488] "> altamente capacitados</span>.
        </h2>
      </div>

      <Carousel
        images={[
          {
            src: persona,
            alt: "Vista lateral hombre trabajando como fontanero",
            classNameImage: "w-full h-full object-cover",
          },
          {
            src: altoAngulo,
            alt: "Hombre de alto ángulo trabajando como fontanero",
            classNameImage: "w-full h-full object-cover",
          },
          {
            src: lavadora,
            alt: "Hombre reparando lavadora",
            classNameImage: "w-full h-full object-cover",
          },
          {
            src: radiador,
            alt: "Radiador",
            classNameImage: "w-full h-full object-cover",
          },
        ]}
        className="inset-0 w-full"
      />

      <div>
        <section className=" py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            {/* === 1. SECCIÓN SUPERIOR: ENCABEZADO Y DESCRIPCIÓN === */}
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:space-x-20 mb-12 lg:mb-20">
              {/* Bloque del Título (izquierda) */}
              <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                {/* Etiqueta */}
                <p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
                  ¿Quienes somos?
                </p>
                {/* Título principal */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                  Conócenos
                </h2>
              </div>

              {/* Bloque de Texto Descriptivo (derecha) */}
              <div className="w-full lg:w-2/3 space-y-4 text-gray-600 text-lg leading-relaxed">
                <p className="font-semibold font-[20px]">
                  Somos una empresa especializada en{" "}
                  <span className="text-green-700 font-semibold">
                    mantenimiento de línea blanca
                  </span>{" "}
                  con más de{" "}
                  <span className="font-semibold">10 años de experiencia</span>{" "}
                  en el mercado.
                </p>
                <p>
                  Nuestro equipo está formado por{" "}
                  <span className="text-blue-700 font-semibold">
                    técnicos certificados y apasionados
                  </span>{" "}
                  por ofrecer el mejor servicio. Nos distinguimos por nuestra
                  puntualidad, honestidad y compromiso con la{" "}
                  <span className="text-blue-700 font-semibold">
                    satisfacción total de nuestros clientes
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>{" "}
          {/* Cierre del container para la parte superior */}
          {/* === 2. SECCIÓN INFERIOR: MISIÓN Y VISIÓN (Full Width y Two Columns) === */}
          {/* Ocupa todo el ancho de la pantalla (full width) */}
          <div className="flex flex-col md:flex-row w-full">
            {/* BLOQUE MISIÓN (Azul oscuro) */}
            <div className="w-full md:w-1/2 bg-blue-900 text-white p-12 md:p-16 lg:p-20 relative overflow-hidden">
              {/* Título Misión */}
              <h3 className="text-4xl md:text-5xl font-extrabold mb-6">
                Misión
              </h3>
              {/* Texto Misión */}
              <p className="text-lg leading-relaxed">
                Nuestra misión es{" "}
                <span className="font-bold text-yellow-300">
                  proporcionar servicios técnicos de calidad excepcional para
                  electrodomésticos
                </span>
                , garantizando soluciones rápidas y efectivas que superen las
                expectativas de nuestros clientes. Nos comprometemos con la{" "}
                <span className="font-bold text-yellow-300">
                  excelencia en cada servicio
                </span>
                , utilizando{" "}
                <span className="font-bold text-yellow-300">
                  tecnología avanzada y las mejores prácticas de la industria
                </span>
                .
              </p>
            </div>

            {/* BLOQUE VISIÓN (Verde) */}
            <div className="w-full md:w-1/2 bg-green-600 text-white p-12 md:p-16 lg:p-20 relative overflow-hidden">
              {/* Título Visión */}
              <h3 className="text-4xl md:text-5xl font-extrabold mb-6">
                Visión
              </h3>
              {/* Texto Visión */}
              <p className="text-lg leading-relaxed">
                Ser la <span className="font-bold">empresa líder</span> en
                servicios técnicos de línea blanca, reconocida por nuestra{" "}
                <span className="font-bold">
                  excelencia, innovación y compromiso
                </span>{" "}
                con la satisfacción del cliente. Buscamos{" "}
                <span className="font-bold">
                  expandir nuestra presencia a nivel nacional
                </span>
                , manteniendo siempre los más altos estándares de calidad y
                servicio personalizado.
              </p>
            </div>
          </div>
        </section>
      </div>

      <ContactSchedule />

      {/*Aqui va la seccion de Ubicacion*/}

      <section className="w-full pt-10">
        <div className="flex-col">
          <div className="flex items-center justify-between gap-6 px-32">
            <div>
              <p className="bg-red-600 text-white px-4 py-4 font-semibold text-sm inline-block mb-8">
                ¿Dónde nos encontramos?
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
                Ubicación
              </h2>
            </div>

            <div className="flex justify-between gap-6">
              <Image
                classNameImage="w-12 h-12 mb-4"
                SrcImage={UbicationIcon}
                AltImage="Icono de ubicacion"
              />

              <p className="font-semibold font-[20px]">
                Mariano Arista #125Centro, Colima CP. 28000
              </p>
            </div>
          </div>
          <div className="relative w-full">
            <Image
              classNameImage="inset-0 w-full py-10"
              SrcImage={UbicacionImg}
              AltImage="Ubiacion de la empresa"
            />
          </div>
        </div>
      </section>

      {/*Aqui va la seccion de equipo*/}
      <section>
        <div className="flex-col px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
          <p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
            Nuestros expertos
          </p>
          <div className="flex items-center justify-between gap-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
              Equipo técnico
            </h2>
            <p>
              Nuestro equipo de{" "}
              <span className="text-blue-700 font-semibold">
                técnicos certificados y apasionados{" "}
              </span>
              por ofrecer el mejor servicio. Se distinguen por su puntualidad,
              honestidad y compromiso con la{" "}
              <span className="text-blue-700 font-semibold">
                satisfacción total de nuestros clientes.
              </span>
            </p>
          </div>
        </div>

        <div className="relative mt-10">
          <Carousel
            images={[
              {
                src: img1TechTeam,
                classNameImage: "w-72 h-72 rounded-full object-cover mx-auto",
                alt: "erika-de-la-cruz",
                title: "Erika de la Cruz",
                description: "Refrigeración",
              },
              {
                src: img2TechTeam,
                classNameImage: "w-72 h-72 rounded-full object-cover mx-auto",
                alt: "valentina-gonzalez",
                title: "Valentina González",
                description: "Lavadoras",
              },
              {
                src: img3TechTeam,
                classNameImage: "w-72 h-72 rounded-full object-cover mx-auto",
                alt: "angel-santos",
                title: "Ángel Santos",
                description: "Instalación",
              },
              {
                src: img4TechTeam,
                classNameImage: "rounded-full w-96 h-96 object-center",
                alt: "daniela-ramos",
                title: "Daniela Ramos",
                description: "Televisores",
              },
              {
                src: img5TechTeam,
                classNameImage: "rounded-full w-96 h-96 object-center",
                alt: "hector-vargas",
                title: "Héctor Vargas",
                description: "Hornos",
              },
              {
                src: img6TechTeam,
                classNameImage: "rounded-full w-96 h-96 object-center",
                alt: "edwin-magana",
                title: "Edwin Magaña",
                description: "Mantenimiento",
              },
            ]}
          />
        </div>
      </section>

      {/* Sección de marcas */}
      <Brands />

      <Achievements />

      {/* Sección de testimonios */}
      <Testimonials />
      {/* Sección de contacto */}
      <Contact />
      {/* Espaciado opcional antes del footer removed to avoid gray band */}
    </main>
  );
};

export default HomePage;
