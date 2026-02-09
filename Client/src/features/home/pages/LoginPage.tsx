import { useState, useEffect } from "react";
import LogoAmarillo from "../assets/img/Logo_Amarillo.webp";
import Facebook from "../assets/icons/Facebook.svg";
import Google from "../assets/icons/Google.svg";
import Header from "../components/Login-Register-Page/Header";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { API_URL } from "../../../config/api.config";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Mostrar mensaje de éxito si viene del registro
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location.state]);

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Correo: correo,
          Contrasenia: contrasenia,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      // Guardar token si viene en la respuesta
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      navigate("/user/settings");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f2f7a] to-[#072053]">
      {/* Logo centrado */}
      <Header />

      <div className="flex flex-col items-center justify-center px-4">
        <img src={LogoAmarillo} alt="Logo SHC" className="mt-10 w-36 sm:w-44" />
        {/* Card Form */}
        <section className="mt-6 bg-white w-[90%] max-w-md rounded-xl shadow-xl p-8 font-poppins">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Iniciar sesión
          </h2>

          {/* Social Buttons */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-lg py-2 font-medium hover:bg-gray-50 transition">
            <img src={Google} alt="google" className="w-5" />
            Iniciar sesión con Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 bg-white border rounded-lg py-2 font-medium mt-3 hover:bg-gray-50 transition">
            <img src={Facebook} alt="facebook" className="w-5" />
            Iniciar sesión con Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <div className="mx-2 w-2 h-2 rounded-full bg-gray-400"></div>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="johndoe@mail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-[#1D4289]"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              ></button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#1D4289] hover:bg-[#163670] text-white py-2 font-semibold rounded-lg transition-colors"
          >
            Iniciar sesión
          </button>
          {success && (
            <p className="text-green-600 text-sm text-center mt-3">{success}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center mt-3">{error}</p>
          )}

          {/* Footer */}
          <p className="text-center mt-5 text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-[#1D4289] font-semibold">
              Regístrate
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
