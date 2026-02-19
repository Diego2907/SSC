import { useState } from "react";

interface PasswordInputProps {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	showValidation?: boolean;
	isDarkBackground?: boolean;
	showSuccessBorder?: boolean;
}

const PasswordInput = ({
	label,
	placeholder = "********",
	value,
	onChange,
	error,
	showValidation = false,
	isDarkBackground = false,
	showSuccessBorder = false,
}: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const labelClass = isDarkBackground ? "text-white" : "text-gray-700";
	const inputClass = isDarkBackground
		? `w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white pr-12 ${
				error ? "border-2 border-red-500" : showSuccessBorder ? "border-2 border-green-500" : ""
		  }`
		: `w-full px-4 py-2 mt-1 pr-10 border rounded-lg focus:outline-none focus:border-[#1D4289] ${
				error ? "border-red-500" : ""
		  }`;
	const errorClass = isDarkBackground ? "text-red-400" : "text-red-600";

	return (
		<div className={label ? "mb-4" : ""}>
			{label && (
				<label className={`text-sm font-medium ${labelClass} mb-1 block`}>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={inputClass}
				/>
				<button
					type="button"
					className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
					onClick={() => setShowPassword(!showPassword)}
					aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
				>
					{showPassword ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					)}
				</button>
			</div>
			{error && (
				<p className={`flex items-center gap-2 mt-1 ${errorClass} text-xs font-medium`}>
					<span className="text-lg">●</span> {error}
				</p>
			)}
		</div>
	);
};

export default PasswordInput;
