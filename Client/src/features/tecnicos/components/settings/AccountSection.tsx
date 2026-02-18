import { useState } from "react";

const IDIOMAS = [
	{ value: "es-latino", label: "Español latino" },
	{ value: "es", label: "Español" },
	{ value: "en", label: "English" },
];

const DIVISAS = [
	{ value: "MXN", label: "MXN" },
	{ value: "USD", label: "USD" },
];

interface AccountSectionProps {
	idioma?: string;
	divisa?: string;
	onIdiomaChange?: (v: string) => void;
	onDivisaChange?: (v: string) => void;
}

const AccountSection = ({
	idioma = "es-latino",
	divisa = "MXN",
	onIdiomaChange,
	onDivisaChange,
}: AccountSectionProps) => {
	const [localIdioma, setLocalIdioma] = useState(idioma);
	const [localDivisa, setLocalDivisa] = useState(divisa);

	return (
		<div className="space-y-4">
			<div>
				<label htmlFor="settings-idioma" className="block text-xs font-medium text-gray-600 mb-1">
					Idioma
				</label>
				<select
					id="settings-idioma"
					value={localIdioma}
					onChange={(e) => {
						const v = e.target.value;
						setLocalIdioma(v);
						onIdiomaChange?.(v);
					}}
					className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4289] focus:border-transparent touch-manipulation appearance-none pr-10"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
						backgroundSize: "1.25rem",
						backgroundPosition: "right 0.5rem center",
						backgroundRepeat: "no-repeat",
					}}
					aria-label="Seleccionar idioma"
				>
					{IDIOMAS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="settings-divisa" className="block text-xs font-medium text-gray-600 mb-1">
					Divisa
				</label>
				<select
					id="settings-divisa"
					value={localDivisa}
					onChange={(e) => {
						const v = e.target.value;
						setLocalDivisa(v);
						onDivisaChange?.(v);
					}}
					className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4289] focus:border-transparent touch-manipulation appearance-none pr-10"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
						backgroundSize: "1.25rem",
						backgroundPosition: "right 0.5rem center",
						backgroundRepeat: "no-repeat",
					}}
					aria-label="Seleccionar divisa"
				>
					{DIVISAS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default AccountSection;
