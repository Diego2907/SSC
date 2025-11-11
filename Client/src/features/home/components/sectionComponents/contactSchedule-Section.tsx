import React from "react";
import mujerImage from "../../assets/img/mujer.webp";
import operadoraImage from "../../assets/img/agente-de-call-center-femenino.webp";
import phoneIcon from "../../assets/icons/phone.svg";
import whatsappIcon from "../../assets/icons/whatsapp_icon.svg";
import mailIcon from "../../assets/icons/mail_icon.svg";
import locationIcon from "../../assets/icons/location_icon.svg";

const ContactSchedule: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 -mt-px">
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

          {/* Horarios */}
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="bg-blue-200 px-6 py-4 rounded-lg flex-1 min-w-[200px]">
              <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-800">
                Lunes a Viernes
              </h3>
              <p className="text-sm md:text-base text-gray-700">
                De 9:00 am a 02:00 pm
              </p>
              <p className="text-sm md:text-base text-gray-700">
                De 04:00 pm a 06:00 pm
              </p>
            </div>

            <div className="bg-blue-200 px-6 py-4 rounded-lg flex-1 min-w-[200px]">
              <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-800">
                Sábado
              </h3>
              <p className="text-sm md:text-base text-gray-700">
                De 09:00 am a 03:00 pm
              </p>
            </div>
          </div>

          {/* Contacto */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
            Contacto
          </h2>
          <div className="space-y-6">
            {/* Teléfonos */}
            <div className="flex items-start gap-4">
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
            <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-4">
              <img
                src={mailIcon}
                alt="Email"
                className="w-8 h-8 flex-shrink-0"
              />
              <p className="text-base md:text-lg font-medium text-gray-800 break-all">
                servihogardecolima@gmail.com
              </p>
            </div>

            {/* Ubicación */}
            <div className="flex items-center gap-4">
              <img
                src={locationIcon}
                alt="Ubicación"
                className="w-8 h-8 flex-shrink-0"
              />
              <p className="text-base md:text-lg font-medium text-gray-800">
                Colima, México
              </p>
            </div>
          </div>
        </div>

        {/* Imagen de la operadora */}
        <div className="hidden md:block absolute bottom-4 right-4 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 pointer-events-none opacity-80">
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
