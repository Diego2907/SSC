import React, { useEffect, useState, useMemo } from "react";
import mujerImage from "../../assets/img/mujer.webp";
import operadoraImage from "../../assets/img/agente-de-call-center-femenino.webp";
import phoneIcon from "../../assets/icons/phone.svg";
import whatsappIcon from "../../assets/icons/whatsapp_icon.svg";
import mailIcon from "../../assets/icons/mail_icon.svg";

// Tipos para el estado del horario
type SlotKey = "weekdayMorning" | "weekdayAfternoon" | "saturday" | null;
type StatusType = "open" | "closed" | "unknown";

interface ScheduleStatus {
  isOpen: boolean;
  slot: SlotKey;
  statusType: StatusType;
}

// Constantes de colores Pantone
const COLORS = {
  green: "#44D62C",    // Pantone 802 C - Abierto
  red: "#DA291C",      // Pantone 485 C - Cerrado
  gray: "#838383",     // Pantone Cool Gray 10 U - Sin datos
  blue: "#1D4289",     // Pantone 7687 C - Azul primario
} as const;

const ContactSchedule: React.FC = () => {
  const isWithinRange = (minutes: number, start: number, end: number): boolean =>
    minutes >= start && minutes < end;

  const getCurrentStatus = (): ScheduleStatus => {
    try {
      const now = new Date();
      const day = now.getDay();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Validación de datos
      if (isNaN(day) || isNaN(currentMinutes)) {
        return { isOpen: false, slot: null, statusType: "unknown" };
      }

      let slot: SlotKey = null;

      // Lunes a Viernes (1-5)
      if (day >= 1 && day <= 5) {
        if (isWithinRange(currentMinutes, 9 * 60, 14 * 60)) {
          slot = "weekdayMorning";
        } else if (isWithinRange(currentMinutes, 16 * 60, 18 * 60)) {
          slot = "weekdayAfternoon";
        }
      } 
      // Sábado (6)
      else if (day === 6) {
        if (isWithinRange(currentMinutes, 9 * 60, 15 * 60)) {
          slot = "saturday";
        }
      }
      // Domingo (0) - Cerrado

      return {
        isOpen: slot !== null,
        slot,
        statusType: slot !== null ? "open" : "closed",
      };
    } catch {
      return { isOpen: false, slot: null, statusType: "unknown" };
    }
  };

  const [status, setStatus] = useState<ScheduleStatus>(() => getCurrentStatus());

  useEffect(() => {
    // Actualizar inmediatamente
    setStatus(getCurrentStatus());
    
    // Actualizar cada minuto
    const intervalId = setInterval(() => {
      setStatus(getCurrentStatus());
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Memoizar los estilos del semáforo
  const semaphoreStyles = useMemo(() => {
    const { statusType } = status;
    
    const baseStyles = {
      container: "inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-out animate-fade-in",
      dot: "w-3 h-3 rounded-full transition-all duration-300 ease-out",
    };

    switch (statusType) {
      case "open":
        return {
          container: `${baseStyles.container} bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-2 border-[${COLORS.green}]`,
          dot: `${baseStyles.dot} bg-[${COLORS.green}] shadow-[0_0_8px_rgba(68,214,44,0.6)] animate-pulse`,
          label: "Abierto ahora",
          dotColor: COLORS.green,
          borderColor: COLORS.green,
        };
      case "closed":
        return {
          container: `${baseStyles.container} bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-2 border-[${COLORS.red}]`,
          dot: `${baseStyles.dot} bg-[${COLORS.red}] shadow-[0_0_8px_rgba(218,41,28,0.5)]`,
          label: "Cerrado en este momento",
          dotColor: COLORS.red,
          borderColor: COLORS.red,
        };
      case "unknown":
      default:
        return {
          container: `${baseStyles.container} bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-2 border-[${COLORS.gray}]`,
          dot: `${baseStyles.dot} bg-[${COLORS.gray}]`,
          label: "Información no disponible",
          dotColor: COLORS.gray,
          borderColor: COLORS.gray,
        };
    }
  }, [status]);

  const { isOpen, slot: currentSlot } = status;

  // Estilos para las tarjetas de horario
  const getCardStyles = (isActive: boolean): string => {
    const baseCard = "px-6 py-4 rounded-xl flex-1 min-w-[200px] border-2 transition-all duration-300 ease-out";
    
    if (isActive) {
      return `${baseCard} border-[${COLORS.green}] bg-green-50 dark:bg-green-900/10 shadow-md`;
    }
    return `${baseCard} border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50`;
  };

  const weekdayCardClasses = getCardStyles(
    currentSlot === "weekdayMorning" || currentSlot === "weekdayAfternoon"
  );

  const saturdayCardClasses = getCardStyles(currentSlot === "saturday");

  // Estilos para el texto de horarios
  const getHoursTextStyles = (isActive: boolean): string => {
    const base = "text-sm md:text-base font-medium transition-colors duration-300";
    if (isActive) {
      return `${base} text-[${COLORS.green}] font-semibold`;
    }
    return `${base} text-gray-700 dark:text-gray-300`;
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Columna izquierda con imagen */}
      <div className="relative h-full min-h-[500px] sm:min-h-[550px] md:min-h-[700px]">
        <img
          src={mujerImage}
          alt="Mujer en oficina"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Columna derecha con información */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 relative transition-colors duration-300">
        <div className="max-w-xl">
          {/* Título */}
          <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
            Horario de atención
          </h2>

          {/* Semáforo de estado mejorado */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 md:mb-10 transition-all duration-300 ease-out"
            style={{
              backgroundColor: isOpen ? 'rgba(68, 214, 44, 0.1)' : status.statusType === 'unknown' ? 'rgba(131, 131, 131, 0.1)' : 'rgba(218, 41, 28, 0.1)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: semaphoreStyles.borderColor,
              color: semaphoreStyles.dotColor,
            }}
          >
            <span
              className="w-3.5 h-3.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: semaphoreStyles.dotColor,
                boxShadow: isOpen ? `0 0 10px ${COLORS.green}80` : 'none',
                animation: isOpen ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
              }}
            />
            <span className="font-poppins font-semibold">
              {semaphoreStyles.label}
            </span>
          </div>

          {/* Horarios */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 md:mb-12">
            {/* Tarjeta Lunes a Viernes */}
            <div 
              className={weekdayCardClasses}
              style={{
                borderColor: (currentSlot === "weekdayMorning" || currentSlot === "weekdayAfternoon") ? COLORS.green : undefined,
              }}
            >
              <h3 
                className="inline-block text-sm md:text-base mb-3 px-4 sm:px-6 py-1 text-white font-poppins font-medium rounded-sm"
                style={{ backgroundColor: COLORS.gray }}
              >
                Lunes a Viernes
              </h3>
              <p
                className={getHoursTextStyles(currentSlot === "weekdayMorning")}
                style={{ color: currentSlot === "weekdayMorning" ? COLORS.green : undefined }}
              >
                De 9:00 am a 02:00 pm
              </p>
              <p
                className={getHoursTextStyles(currentSlot === "weekdayAfternoon")}
                style={{ color: currentSlot === "weekdayAfternoon" ? COLORS.green : undefined }}
              >
                De 04:00 pm a 06:00 pm
              </p>
            </div>

            {/* Tarjeta Sábado */}
            <div 
              className={saturdayCardClasses}
              style={{
                borderColor: currentSlot === "saturday" ? COLORS.green : undefined,
              }}
            >
              <h3 
                className="inline-block text-sm md:text-base mb-3 px-8 sm:px-12 md:px-16 py-1 text-white font-poppins font-medium rounded-sm"
                style={{ backgroundColor: COLORS.gray }}
              >
                Sábado
              </h3>
              <p
                className={getHoursTextStyles(currentSlot === "saturday")}
                style={{ color: currentSlot === "saturday" ? COLORS.green : undefined }}
              >
                De 09:00 am a 03:00 pm
              </p>
            </div>
          </div>

          {/* Contacto */}
          <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 mt-12 md:mt-16 text-gray-900 dark:text-white">
            Contacto
          </h2>
          <div className="flex-col space-y-8 md:space-y-10">
            {/* Teléfonos */}
            <div className="flex items-start gap-4">
              <img
                src={phoneIcon}
                alt="Teléfono"
                className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 dark:invert"
              />
              <div className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-poppins">
                <p className="font-medium">(312) 314 5444</p>
                <p className="font-medium">(312) 313 4249</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-4">
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0"
              />
              <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 font-poppins">
                (312) 132 4977
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <img
                src={mailIcon}
                alt="Email"
                className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 dark:invert"
              />
              <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 break-all font-poppins">
                servihogardecolima@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Imagen de la operadora */}
        <div className="hidden lg:block absolute bottom-1 -right-4 lg:w-64 lg:h-80 xl:w-80 xl:h-96 opacity-80">
          <img
            src={operadoraImage}
            alt="Agente de servicio al cliente"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSchedule;
