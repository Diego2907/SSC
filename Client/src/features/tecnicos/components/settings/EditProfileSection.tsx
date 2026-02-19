import { useState, useEffect } from "react";

interface EditProfileSectionProps {
	nombre: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	email: string;
	telefono: string;
	onNombreChange?: (v: string) => void;
	onApellidoPaternoChange?: (v: string) => void;
	onApellidoMaternoChange?: (v: string) => void;
	onEmailChange?: (v: string) => void;
	onTelefonoChange?: (v: string) => void;
	onSubmit?: (data: {
		nombre: string;
		apellidoPaterno: string;
		apellidoMaterno: string;
		email: string;
		telefono: string;
	}) => void;
}

const EditProfileSection = ({
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	email,
	telefono,
	onNombreChange,
	onApellidoPaternoChange,
	onApellidoMaternoChange,
	onEmailChange,
	onTelefonoChange,
	onSubmit,
}: EditProfileSectionProps) => {
	const [localNombre, setLocalNombre] = useState(nombre);
	const [localApellidoPaterno, setLocalApellidoPaterno] = useState(apellidoPaterno);
	const [localApellidoMaterno, setLocalApellidoMaterno] = useState(apellidoMaterno);
	const [localEmail, setLocalEmail] = useState(email);
	const [localTelefono, setLocalTelefono] = useState(telefono);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setLocalNombre(nombre);
		setLocalApellidoPaterno(apellidoPaterno);
		setLocalApellidoMaterno(apellidoMaterno);
		setLocalEmail(email);
		setLocalTelefono(telefono);
	}, [nombre, apellidoPaterno, apellidoMaterno, email, telefono]);

	const handleNombre = (v: string) => {
		setLocalNombre(v);
		onNombreChange?.(v);
	};
	const handleApellidoPaterno = (v: string) => {
		setLocalApellidoPaterno(v);
		onApellidoPaternoChange?.(v);
	};
	const handleApellidoMaterno = (v: string) => {
		setLocalApellidoMaterno(v);
		onApellidoMaternoChange?.(v);
	};
	const handleEmail = (v: string) => {
		setLocalEmail(v);
		onEmailChange?.(v);
	};
	const handleTelefono = (v: string) => {
		setLocalTelefono(v);
		onTelefonoChange?.(v);
	};

	const handleGuardar = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		onSubmit?.({
			nombre: localNombre,
			apellidoPaterno: localApellidoPaterno,
			apellidoMaterno: localApellidoMaterno,
			email: localEmail,
			telefono: localTelefono,
		});
		setIsSubmitting(false);
	};

	const fields = [
		{
			id: "edit-nombre",
			label: "Nombre de pila",
			placeholder: "Introducir nombre de pila",
			value: localNombre,
			onChange: handleNombre,
			type: "text" as const,
			autoComplete: "given-name",
		},
		{
			id: "edit-apellido-paterno",
			label: "Apellido paterno",
			placeholder: "Introducir apellido paterno",
			value: localApellidoPaterno,
			onChange: handleApellidoPaterno,
			type: "text" as const,
			autoComplete: "family-name",
		},
		{
			id: "edit-apellido-materno",
			label: "Apellido materno",
			placeholder: "Introducir apellido materno",
			value: localApellidoMaterno,
			onChange: handleApellidoMaterno,
			type: "text" as const,
			autoComplete: "family-name",
		},
		{
			id: "edit-email",
			label: "E-mail",
			placeholder: "Introducir e-mail",
			value: localEmail,
			onChange: handleEmail,
			type: "email" as const,
			autoComplete: "email",
		},
		{
			id: "edit-telefono",
			label: "Teléfono",
			placeholder: "Introducir teléfono",
			value: localTelefono,
			onChange: handleTelefono,
			type: "tel" as const,
			autoComplete: "tel",
		},
	];

	return (
		<form onSubmit={handleGuardar} className="space-y-4">
			{fields.map(({ id, label, placeholder, value, onChange, type, autoComplete }) => (
				<div key={id}>
					<label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">
						{label}
					</label>
					<input
						id={id}
						type={type}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						autoComplete={autoComplete}
						className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4289] focus:border-transparent touch-manipulation"
						aria-label={label}
					/>
				</div>
			))}
			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full py-2.5 rounded-lg bg-[#1D4289] text-white font-medium active:scale-[0.98] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] disabled:opacity-60"
			>
				{isSubmitting ? "Guardando..." : "Guardar cambios"}
			</button>
		</form>
	);
};

export default EditProfileSection;
