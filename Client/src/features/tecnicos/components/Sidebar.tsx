import { Link, useLocation } from "react-router-dom";
import Logo from "../../home/assets/img/Logo.webp";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const MENU_ITEMS = [
	{
		to: "/technician/profile",
		label: "Mi perfil",
		icon: (
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
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
		),
	},
	{
		to: "/technician/settings",
		label: "Configuración",
		icon: (
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
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
	},
	{
		to: "/technician/search",
		label: "Centro de búsqueda",
		icon: (
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
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		),
	},
	{
		to: "/technician/ods-requests",
		label: "Solicitudes ODS",
		icon: (
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
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
		),
	},
	{
		to: "/technician/manuals",
		label: "Manuales",
		icon: (
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
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
		),
	},
	{
		to: "/technician/perceptions",
		label: "Mis percepciones",
		icon: (
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
					d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		),
	},
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const location = useLocation();

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
					onClick={onClose}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-[#E0E0E0] z-50 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
				role="navigation"
				aria-label="Menú principal"
			>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="flex justify-center items-center py-6 px-4 border-b border-gray-300">
						<img src={Logo} alt="SHC" className="h-12 w-auto" />
					</div>

					{/* Menu Items */}
					<nav className="flex-1 overflow-y-auto">
						<ul className="divide-y divide-gray-300">
							{MENU_ITEMS.map((item) => {
								const isActive = location.pathname === item.to;
								return (
									<li key={item.to}>
										<Link
											to={item.to}
											onClick={onClose}
											className={`flex items-center gap-3 px-4 py-4 text-[#1D4289] font-medium transition-colors ${
												isActive
													? "bg-[#1D4289] bg-opacity-10"
													: "hover:bg-gray-200 active:bg-gray-300"
											}`}
										>
											<span className="flex-shrink-0">{item.icon}</span>
											<span>{item.label}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
