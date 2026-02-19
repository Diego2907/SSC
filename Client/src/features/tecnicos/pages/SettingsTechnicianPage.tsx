import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSection from "../components/settings/ProfileSection";
import SettingsAccordion from "../components/settings/SettingsAccordion";
import EditProfileSection from "../components/settings/EditProfileSection";
import AccountSection from "../components/settings/AccountSection";
import MonitoringSection from "../components/settings/MonitoringSection";
import VacationSection from "../components/settings/VacationSection";
import PasswordSection from "../components/settings/PasswordSection";
import SecuritySection from "../components/settings/SecuritySection";
import MoreLinksSection from "../components/settings/MoreLinksSection";

export type SettingsSectionId =
	| "edit-profile"
	| "account"
	| "monitoring"
	| "password"
	| "security"
	| null;

const API_BASE = "http://localhost:3000/api/technician";

/** Sin backend: true = (preview). Cuando conectes el backend, ponlo en false. */
const PREVIEW_SIN_BACKEND = true;

const SettingsTechnicianPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [technician, setTechnician] = useState<{
		Nombre?: string;
		ApellidoPaterno?: string;
		ApellidoMaterno?: string;
		Correo?: string;
		Telefono?: string;
		ImagenPerfil?: string | null;
	} | null>(null);

	const [monitoringEnabled, setMonitoringEnabled] = useState(false);
	const [vacationMode, setVacationMode] = useState(false);
	const [openSection, setOpenSection] = useState<SettingsSectionId>(null);

	const handleToggleMonitoring = () => {
		setMonitoringEnabled((prev) => {
			if (!prev) setVacationMode(false);
			return !prev;
		});
	};

	const handleToggleVacation = () => {
		setVacationMode((prev) => {
			if (!prev) setMonitoringEnabled(false);
			return !prev;
		});
	};

	const toggleSection = (id: SettingsSectionId) => {
		setOpenSection((current) => (current === id ? null : id));
	};

	useEffect(() => {
		const token = localStorage.getItem("token_technician");

		// Modo preview
		if (PREVIEW_SIN_BACKEND) {
			if (!token) {
				setLoading(false);
				return;
			}
		} else if (!token) {
			setLoading(false);
			navigate("/technician/login");
			return;
		}

		fetch(`${API_BASE}/profile`, {
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (!res.ok) throw new Error("No autenticado");
				return res.json();
			})
			.then((data) => {
				setTechnician(data.data ?? null);
			})
			.catch(() => {
				if (!PREVIEW_SIN_BACKEND) {
					localStorage.removeItem("token_technician");
					navigate("/technician/login");
				}
				// En preview, dejar technician en null para ver la UI con datos vacíos
			})
			.finally(() => setLoading(false));
	}, [navigate]);

	const handleMenuClick = () => {
		setSidebarOpen(true);
	};

	const handlePasswordSubmit = (data: {
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	}) => {
		console.log("Cambiar contraseña (backend pendiente):", data);
	};

	const handleProfileSubmit = (data: {
		nombre: string;
		apellidoPaterno: string;
		apellidoMaterno: string;
		email: string;
		telefono: string;
	}) => {
		// Backend: PATCH /api/technician/profile
		console.log("Guardar perfil (backend pendiente):", data);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<p className="text-gray-600">Cargando...</p>
			</div>
		);
	}

	const nombre = technician?.Nombre ?? "";
	const apellidoPaterno = technician?.ApellidoPaterno ?? "";
	const apellidoMaterno = technician?.ApellidoMaterno ?? "";
	const email = technician?.Correo ?? "";
	const telefono = technician?.Telefono ?? "";

	return (
		<div className="min-h-screen bg-gray-100 pb-8">
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<SettingsHeader onMenuClick={handleMenuClick} />

			<main className="px-4 pt-4 space-y-4 max-w-lg mx-auto">
				<ProfileSection
					nombre={nombre || "Técnico"}
					avatarUrl={technician?.ImagenPerfil ?? null}
				/>

				<SettingsAccordion
					id="edit-profile"
					title="Editar perfil"
					isOpen={openSection === "edit-profile"}
					onToggle={() => toggleSection("edit-profile")}
				>
					<EditProfileSection
						nombre={nombre}
						apellidoPaterno={apellidoPaterno}
						apellidoMaterno={apellidoMaterno}
						email={email}
						telefono={telefono}
						onSubmit={handleProfileSubmit}
					/>
				</SettingsAccordion>

				<SettingsAccordion
					id="account"
					title="Ajustes de la cuenta"
					isOpen={openSection === "account"}
					onToggle={() => toggleSection("account")}
				>
					<AccountSection />
				</SettingsAccordion>

				<SettingsAccordion
					id="monitoring"
					title="Monitoreo"
					isOpen={openSection === "monitoring"}
					onToggle={() => toggleSection("monitoring")}
				>
					<MonitoringSection
						monitoringEnabled={monitoringEnabled}
						onToggleMonitoring={handleToggleMonitoring}
					/>
				</SettingsAccordion>

				<VacationSection
					vacationMode={vacationMode}
					onToggleVacation={handleToggleVacation}
				/>

				<SettingsAccordion
					id="password"
					title="Cambiar contraseña"
					isOpen={openSection === "password"}
					onToggle={() => toggleSection("password")}
				>
					<PasswordSection onSubmit={handlePasswordSubmit} />
				</SettingsAccordion>

				<SettingsAccordion
					id="security"
					title="Seguridad de la cuenta"
					isOpen={openSection === "security"}
					onToggle={() => toggleSection("security")}
				>
					<SecuritySection />
				</SettingsAccordion>

				<MoreLinksSection />
			</main>
		</div>
	);
};

export default SettingsTechnicianPage;
