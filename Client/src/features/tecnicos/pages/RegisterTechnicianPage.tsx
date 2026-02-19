import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoAmarillo from "../../home/assets/img/Logo_Amarillo.webp";
import PasswordInput from "../components/PasswordInput";
import PasswordValidation from "../components/PasswordValidation";

function RegisterTechnicianPage() {
	const navigate = useNavigate();
	const [nombre, setNombre] = useState("");
	const [apellidoPaterno, setApellidoPaterno] = useState("");
	const [apellidoMaterno, setApellidoMaterno] = useState("");
	const [correo, setCorreo] = useState("");
	const [telefono, setTelefono] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);

	// Validar contraseña en tiempo real
	const validatePassword = (password: string): boolean => {
		return (
			password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/[0-9]/.test(password) &&
			/[!@#$%+\-=]/.test(password)
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setErrors({});
		setIsSubmitting(true);

		// Validaciones del lado del cliente
		const newErrors: Record<string, string> = {};

		if (!termsAccepted) {
			newErrors.termsAccepted = "Debes aceptar los términos y condiciones para continuar.";
		}

		if (!nombre.trim()) {
			newErrors.nombre = "El nombre es requerido";
		}

		if (!apellidoPaterno.trim()) {
			newErrors.apellidoPaterno = "El apellido paterno es requerido";
		}

		if (!apellidoMaterno.trim()) {
			newErrors.apellidoMaterno = "El apellido materno es requerido";
		}

		if (!correo.trim()) {
			newErrors.correo = "El correo es requerido";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
			newErrors.correo = "El correo no tiene un formato válido";
		}

		if (!telefono.trim()) {
			newErrors.telefono = "El teléfono es requerido";
		} else if (!/^\d{10}$/.test(telefono.replace(/\s/g, ""))) {
			newErrors.telefono = "El teléfono debe tener 10 dígitos";
		}

		if (!validatePassword(password)) {
			newErrors.password = "La contraseña no cumple con los requisitos";
		}

		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Las contraseñas no coinciden";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/api/technician/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nombre: nombre.trim(),
					apellido_paterno: apellidoPaterno.trim(),
					apellido_materno: apellidoMaterno.trim(),
					email: correo.trim().toLowerCase(),
					telefono: telefono.replace(/\s/g, ""),
					password: password,
					password_confirmation: confirmPassword,
					terms_accepted: termsAccepted,
				}),
			}).catch((fetchError) => {
				// Si hay error de conexión, mostrar mensaje específico
				if (fetchError.message.includes("Failed to fetch") || fetchError.message.includes("ERR_CONNECTION_REFUSED")) {
					throw new Error("No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo.");
				}
				throw fetchError;
			});

			const data = await response.json();

			if (!response.ok) {
				if (response.status === 400 && data.errors) {
					// Errores de validación del servidor
					const serverErrors: Record<string, string> = {};
					data.errors.forEach((err: { campo: string; mensaje: string }) => {
						serverErrors[err.campo] = err.mensaje;
					});
					setErrors(serverErrors);
				} else {
					setError(data.message || "Error al registrar técnico");
				}
				setIsSubmitting(false);
				return;
			}

			// Registro exitoso
			navigate("/technician/login", {
				state: { message: "Registro exitoso. Inicia sesión para continuar." },
			});
		} catch (err: any) {
			setError(err.message || "Error de conexión. Por favor, intenta de nuevo.");
			setIsSubmitting(false);
		}
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-[#1D4289] px-4 py-8">
			{/* Logo */}
			<img
				src={LogoAmarillo}
				alt="Logo SHC"
				className="w-36 sm:w-44 mb-8"
			/>

			{/* Título */}
			<h1 className="text-white text-3xl font-semibold mb-8">
				Crear cuenta
			</h1>

			<section className="w-full max-w-md">

				<form onSubmit={handleSubmit}>
					{/* Nombre */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Nombre(s)
						</label>
						<input
							type="text"
							placeholder="Nombre(s)"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${errors.nombre ? "border-2 border-red-500" : ""
								}`}
						/>
						{errors.nombre && (
							<p className="flex items-center gap-2 mt-1 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.nombre}
							</p>
						)}
					</div>

					{/* Apellido Paterno */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Apellido Paterno
						</label>
						<input
							type="text"
							placeholder="Apellido paterno"
							value={apellidoPaterno}
							onChange={(e) => setApellidoPaterno(e.target.value)}
							className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${errors.apellidoPaterno ? "border-2 border-red-500" : ""
								}`}
						/>
						{errors.apellidoPaterno && (
							<p className="flex items-center gap-2 mt-1 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.apellidoPaterno}
							</p>
						)}
					</div>

					{/* Apellido Materno */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Apellido Materno
						</label>
						<input
							type="text"
							placeholder="Apellido materno"
							value={apellidoMaterno}
							onChange={(e) => setApellidoMaterno(e.target.value)}
							className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${errors.apellidoMaterno ? "border-2 border-red-500" : ""
								}`}
						/>
						{errors.apellidoMaterno && (
							<p className="flex items-center gap-2 mt-1 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.apellidoMaterno}
							</p>
						)}
					</div>

					{/* Correo */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Correo electrónico
						</label>
						<input
							type="email"
							placeholder="Correo electrónico"
							value={correo}
							onChange={(e) => setCorreo(e.target.value)}
							className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${errors.correo ? "border-2 border-red-500" : ""
								}`}
						/>
						{errors.correo && (
							<p className="flex items-center gap-2 mt-1 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.correo}
							</p>
						)}
					</div>

					{/* Teléfono */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Teléfono/Celular
						</label>
						<input
							type="tel"
							placeholder="10 dígitos"
							value={telefono}
							onChange={(e) => {
								// Solo permitir números y limitar a 10 dígitos
								const value = e.target.value.replace(/\D/g, "").slice(0, 10);
								setTelefono(value);
							}}
							className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${errors.telefono ? "border-2 border-red-500" : ""
								}`}
						/>
						{errors.telefono && (
							<p className="flex items-center gap-2 mt-1 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.telefono}
							</p>
						)}
					</div>

					{/* Contraseña */}
					<PasswordInput
						label="Contraseña"
						placeholder=""
						value={password}
						onChange={setPassword}
						error={errors.password}
						showValidation={true}
						isDarkBackground={true}
					/>

					{/* Validación de contraseña en tiempo real */}
					{password && <PasswordValidation password={password} isDarkBackground={true} />}

					{/* Confirmar contraseña */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Vuelve a escribir la contraseña
						</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirma tu contraseña"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								aria-label="Confirmar contraseña"
								className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white pr-12 ${errors.confirmPassword && password !== confirmPassword
									? "border-2 border-red-500"
									: confirmPassword && password === confirmPassword && password.length > 0
										? "border-2 border-green-500"
										: ""
									}`}
							/>
							<button
								type="button"
								className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
							>
								{showConfirmPassword ? (
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
						{/* Mensaje de error de coincidencia */}
						{errors.confirmPassword && password !== confirmPassword && (
							<div className="flex items-center gap-2 mt-2">
								<div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
									<span className="text-white text-xs font-bold">×</span>
								</div>
								<p className="text-red-400 text-xs font-medium">
									Las contraseñas no coinciden
								</p>
							</div>
						)}
					</div>

					{/* Términos y condiciones */}
					<div className="mt-4 px-2">
						<label className="flex items-start gap-3 cursor-pointer group">
							<input
								type="checkbox"
								checked={termsAccepted}
								onChange={(e) => {
									setTermsAccepted(e.target.checked);
									if (errors.termsAccepted) setErrors((prev) => ({ ...prev, termsAccepted: "" }));
								}}
								className="mt-1 w-4 h-4 rounded border-2 border-white/60 bg-white/10 text-[#0a2d6b] focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0 focus:ring-offset-[#1D4289] cursor-pointer"
							/>
							<span className="text-xs text-white leading-relaxed">
								Acepto las{" "}
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										alert("Condiciones de uso (pendiente)");
									}}
									className="text-yellow-400 underline cursor-pointer hover:text-yellow-300 transition-colors"
								>
									Condiciones de uso
								</a>{" "}
								y el{" "}
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										alert("Aviso de Privacidad (pendiente)");
									}}
									className="text-yellow-400 underline cursor-pointer hover:text-yellow-300 transition-colors"
								>
									Aviso de Privacidad de SHC
								</a>
							</span>
						</label>
						{errors.termsAccepted && (
							<p className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.termsAccepted}
							</p>
						)}
					</div>

					{/* Error general */}
					{error && (
						<p className="text-red-400 text-sm text-center mb-4 mt-2">{error}</p>
					)}

					{/* Botón continuar */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-4 w-full bg-[#0a2d6b] hover:bg-[#0d3a85] active:bg-[#08204f] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md border-2 border-white/20 hover:border-white/40 focus:outline-none focus:ring-4 focus:ring-white/50"
					>
						{isSubmitting ? "Registrando..." : "Continuar"}
					</button>

					{/* Footer */}
					<p className="text-sm text-center mt-4 text-white">
						¿Ya tienes una cuenta?{" "}
						<Link
							to="/technician/login"
							className="text-yellow-400 font-semibold underline hover:text-yellow-300"
						>
							Iniciar sesión
						</Link>
					</p>
				</form>
			</section>

			{/* Pie de página */}
			<footer className="mt-8 text-white text-xs text-center px-4">
				<p>Todos los derechos reservados SHC {new Date().getFullYear()}</p>
			</footer>
		</main>
	);
}

export default RegisterTechnicianPage;
