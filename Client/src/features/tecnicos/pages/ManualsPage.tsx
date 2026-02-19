import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logo from "../../home/assets/img/Logo.webp";

const ManualsPage = () => {
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token_technician");
		if (!token) {
			navigate("/technician/login");
			return;
		}
	}, [navigate]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			{/* Header */}
			<header className="bg-white shadow-sm sticky top-0 z-30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
					<button
						type="button"
						onClick={() => setSidebarOpen(true)}
						className="flex items-center justify-center w-10 h-10 rounded-lg active:scale-95 transition-transform touch-manipulation text-[#1D4289]"
						aria-label="Abrir menú"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					<img src={Logo} alt="Logo SHC" className="h-10" />

					<div className="w-10" aria-hidden="true" />
				</div>
			</header>

			{/* Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Manuales</h1>
				<div className="bg-white rounded-lg shadow p-6">
					<p className="text-gray-600">
						Esta página está en desarrollo. Aquí podrás acceder a los manuales y documentación técnica.
					</p>
				</div>
			</main>
		</div>
	);
};

export default ManualsPage;
