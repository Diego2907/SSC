import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="contact-section bg-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div>
            <img src="/Images/Logo.png" alt="SHC Logo" className="w-28" />
          </div>

          <div>
            <ul className="contact-links space-y-3 text-sm text-[#0b3b78]">
              <li>Inicio</li>
              <li>Conócenos</li>
              <li>Servicios</li>
              <li>Nuestras marcas</li>
              <li>Preguntas frecuentes</li>
            </ul>
          </div>

          <div>
            <div className="contact-heading text-sm font-semibold mb-3">Formas de pago</div>
            <div className="payment-methods flex flex-col gap-3">
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/visa.png" alt="VISA" className="payment-img" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/paypal.png" alt="PayPal" className="payment-img" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/oxxo.png" alt="OXXO PAY" className="payment-img" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src="/Images/mastercard.png" alt="Mastercard" className="payment-img" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="contact-heading text-sm font-semibold mb-3">Compañía</div>
            <ul className="company-links space-y-2 text-sm text-gray-600">
              <li>Términos y condiciones generales del servicio</li>
              <li>Políticas de garantía</li>
              <li>Mapa del sitio</li>
              <li>Políticas de cookies</li>
              <li>Trabaja con SHC</li>
              <li>Políticas de privacidad</li>
            </ul>
          </div>

          <div className="social-column">
            <div className="contact-heading text-sm font-semibold mb-3">síguenos en nuestras redes sociales</div>
            <div className="social-links flex flex-col gap-3">
              <a href="#" className="social-link" aria-label="Facebook">
                <img src="/Images/facebook.png" alt="Facebook" className="social-img" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <img src="/Images/instagram.png" alt="Instagram" className="social-img" />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <img src="/Images/linkeding.png" alt="LinkedIn" className="social-img" />
              </a>
              <a href="#" className="social-link" aria-label="X">
                <img src="/Images/x.png" alt="X" className="social-img" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          Copyright © 2025-2029 ServiHogar de Colima. Todos los derechos reservados.
        </div>
      </div>
    </section>
  );
};

export default Contact;
