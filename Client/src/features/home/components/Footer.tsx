import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="footer-column footer-logo">
            <img src="/Images/Logo.png" alt="SHC Logo" className="w-32" />
          </div>

          <div className="footer-column">
            <nav aria-label="Secciones" className="footer-links">
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

          <div className="footer-column">
            <div className="footer-heading">Formas de pago</div>
            <div className="payment-methods">
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/visa.png" alt="VISA" className="h-6" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/paypal.png" alt="PayPal" className="h-6" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/oxxo.png" alt="OXXO PAY" className="h-6" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img
                    src="/Images/mastercard.png"
                    alt="Mastercard"
                    className="h-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <div className="footer-heading">Compañía</div>
            <div className="footer-links">
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
            <div className="footer-heading">
              síguenos en nuestras redes sociales
            </div>
            <div className="social-links">
              <a className="social-link" href="#" aria-label="Facebook">
                <div className="social-icon" style={{ background: "#1877F2" }}>
                  {/* Facebook SVG */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.85 7.94 9.8v-6.93H7.1v-2.87h2.84V9.41c0-2.81 1.67-4.36 4.22-4.36 1.22 0 2.5.22 2.5.22v2.75h-1.41c-1.39 0-1.82.86-1.82 1.74v2.09h3.1l-.5 2.87h-2.6V21.8C18.56 20.85 22 16.84 22 12z"
                      fill="white"
                    />
                  </svg>
                </div>
              </a>

              <a className="social-link" href="#" aria-label="Instagram">
                <div className="social-icon" style={{ background: "#E4405F" }}>
                  {/* Instagram SVG */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6a5 5 0 100 10 5 5 0 000-10zm6.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                      fill="white"
                    />
                  </svg>
                </div>
              </a>

              <a className="social-link" href="#" aria-label="LinkedIn">
                <div className="social-icon" style={{ background: "#0A66C2" }}>
                  {/* LinkedIn SVG */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.94 6.94a2.28 2.28 0 11.001-4.561 2.28 2.28 0 01-.001 4.561zM4.5 8.25h4V20h-4v-11.75zM14.25 8.25h3.75v1.5h.05c.52-.99 1.8-2.04 3.7-2.04 3.95 0 4.7 2.6 4.7 5.98V20h-4v-5.88c0-1.4 0-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.08V20h-4V8.25z"
                      fill="white"
                    />
                  </svg>
                </div>
              </a>

              <a className="social-link" href="#" aria-label="X/Twitter">
                <div className="social-icon" style={{ background: "#1DA1F2" }}>
                  {/* X/Twitter SVG */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 5.92c-.6.26-1.25.44-1.93.52.7-.42 1.24-1.08 1.5-1.87-.66.39-1.39.67-2.17.82A3.44 3.44 0 0015.5 4c-1.9 0-3.44 1.55-3.44 3.46 0 .27.03.53.09.78C8.2 8.05 5.2 6.13 3.2 3.45c-.3.53-.47 1.14-.47 1.8 0 1.24.63 2.33 1.6 2.97-.58-.02-1.12-.18-1.6-.44v.04c0 1.72 1.2 3.15 2.8 3.48-.3.08-.62.12-.96.12-.24 0-.48-.02-.71-.06.48 1.5 1.86 2.6 3.5 2.63A6.9 6.9 0 012 19.54a9.7 9.7 0 005.26 1.54c6.31 0 9.76-5.24 9.76-9.78v-.45c.68-.48 1.27-1.08 1.74-1.77-.62.27-1.28.46-1.96.54z"
                      fill="white"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-8 pt-6 text-sm text-gray-300">
          Copyright © 2025-2029 ServiHogar de Colima. Todos los derechos
          reservados.
        </div>
      </div>

      {/* WhatsApp floating button (update the number) */}
      <a
        className="whatsapp-float"
        href="https://wa.me/523121234567"
        target="_blank"
        rel="noreferrer"
        aria-label="Enviar mensaje por WhatsApp"
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
