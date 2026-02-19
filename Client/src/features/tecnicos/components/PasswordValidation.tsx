import { useMemo } from "react";

interface PasswordValidationProps {
	password: string;
	isDarkBackground?: boolean;
}

interface ValidationRule {
	label: string;
	valid: boolean;
}

const PasswordValidation = ({ password, isDarkBackground = false }: PasswordValidationProps) => {
	const validations: ValidationRule[] = useMemo(() => {
		return [
			{
				label: "La contraseña debe de tener al menos ocho carácteres",
				valid: password.length >= 8,
			},
			{
				label: "Debe contener mayúsculas y minúsculas",
				valid: /[A-Z]/.test(password) && /[a-z]/.test(password),
			},
			{
				label: "Debe contener al menos un número alfanumérico",
				valid: /[0-9]/.test(password),
			},
			{
				label: "Debe de tener un caracter especial (!@#$%+-=)",
				valid: /[!@#$%+\-=]/.test(password),
			},
		];
	}, [password]);

	const textColor = isDarkBackground ? "text-white" : "text-gray-700";
	const validTextColor = isDarkBackground ? "text-green-400" : "text-green-600";
	const invalidTextColor = isDarkBackground ? "text-gray-400" : "text-gray-500";
	const validBgColor = isDarkBackground ? "bg-green-500" : "bg-green-500";
	const invalidBgColor = isDarkBackground ? "bg-gray-500" : "bg-gray-300";

	return (
		<div className="mt-2">
			<ul className="space-y-2">
				{validations.map((validation, index) => (
					<li
						key={index}
						className={`flex items-center gap-2 text-xs ${
							validation.valid
								? validTextColor
								: invalidTextColor
						}`}
					>
						<span
							className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
								validation.valid
									? `${validBgColor} text-white`
									: `${invalidBgColor} text-white`
							}`}
						>
							{validation.valid ? "✓" : "i"}
						</span>
						{validation.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PasswordValidation;
