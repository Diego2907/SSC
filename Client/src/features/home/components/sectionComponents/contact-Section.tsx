import React from "react";
import Logo from "../../assets/img/Logo.webp";
import visa from "../../assets/icons/visa.svg";
import paypal from "../../assets/icons/paypal.svg";
import oxxo from "../../assets/icons/oxxo.svg";
import mastercard from "../../assets/icons/mastercard.svg";

// Colores Pantone oficiales
const COLORS = {
  blue: "#1D4289",     // Pantone 7687 C
  gray: "#838383",     // Pantone Cool Gray 10 U
} as const;

// Redes sociales sin X/Twitter - Solo Facebook, Instagram y LinkedIn
const socialNetworks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="social-icon-svg transition-all duration-300"
        aria-hidden="true"
      >
        <rect width="44" height="44" rx="12" fill="currentColor" />
        <path
          d="M24.5 34V23h3.85l.58-4.5H24.5v-2.88c0-1.16.58-2.29 2.39-2.29h1.85V9.5s-1.68-.29-3.28-.29c-3.35 0-5.54 2.03-5.54 5.71v3.43H16v4.5h3.92V34h4.58z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="social-icon-svg transition-all duration-300"
        aria-hidden="true"
      >
        <rect width="44" height="44" rx="12" fill="currentColor" />
        <rect x="12" y="12" width="20" height="20" rx="6" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="22" cy="22" r="5" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="28" cy="16" r="1.5" fill="white"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="social-icon-svg transition-all duration-300"
        aria-hidden="true"
      >
        <rect width="44" height="44" rx="12" fill="currentColor" />
        <path
          d="M14.5 18.5h3.5v12h-3.5v-12zm1.75-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4.75 5.5h3.35v1.64h.05c.47-.89 1.61-1.82 3.32-1.82 3.55 0 4.21 2.34 4.21 5.38v6.2h-3.5v-5.5c0-1.31-.02-3-1.83-3s-2.11 1.43-2.11 2.9v5.6H21v-11.4z"
          fill="white"
        />
      </svg>
    ),
  },
];

const Contact: React.FC = () => {
  return (
    <section className="contact-section bg-white dark:bg-gray-900 py-10 md:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start">
            <img 
              src={Logo} 
              alt="SHC Logo" 
              className="w-24 md:w-28 dark:brightness-0 dark:invert" 
              loading="lazy"
            />
          </div>

          {/* Links de navegación */}
          <div className="text-center sm:text-left">
            <ul className="contact-links space-y-2 md:space-y-3 text-sm font-poppins" style={{ color: COLORS.blue }}>
              <li>
                <a href="#inicio" className="hover:underline transition-all duration-200 dark:text-blue-400">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#conocenos" className="hover:underline transition-all duration-200 dark:text-blue-400">
                  Conócenos
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:underline transition-all duration-200 dark:text-blue-400">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#marcas" className="hover:underline transition-all duration-200 dark:text-blue-400">
                  Marcas que atendemos
                </a>
              </li>
              <li>
                <a href="#preguntas-frecuentes" className="hover:underline transition-all duration-200 dark:text-blue-400">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Formas de pago */}
          <div className="text-center sm:text-left">
            <div 
              className="contact-heading text-sm font-semibold mb-3 font-poppins"
              style={{ color: COLORS.blue }}
            >
              Formas de pago
            </div>
            <div className="payment-methods flex flex-col gap-3 items-center sm:items-start">
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={visa} alt="VISA" className="payment-img" loading="lazy" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={paypal} alt="PayPal" className="payment-img" loading="lazy" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={oxxo} alt="OXXO PAY" className="payment-img" loading="lazy" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={mastercard} alt="Mastercard" className="payment-img" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          {/* Compañía */}
          <div className="text-center sm:text-left">
            <div 
              className="contact-heading text-sm font-semibold mb-3 font-poppins"
              style={{ color: COLORS.blue }}
            >
              Compañía
            </div>
            <ul className="company-links space-y-2 text-sm text-gray-600 dark:text-gray-400 font-poppins">
              <li className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer">
                Términos y condiciones generales del servicio
              </li>
              <li className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer">
                Políticas de garantía
              </li>
              <li className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer">
                Mapa del sitio
              </li>
              <li className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer">
                Políticas de cookies
              </li>
              <li className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer">
                Trabaja con SHC
              </li>
              <li className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer">
                Políticas de privacidad
              </li>
            </ul>
          </div>

          {/* Redes Sociales - Diseño idéntico a Figma */}
          <div className="social-column flex flex-col items-center lg:items-center">
            <div 
              className="contact-heading text-sm font-semibold mb-4 font-poppins text-center"
              style={{ color: COLORS.blue }}
            >
              Redes
            </div>
            <div className="social-links flex flex-col gap-3 items-center">
              {socialNetworks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="social-link group"
                  aria-label={label}
                  style={{ color: COLORS.gray }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLORS.blue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = COLORS.gray;
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-poppins">
            Copyright © 2025-2029 ServiHogar de Colima. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
