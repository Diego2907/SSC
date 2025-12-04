import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-[100px] md:bottom-[120px] z-[30] right-[16px] md:right-[6px] flex flex-col items-end gap-3">
      {/* Burbuja de mensaje */}
      <div
        className={`
          bg-[#44D62C] text-white px-4 py-3 rounded-2xl rounded-br-sm
          shadow-lg max-w-[280px] md:max-w-[320px]
          transform transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }
        `}
      >
        <p className="font-poppins text-sm md:text-base leading-relaxed">
          <span className="font-normal">¡Hola! 😊, soy tu </span>
          <span className="font-bold">asistente virtual</span>
          <span className="font-normal"> de SHC: </span>
          <span className="font-bold text-[#FFE900]">¡Fixo!</span>
          <span className="font-normal"> ¿En qué puedo ayudarte hoy?</span>
        </p>
      </div>

      {/* Botón del Chatbot */}
      <button
        onClick={toggleChat}
        className="w-[102px] h-[102px] md:w-[128px] md:h-[128px] flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none p-0 border-0 bg-transparent"
        aria-label="Abrir asistente virtual Fixo"
      >
        <img
          src="/assets/icons/chatbot.svg"
          alt="Fixo - Asistente Virtual"
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  );
};

export default Chatbot;
