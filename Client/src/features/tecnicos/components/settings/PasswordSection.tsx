import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import PasswordValidation from "../PasswordValidation";

interface PasswordSectionProps {
	onSubmit?: (data: {
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	}) => void;
}

const validatePassword = (password: string): boolean => {
	return (
		password.length >= 8 &&
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[!@#$%+\-=]/.test(password)
	);
};

const PasswordSection = ({ onSubmit }: PasswordSectionProps) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validate = (): boolean => {
		const next: Record<string, string> = {};
		if (!currentPassword.trim()) next.currentPassword = "La contraseña actual es requerida";
		if (!newPassword.trim()) next.newPassword = "La contraseña nueva es requerida";
		else if (!validatePassword(newPassword))
			next.newPassword = "La contraseña no cumple con los requisitos";
		if (newPassword !== confirmPassword)
			next.confirmPassword = "Las contraseñas no coinciden";
		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;
		setIsSubmitting(true);
		onSubmit?.({
			currentPassword,
			newPassword,
			confirmPassword,
		});
		setIsSubmitting(false);
	};

	const handleCancel = () => {
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
		setErrors({});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<PasswordInput
				label="Contraseña actual"
				placeholder="Introducir contraseña actual"
				value={currentPassword}
				onChange={setCurrentPassword}
				error={errors.currentPassword}
			/>
			<PasswordInput
				label="Contraseña nueva"
				placeholder="Introducir contraseña nueva"
				value={newPassword}
				onChange={setNewPassword}
				error={errors.newPassword}
			/>
			{newPassword.length > 0 && (
				<PasswordValidation password={newPassword} isDarkBackground={false} />
			)}
			<PasswordInput
				label="Confirmar nueva contraseña"
				placeholder="Introducir confirmación"
				value={confirmPassword}
				onChange={setConfirmPassword}
				error={errors.confirmPassword}
			/>

			<div className="flex gap-3 pt-2">
				<button
					type="button"
					onClick={handleCancel}
					className="flex-1 py-2.5 rounded-lg bg-gray-300 text-gray-800 font-medium active:scale-[0.98] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
				>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex-1 py-2.5 rounded-lg bg-[#1D4289] text-white font-medium active:scale-[0.98] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] disabled:opacity-60"
				>
					Listo
				</button>
			</div>

			<p className="text-center">
				<Link
					to="/technician/forgot-password"
					className="text-sm text-[#1D4289] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] rounded"
				>
					Olvidé mi contraseña
				</Link>
			</p>
		</form>
	);
};

export default PasswordSection;
