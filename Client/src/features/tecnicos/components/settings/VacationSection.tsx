interface VacationSectionProps {
	vacationMode: boolean;
	onToggleVacation: () => void;
}

const VacationSection = ({ vacationMode, onToggleVacation }: VacationSectionProps) => {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
			<div className="flex items-center justify-between gap-4">
				<div className="min-w-0">
					<p className="text-sm font-medium text-gray-800">Vacaciones</p>
					<p className="text-xs text-gray-500 mt-0.5">
						No recibirás asignaciones mientras esté activo.
					</p>
				</div>
				<button
					type="button"
					role="switch"
					aria-checked={vacationMode}
					aria-label={vacationMode ? "Desactivar modo vacaciones" : "Activar modo vacaciones"}
					onClick={onToggleVacation}
					className={`flex-shrink-0 w-12 h-7 flex items-center rounded-full p-1 transition touch-manipulation active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] focus-visible:ring-offset-2 ${
						vacationMode ? "bg-green-500" : "bg-gray-300"
					}`}
				>
					<span
						className={`block w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
							vacationMode ? "translate-x-5" : "translate-x-0"
						}`}
					/>
				</button>
			</div>
		</div>
	);
};

export default VacationSection;
