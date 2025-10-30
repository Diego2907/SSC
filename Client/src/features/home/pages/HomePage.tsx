import Image from "../../../shared/components/Image";
import Brands from "../components/Brands";
import Contact from "../components/Contact";
import persona from "../assets/img/vista-lateral-hombre-trabajando-como-fontanero.webp";

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

      <Image
        classNameImage="inset-0 w-full"
        SrcImage={persona}
        AltImage="vista-lateral-hombre-trabajando-como-fontanero"
      />

      <div>
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            {/* === 1. SECCIÓN SUPERIOR: ENCABEZADO Y DESCRIPCIÓN === */}
            <div className="flex flex-col lg:flex-row lg:space-x-12 mb-12 lg:mb-20">
              {/* Bloque del Título (izquierda) */}
              <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                {/* Etiqueta */}
                <p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
                  ¡Preparados para ganar!
                </p>
                {/* Título principal */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
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

      {/* Sección de marcas */}
      <Brands />

      {/* Sección de contacto */}
      <Contact />
      {/* Espaciado opcional antes del footer removed to avoid gray band */}
    </main>
  );
};

export default HomePage;
