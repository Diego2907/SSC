import { useState } from "react";

interface SecuritySectionProps {
	twoFactorEnabled?: boolean;
	secondaryEmail?: string;
	onToggle2FA?: (enabled: boolean) => void;
	onSetupSMS?: () => void;
}

const SecuritySection = ({
	twoFactorEnabled = true,
	secondaryEmail = "ej****@gmail.com",
	onToggle2FA,
	onSetupSMS,
}: SecuritySectionProps) => {
	const [twoFA, setTwoFA] = useState(twoFactorEnabled);

	const handleToggle2FA = () => {
		const next = !twoFA;
		setTwoFA(next);
		onToggle2FA?.(next);
	};

	return (
		<div className="space-y-6">
			{/* Autenticación en dos pasos */}
			<div>
				<p className="text-sm font-semibold text-gray-800">Autenticación en dos pasos</p>
				<p className="text-xs text-gray-500 mt-0.5">
					Añade una capa extra de seguridad a tu cuenta.
				</p>
				<button
					type="button"
					onClick={handleToggle2FA}
					className="mt-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 text-sm font-medium active:scale-[0.98] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289]"
				>
					{twoFA ? "Desactivar" : "Activar"}
				</button>
			</div>

			{/* E-mail secundario */}
			<div>
				<p className="text-sm font-semibold text-gray-800">E-mail secundario</p>
				<p className="text-xs text-gray-500 mt-0.5">
					Para recuperación de cuenta y notificaciones de seguridad.
				</p>
				<div className="mt-2 flex items-center gap-2">
					<svg
						className="w-5 h-5 text-[#1D4289] flex-shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
					<span className="text-sm text-gray-700">{secondaryEmail}</span>
				</div>
			</div>

			{/* Recuperación vía SMS */}
			<div>
				<p className="text-sm font-semibold text-gray-800">Recuperación vía SMS</p>
				<p className="text-xs text-gray-500 mt-0.5">
					Recibe códigos de verificación por mensaje de texto.
				</p>
				<button
					type="button"
					onClick={onSetupSMS}
					className="mt-2 px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 text-sm font-medium active:scale-[0.98] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289]"
				>
					Configurar
				</button>
			</div>
		</div>
	);
};

export default SecuritySection;
