import { useState } from "react";

const TURNOS = [
	{ value: "matutino", label: "Matutino" },
	{ value: "vespertino", label: "Vespertino" },
	{ value: "nocturno", label: "Nocturno" },
];

const DIAS = [
	{ value: "entre-semana", label: "Entre semana" },
	{ value: "fin-semana", label: "Fines de semana" },
	{ value: "todos", label: "Todos los días" },
];

interface MonitoringSectionProps {
	monitoringEnabled: boolean;
	onToggleMonitoring: () => void;
}

const MonitoringSection = ({
	monitoringEnabled,
	onToggleMonitoring,
}: MonitoringSectionProps) => {
	const [turno, setTurno] = useState("matutino");
	const [dias, setDias] = useState("entre-semana");

	return (
		<div className="space-y-4">
			{/* Título "Monitoreo" + switch en la misma línea; debajo texto en azul (monitoreo.png) */}
			<div className="flex items-center justify-between gap-4">
				<h3 className="text-base font-bold text-gray-800"></h3>
				<button
					type="button"
					role="switch"
					aria-checked={monitoringEnabled}
					aria-label={monitoringEnabled ? "Desactivar monitoreo" : "Activar monitoreo"}
					onClick={onToggleMonitoring}
					className={`flex-shrink-0 w-12 h-7 flex items-center rounded-full p-1 transition touch-manipulation active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] focus-visible:ring-offset-2 ${
						monitoringEnabled ? "bg-green-500" : "bg-gray-300"
					}`}
				>
					<span
						className={`block w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
							monitoringEnabled ? "translate-x-5" : "translate-x-0"
						}`}
					/>
				</button>
			</div>
			<p className="text-sm text-[#1D4289]">
				El monitoreo debe de estar activado durante el horario laboral al inicio de sus rutas para recabar los datos de aprovechamiento.
			</p>

			{monitoringEnabled && (
				<div className="space-y-4 pt-2 border-t border-gray-100">
					<div>
						<label htmlFor="monitoring-turno" className="block text-xs font-medium text-gray-600 mb-1">
							Turno
						</label>
						<select
							id="monitoring-turno"
							value={turno}
							onChange={(e) => setTurno(e.target.value)}
							className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4289] focus:border-transparent touch-manipulation appearance-none bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
							}}
							aria-label="Seleccionar turno de monitoreo"
						>
							{TURNOS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="monitoring-dias" className="block text-xs font-medium text-gray-600 mb-1">
							Días de monitoreo
						</label>
						<select
							id="monitoring-dias"
							value={dias}
							onChange={(e) => setDias(e.target.value)}
							className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D4289] focus:border-transparent touch-manipulation appearance-none bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
							}}
							aria-label="Seleccionar días de monitoreo"
						>
							{DIAS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
		</div>
	);
};

export default MonitoringSection;
