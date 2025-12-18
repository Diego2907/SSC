import React, { useState } from "react";

const Coverage: React.FC = () => {
  const [postalCode, setPostalCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCode.trim()) {
      setMessage("Por favor ingresa un código postal.");
      return;
    }

    // Resultado visual (sin conexión a base de datos)
    setMessage(
      `Resultados de búsqueda (visual): código postal ${postalCode}. Aquí se mostrarán los territorios cubiertos cuando se conecte la base de datos.`
    );
  };

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="w-full mx-auto bg-[#F8F9FA] rounded-2xl p-8 md:p-10 lg:px-24 xl:px-32 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-10">
            <div className="md:col-span-2">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1A1A1A] mb-2 font-poppins">
                +20 <span className="text-[#44D62C]">Territorios</span> de
                cobertura
              </h2>
              <p className="text-base text-[#6B7280] mt-2 font-poppins">
                Consulta si tu zona está cubierta ingresando tu código postal.
                Esta es una vista previa visual; la consulta real estará
                disponible cuando integremos la base de datos.
              </p>
            </div>

            <div className="md:col-span-1">
              <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                <input
                  aria-label="Código postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Código postal"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D4289] font-poppins"
                />
                <button
                  type="submit"
                  className="px-4 py-3 rounded-lg bg-[#FFE907] text-[#1D4488] font-semibold hover:brightness-95 transition-all duration-200"
                >
                  Consultar
                </button>
              </form>

              {message && (
                <div className="mt-4 bg-white border border-gray-100 p-3 rounded-md shadow-sm text-sm text-[#1A1A1A]">
                  <strong className="block mb-1">{message}</strong>
                  {/* Ejemplo visual de territorios */}
                  <ul className="mt-2 text-sm text-[#6B7280] list-disc list-inside">
                    <li>Colima</li>
                    <li>Manzanillo</li>
                    <li>Tecomán</li>
                    <li>Armería</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
