import { Link } from "react-router-dom";
import Logo from "../../../home/assets/img/Logo.webp";

interface SettingsHeaderProps {
	onMenuClick?: () => void;
}

const SettingsHeader = ({ onMenuClick }: SettingsHeaderProps) => {
	return (
		<header className="sticky top-0 z-40 w-full safe-area-inset-top" role="banner">
			{/* Barra superior blanca: menú + logo  */}
			<div className="flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-gray-100">
				<button
					type="button"
					onClick={onMenuClick}
					className="flex items-center justify-center w-10 h-10 rounded-lg active:scale-95 transition-transform touch-manipulation text-[#1D4289]"
					aria-label="Abrir menú"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				<Link
					to="/technician/dashboard"
					className="flex items-center flex-shrink-0"
					aria-label="Ir al inicio"
				>
					<img src={Logo} alt="SHC" className="h-8 w-auto" />
				</Link>

				<div className="w-10" aria-hidden="true" />
			</div>

			{/* Franja azul con título */}
			<div className="bg-[#1D4289] text-white px-4 py-4">
				<h1 className="text-center text-lg font-bold">Configuración</h1>
			</div>
		</header>
	);
};

export default SettingsHeader;
