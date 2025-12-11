import React from "react";
import SocialLinks from "./SocialLinks";

// Colores Pantone oficiales
const COLORS = {
  blue: "#1D4289",     // Pantone 7687 C
  red: "#DA291C",      // Pantone 485 C
  yellow: "#FFE900",   // Pantone 803 C
  gray: "#838383",     // Pantone Cool Gray 10 U
  green: "#44D62C",    // Pantone 802 C
} as const;

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 items-start">
          <div className="footer-column footer-logo flex justify-center sm:justify-start">
            <img src="/Images/Logo.png" alt="SHC Logo" className="w-28 md:w-32" loading="lazy" />
          </div>

          <div className="footer-column text-center sm:text-left">
            <nav aria-label="Secciones" className="footer-links font-poppins">
              <a className="footer-link" href="#">
                Inicio
              </a>
              <a className="footer-link" href="#">
                Conócenos
              </a>
              <a className="footer-link" href="#">
                Servicios
              </a>
              <a className="footer-link" href="#">
                Nuestras marcas
              </a>
              <a className="footer-link" href="#">
                Preguntas frecuentes
              </a>
            </nav>
          </div>

          <div className="footer-column text-center sm:text-left">
            <div className="footer-heading font-poppins">Formas de pago</div>
            <div className="payment-methods items-center sm:items-start">
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/visa.png" alt="VISA" className="h-6" loading="lazy" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/paypal.png" alt="PayPal" className="h-6" loading="lazy" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/oxxo.png" alt="OXXO PAY" className="h-6" loading="lazy" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img
                    src="/Images/mastercard.png"
                    alt="Mastercard"
                    className="h-6"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="footer-column text-center sm:text-left">
            <div className="footer-heading font-poppins">Compañía</div>
            <div className="footer-links font-poppins">
              <a className="footer-link" href="#">
                Términos y condiciones generales del servicio
              </a>
              <a className="footer-link" href="#">
                Políticas de garantía
              </a>
              <a className="footer-link" href="#">
                Mapa del sitio
              </a>
              <a className="footer-link" href="#">
                Políticas de cookies
              </a>
              <a className="footer-link" href="#">
                Trabaja con SHC
              </a>
              <a className="footer-link" href="#">
                Políticas de privacidad
              </a>
            </div>
          </div>

          <div className="footer-column social-column">
            <div className="footer-heading font-poppins text-center">
              Redes
            </div>
            <SocialLinks />
          </div>
        </div>

        <div className="footer-bottom mt-8 pt-6 text-xs md:text-sm text-gray-300 text-center font-poppins">
          Copyright © 2025-2029 ServiHogar de Colima. Todos los derechos
          reservados.
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        className="whatsapp-float"
        href="https://wa.me/523121234567"
        target="_blank"
        rel="noreferrer"
        aria-label="Enviar mensaje por WhatsApp"
        style={{ background: `linear-gradient(135deg, ${COLORS.yellow} 0%, #FFD600 100%)` }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 .04 5.33.04 11.95c0 2.11.55 4.17 1.6 5.98L0 24l6.32-1.63A11.93 11.93 0 0012 23.9c6.63 0 11.96-5.33 11.96-11.95 0-3.2-1.24-6.2-3.44-8.47zM12 21.8a10.05 10.05 0 01-5.25-1.47l-.37-.22L4 20l.9-2.08-.24-.39A9.78 9.78 0 012.2 11.95 9.8 9.8 0 0112 2.1c5.41 0 9.8 4.39 9.8 9.85 0 5.39-4.39 9.85-9.8 9.85z"
            fill="#0b1220"
          />
          <path
            d="M17.15 14.12c-.3-.15-1.74-.86-2.01-.96-.27-.1-.48-.15-.68.15s-.78.96-.96 1.16c-.18.18-.36.2-.66.06-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.12.3-.33.45-.5.15-.18.2-.3.3-.5.1-.18.05-.35-.02-.5-.07-.15-.68-1.64-.93-2.25-.24-.6-.49-.5-.68-.5-.18 0-.38 0-.58 0-.2 0-.52.06-.8.3-.27.24-1.03 1.01-1.03 2.46 0 1.44 1.06 2.83 1.21 3.03.15.18 2.09 3.2 5.07 4.49 2.98 1.29 2.98.86 3.52.81.54-.05 1.74-.71 1.99-1.39.25-.67.25-1.25.18-1.39-.07-.15-.27-.24-.57-.39z"
            fill="#0b1220"
          />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
