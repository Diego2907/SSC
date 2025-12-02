import React, { useEffect, useState } from "react";
import mujerImage from "../../assets/img/mujer.webp";
import operadoraImage from "../../assets/img/agente-de-call-center-femenino.webp";
import phoneIcon from "../../assets/icons/phone.svg";
import whatsappIcon from "../../assets/icons/whatsapp_icon.svg";
import mailIcon from "../../assets/icons/mail_icon.svg";

const ContactSchedule: React.FC = () => {
  type SlotKey = "weekdayMorning" | "weekdayAfternoon" | "saturday" | null;

  const isWithinRange = (minutes: number, start: number, end: number) =>
    minutes >= start && minutes < end;

  const getCurrentStatus = (): { isOpen: boolean; slot: SlotKey } => {
    const now = new Date();
    const day = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let slot: SlotKey = null;

    if (day >= 1 && day <= 5) {
      if (isWithinRange(currentMinutes, 9 * 60, 14 * 60)) {
        slot = "weekdayMorning";
      } else if (isWithinRange(currentMinutes, 16 * 60, 18 * 60)) {
        slot = "weekdayAfternoon";
      }
    } else if (day === 6) {
      if (isWithinRange(currentMinutes, 9 * 60, 15 * 60)) {
        slot = "saturday";
      }
    }

    return {
      isOpen: slot !== null,
      slot,
    };
  };

  const [status, setStatus] = useState(() => getCurrentStatus());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatus(getCurrentStatus());
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const isOpen = status.isOpen;
  const currentSlot = status.slot;

  const statusLabel = isOpen ? "Abierto ahora" : "Cerrado en este momento";
  const statusClasses = isOpen
    ? "bg-green-50 text-green-700 border border-green-500"
    : "bg-red-50 text-red-700 border border-red-300";
  const dotClasses = isOpen ? "bg-green-500" : "bg-red-500";

  const baseHoursTextClass = "text-sm md:text-base";
  const activeHoursTextClass = "text-green-700 font-semibold";
  const inactiveHoursTextClass = "text-gray-700";

  const weekdayCardClasses = `px-6 py-4 rounded-lg flex-1 min-w-[200px] border ${
    currentSlot === "weekdayMorning" || currentSlot === "weekdayAfternoon"
      ? "border-green-500 bg-green-50 shadow-sm"
      : "border-gray-200 bg-gray-50"
  }`;

  const saturdayCardClasses = `px-6 py-4 rounded-lg flex-1 min-w-[200px] border ${
    currentSlot === "saturday"
      ? "border-green-500 bg-green-50 shadow-sm"
      : "border-gray-200 bg-gray-50"
  }`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Columna izquierda con imagen */}
      <div className="relative h-full min-h-[600px] md:min-h-[700px]">
        <img
          src={mujerImage}
          alt="Mujer en oficina"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Columna derecha con información */}
      <div className="bg-white p-8 md:p-12 lg:p-16 xl:p-20 relative">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
            Horario de atención
          </h2>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-10 ${statusClasses}`}
          >
            <span className={`w-3 h-3 rounded-full ${dotClasses}`}></span>
            {statusLabel}
          </div>

          {/* Horarios */}
          <div className="flex flex-wrap gap-4 mb-12">
            <div className={weekdayCardClasses}>
              <h3 className="inline-block bg-[#7A869A] text-base md:text-lg mb-2 px-6 text-white">
                Lunes a Viernes
              </h3>
              <p
                className={`${baseHoursTextClass} ${
                  currentSlot === "weekdayMorning"
                    ? activeHoursTextClass
                    : inactiveHoursTextClass
                }`}
              >
                De 9:00 am a 02:00 pm
              </p>
              <p
                className={`${baseHoursTextClass} ${
                  currentSlot === "weekdayAfternoon"
                    ? activeHoursTextClass
                    : inactiveHoursTextClass
                }`}
              >
                De 04:00 pm a 06:00 pm
              </p>
            </div>

            <div className={saturdayCardClasses}>
              <h3 className="inline-block bg-[#7A869A] text-base md:text-lg mb-2 px-16 text-white">
                Sábado
              </h3>
              <p
                className={`${baseHoursTextClass} ${
                  currentSlot === "saturday"
                    ? activeHoursTextClass
                    : inactiveHoursTextClass
                }`}
              >
                De 09:00 am a 03:00 pm
              </p>
            </div>
          </div>

          {/* Contacto */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 mt-16 text-gray-900">
            Contacto
          </h2>
          <div className="flex-col">
            {/* Teléfonos */}
            <div className="flex items-start gap-4 mb-12">
              <img
                src={phoneIcon}
                alt="Teléfono"
                className="w-8 h-8 flex-shrink-0"
              />
              <div className="text-base md:text-lg text-gray-800">
                <p className="font-medium">(312) 314 5444</p>
                <p className="font-medium">(312) 313 4249</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-4 mb-12">
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="w-8 h-8 flex-shrink-0"
              />
              <p className="text-base md:text-lg font-medium text-gray-800">
                (312) 132 4977
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-12">
              <img
                src={mailIcon}
                alt="Email"
                className="w-8 h-8 flex-shrink-0"
              />
              <p className="text-base md:text-lg font-medium text-gray-800 break-all">
                servihogardecolima@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Imagen de la operadora */}
        <div className="hidden md:block absolute bottom-1 -right-4 md:w-40 md:h-60 lg:w-80 lg:h-96  opacity-80">
          <img
            src={operadoraImage}
            alt="Agente de servicio al cliente"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSchedule;
