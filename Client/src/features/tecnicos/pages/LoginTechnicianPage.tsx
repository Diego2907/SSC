import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import LogoAmarillo from "../../home/assets/img/Logo_Amarillo.webp";
import Facebook from "../../home/assets/icons/facebook.svg";
import Google from "../../home/assets/icons/Google.svg";
import PasswordInput from "../components/PasswordInput";

const LoginTechnicianPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [correo, setCorreo] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Mostrar mensaje de éxito si viene del registro
	useEffect(() => {
		if (location.state?.message) {
			setSuccessMessage(location.state.message);
			// Limpiar el mensaje después de 5 segundos
			const timer = setTimeout(() => setSuccessMessage(""), 5000);
			return () => clearTimeout(timer);
		}
	}, [location.state]);

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!correo.trim()) {
			newErrors.correo = "El correo es requerido";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
			newErrors.correo = "El correo no tiene un formato válido";
		}

		if (!password.trim()) {
			newErrors.password = "La contraseña es requerida";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setErrors({});

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("http://localhost:3000/api/technician/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // Importante para recibir cookies
				body: JSON.stringify({
					Correo: correo.trim().toLowerCase(),
					Contrasenia: password,
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
					setError(data.message || "Credenciales incorrectas");
				}
				setIsSubmitting(false);
				return;
			}

			// Login exitoso - guardar token si viene en la respuesta
			if (data.data?.token) {
				localStorage.setItem("token_technician", data.data.token);
			}

			// Redirigir al dashboard del técnico
			navigate("/technician/dashboard");
		} catch (err: any) {
			setError(err.message || "Error de conexión. Por favor, intenta de nuevo.");
			setIsSubmitting(false);
		}
	};

	const handleSocialLogin = (provider: "google" | "facebook") => {
		// Por ahora solo muestra un mensaje, la implementación real dependerá de OAuth
		alert(`Inicio de sesión con ${provider} (pendiente de implementar)`);
	};

	return (
		<main className="min-h-screen bg-[#1D4289] flex flex-col items-center justify-center px-4 py-8">
			{/* Logo */}
			<img
				src={LogoAmarillo}
				alt="Logo SHC"
				className="w-36 sm:w-44 mb-8"
			/>

			{/* Título */}
			<h1 className="text-white text-3xl font-semibold mb-8">
				Iniciar sesión
			</h1>

			<section className="w-full max-w-md">
				{/* Mensaje de éxito */}
				{successMessage && (
					<div className="mb-4 p-3 bg-green-500/20 border border-green-400 rounded-lg">
						<p className="text-green-300 text-sm text-center">
							{successMessage}
						</p>
					</div>
				)}

				<form onSubmit={handleLogin}>
					{/* Botones de redes sociales */}
					<button
						type="button"
						onClick={() => handleSocialLogin("google")}
						className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 font-medium hover:bg-gray-50 transition mb-3"
					>
						<img src={Google} alt="google" className="w-5" />
						Iniciar sesión con Google
					</button>

					<button
						type="button"
						onClick={() => handleSocialLogin("facebook")}
						className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 font-medium hover:bg-gray-50 transition"
					>
						<img src={Facebook} alt="facebook" className="w-5" />
						Iniciar sesión con Facebook
					</button>

					{/* Divider */}
					<div className="flex items-center my-6">
						<hr className="flex-grow border-gray-400" />
						<span className="mx-3 text-gray-400 text-sm">O</span>
						<hr className="flex-grow border-gray-400" />
					</div>

					{/* Email */}
					<div className="mb-4">
						<label className="text-sm font-medium text-white mb-1 block">
							Email
						</label>
						<input
							type="email"
							placeholder="johndoe@mail.com"
							value={correo}
							onChange={(e) => setCorreo(e.target.value)}
							className={`w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${
								errors.correo ? "border-2 border-red-500" : ""
							}`}
						/>
						{errors.correo && (
							<p className="flex items-center gap-2 mt-1 text-red-400 text-xs font-medium">
								<span className="text-lg">●</span> {errors.correo}
							</p>
						)}
					</div>

					{/* Contraseña */}
					<div className="mb-4">
						<PasswordInput
							label="Contraseña"
							placeholder=""
							value={password}
							onChange={setPassword}
							error={errors.password}
							isDarkBackground={true}
						/>
					</div>

					{/* ¿Olvidaste tu contraseña? */}
					<div className="mb-4 text-center">
						<Link
							to="/technician/forgot-password"
							className="text-yellow-400 text-sm font-medium underline hover:text-yellow-300 transition-colors"
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>

					{/* Error general */}
					{error && (
						<p className="text-red-400 text-sm text-center mb-4">{error}</p>
					)}

					{/* Botón Iniciar sesión */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-[#0a2d6b] hover:bg-[#0d3a85] active:bg-[#08204f] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 font-semibold rounded-lg transition-all duration-200 mb-4 shadow-lg hover:shadow-xl active:shadow-md border-2 border-white/20 hover:border-white/40 focus:outline-none focus:ring-4 focus:ring-white/50"
					>
						{isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
					</button>

					{/* Footer */}
					<p className="text-center text-sm text-white">
						¿No tienes una cuenta?{" "}
						<Link
							to="/technician/register"
							className="text-yellow-400 font-semibold underline hover:text-yellow-300 transition-colors"
						>
							Regístrate
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
};

export default LoginTechnicianPage;
