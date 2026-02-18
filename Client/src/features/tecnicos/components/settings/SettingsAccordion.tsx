import type { ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
	isOpen: boolean;
	onToggle: () => void;
	id: string;
};

const SettingsAccordion = ({ title, children, isOpen, onToggle, id }: Props) => {
	return (
		<div
			className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
			role="region"
			aria-labelledby={`accordion-${id}-title`}
		>
			<button
				id={`accordion-${id}-title`}
				type="button"
				onClick={onToggle}
				className="w-full flex items-center justify-between p-4 active:scale-[0.99] transition touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] focus-visible:ring-offset-2"
				aria-expanded={isOpen}
				aria-controls={`accordion-${id}-content`}
				aria-label={`${isOpen ? "Cerrar" : "Abrir"} sección ${title}`}
			>
				<span className="font-medium text-gray-800 text-left">{title}</span>
				<svg
					className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
						isOpen ? "rotate-180 text-[#1D4289]" : "text-gray-400"
					}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			<div
				id={`accordion-${id}-content`}
				className={`grid transition-all duration-300 ease-in-out ${
					isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
				}`}
				aria-hidden={!isOpen}
			>
				<div className="overflow-hidden px-4 pb-4 min-h-0">{children}</div>
			</div>
		</div>
	);
};

export default SettingsAccordion;
