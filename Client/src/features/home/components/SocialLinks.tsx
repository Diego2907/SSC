import React, { useState } from "react";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SocialLinks: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks: SocialLink[] = [
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="50"
            height="50"
            rx="12"
            fill={hoveredIndex === 0 ? "#1D4289" : "#838383"}
          />
          <path
            d="M28 25.5h-2.5V34h-4v-8.5H19v-3.5h2.5v-2.1c0-2.1 1.2-5.4 5.2-5.4h3.8v3.4h-2.7c-.5 0-1.3.3-1.3 1.3V22H30l-.5 3.5H26.5z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="50"
            height="50"
            rx="12"
            fill={hoveredIndex === 1 ? "#1D4289" : "#838383"}
          />
          <rect
            x="16"
            y="16"
            width="18"
            height="18"
            rx="5"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r="4"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="31" cy="19" r="1.5" fill="#ffffff" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      icon: (
        <svg
          width="44"
          height="44"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="50"
            height="50"
            rx="12"
            fill={hoveredIndex === 2 ? "#1D4289" : "#838383"}
          />
          <path
            d="M18 21h3v12h-3V21zm1.5-5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM23 21h3v1.6c.5-.9 1.7-1.9 3.5-1.9 3.5 0 4.2 2.3 4.2 5.3V33h-3v-6c0-1.5-.5-2.5-1.8-2.5-1.5 0-2.2 1-2.2 2.5v6h-3.7V21z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="social-links flex-row lg:flex-col justify-center">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          className="social-link transition-transform duration-150"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
          }}
        >
          <div className="social-icon-container">
            {link.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
