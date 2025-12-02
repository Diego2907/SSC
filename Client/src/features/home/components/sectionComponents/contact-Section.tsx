import React from "react";
import Logo from "../../assets/img/Logo.webp";
import visa from "../../assets/icons/visa.svg";
import paypal from "../../assets/icons/paypal.svg";
import oxxo from "../../assets/icons/oxxo.svg";
import mastercard from "../../assets/icons/mastercard.svg";

const socialNetworks = [
	{
		label: "Facebook",
		href: "#",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				className="social-icon-svg"
				aria-hidden="true"
			>
				<circle cx="20" cy="20" r="20" fill="currentColor" />
				<path
					d="M22.5 32V21h3.5l.5-4h-4v-2.5c0-1 .5-2 2-2h2v-3.5c-.5 0-2-.5-3.5-.5-3.5 0-6 2.5-6 6V17h-3v4h3v11h4.5z"
					fill="white"
				/>
			</svg>
		),
	},
	{
		label: "Instagram",
		href: "#",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				className="social-icon-svg"
				aria-hidden="true"
			>
				<circle cx="20" cy="20" r="20" fill="currentColor" />
				<rect x="12" y="12" width="16" height="16" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/>
				<circle cx="20" cy="20" r="4" fill="none" stroke="white" strokeWidth="2"/>
				<circle cx="25.5" cy="14.5" r="1.5" fill="white"/>
			</svg>
		),
	},
	{
		label: "LinkedIn",
		href: "#",
		icon: (
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				className="social-icon-svg"
				aria-hidden="true"
			>
				<circle cx="20" cy="20" r="20" fill="currentColor" />
				<path
					d="M12.5 16.5h3v11h-3v-11zm1.5-4.5c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm4.5 4.5h2.9v1.5h.04c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.6v5.3h-3v-4.7c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.8h-3v-9.8z"
					fill="white"
				/>
			</svg>
		),
	},
];

const Contact: React.FC = () => {
  return (
    <section className="contact-section bg-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div>
            <img src={Logo} alt="SHC Logo" className="w-28" />
          </div>

          <div>
            <ul className="contact-links space-y-3 text-sm text-[#0b3b78]">
              <li>
                <a href="#inicio" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#conocenos" className="hover:underline">
                  Conócenos
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:underline">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#marcas" className="hover:underline">
                  Marcas que atendemos
                </a>
              </li>
              <li>
                <a href="#preguntas-frecuentes" className="hover:underline">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="contact-heading text-sm font-semibold mb-3">
              Formas de pago
            </div>
            <div className="payment-methods flex flex-col gap-3">
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={visa} alt="VISA" className="payment-img" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={paypal} alt="PayPal" className="payment-img" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img src={oxxo} alt="OXXO PAY" className="payment-img" />
                </div>
              </div>
              <div className="payment-item">
                <div className="payment-logo">
                  <img
                    src={mastercard}
                    alt="Mastercard"
                    className="payment-img"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="contact-heading text-sm font-semibold mb-3">
              Compañía
            </div>
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
            <div className="contact-heading text-sm font-semibold mb-3">
              síguenos en nuestras redes sociales
            </div>
            <div className="social-links flex flex-col gap-3">
              {socialNetworks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
