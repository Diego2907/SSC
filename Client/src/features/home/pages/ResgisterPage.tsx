import { useState } from "react";
import LogoAmarillo from "../assets/img/Logo_Amarillo.webp";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Login-Register-Page/Header";
import { API_URL } from "../../../config/api.config";

const RegisterPage = () => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validaciones
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !telefono || !password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    if (password !== repeatPass) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (!consentimiento) {
      setError("Debes aceptar los términos y condiciones");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nombre,
          Apellido_Paterno: apellidoPaterno,
          Apellido_Materno: apellidoMaterno,
          Correo: correo,
          Telefono: telefono,
          Contrasenia: password,
          Consentimiento: consentimiento,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      const data = await response.json();
      
      // Redirigir a login después del registro exitoso
      navigate("/login", { state: { message: "Usuario registrado exitosamente. Por favor inicia sesión." } });
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#0f2f7a] to-[#072053] relative">
      {/* Header superior solo blanco (opcional según tu proyecto) */}
      <Header />
      {/* Logo centrado */}
      <img src={LogoAmarillo} alt="Logo SHC" className="mt-14 w-36 sm:w-44" />

      {/* Card Form */}
      <section className="mt-6 bg-white w-[90%] max-w-md rounded-xl shadow-xl p-8 font-poppins">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Crear cuenta
        </h2>

        <form onSubmit={handleRegister}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
              required
            />
          </div>

          {/* Apellido Paterno */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Apellido Paterno</label>
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
              required
            />
          </div>

          {/* Apellido Materno */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Apellido Materno</label>
            <input
              type="text"
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
              required
            />
          </div>

          {/* Correo */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
              required
            />
          </div>

          {/* Teléfono */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="1234567890"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
              required
            />
          </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
          />
        </div>

        {/* Repetir contraseña */}
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700">
            Vuelve a escribir la contraseña
          </label>
          <input
            type="password"
            placeholder="*******"
            onChange={(e) => setRepeatPass(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
          />
          {/* Mensaje de error */}
          {repeatPass && repeatPass !== password && (
            <p className="flex items-center gap-2 mt-1 text-red-600 text-xs font-medium">
              <span className="text-lg">●</span> La contraseña debe de tener al
              menos seis caracteres.
            </p>
          )}
        </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-[#1D4289] hover:bg-[#163670] text-white py-2 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registrando..." : "Continuar"}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-3">{error}</p>
          )}
        </form>

        {/* Footer */}
        <div className="flex pt-4">
          <input
            className="w-5 accent-[#1D4289]"
            type="checkbox"
            checked={consentimiento}
            onChange={(e) => setConsentimiento(e.target.checked)}
            required
          />
          <p className="text-[11px] mt-4 text-center text-gray-500">
            He aceptado las{" "}
            <a href="#" className="text-[#1D4289] underline">
              Condiciones de uso
            </a>{" "}
            y el{" "}
            <a href="#" className="text-[#1D4289] underline">
              Aviso de Privacidad
            </a>{" "}
            de SHC
          </p>
        </div>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#1D4289] font-semibold">
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
