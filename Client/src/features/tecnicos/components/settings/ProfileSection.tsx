import { useRef } from "react";

interface ProfileSectionProps {
	nombre: string;
	avatarUrl?: string | null;
	onChangeImageClick?: () => void;
}

const ProfileSection = ({
	nombre,
	avatarUrl = null,
	onChangeImageClick,
}: ProfileSectionProps) => {
	const inputFileRef = useRef<HTMLInputElement>(null);

	const handleChangeImage = () => {
		if (onChangeImageClick) {
			onChangeImageClick();
		} else {
			inputFileRef.current?.click();
		}
	};

	return (
		<section className="space-y-4" aria-labelledby="profile-heading">
			{/* Tarjeta de bienvenida */}
			<div className="bg-white rounded-t-2xl rounded-b-xl shadow-sm border border-gray-200 overflow-hidden -mt-0.5">
				<div className="p-4 flex items-center gap-4">
					<div className="relative flex-shrink-0">
						{avatarUrl ? (
							<img
								src={avatarUrl}
								alt=""
								className="w-14 h-14 rounded-full object-cover bg-gray-200"
							/>
						) : (
							<div
								className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl font-semibold"
								aria-hidden="true"
							>
								{nombre?.charAt(0)?.toUpperCase() || "T"}
							</div>
						)}
					</div>
					<div className="min-w-0 flex-1">
						<h2 id="profile-heading" className="text-base font-semibold text-gray-800">
							Bienvenido, <span className="text-green-600">{nombre || "Técnico"}</span>
						</h2>
						<p className="text-sm text-gray-500 mt-0.5">Configuración de la cuenta</p>
					</div>
				</div>
			</div>

			{/* Bloque Imagen de perfil */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
				<h3 className="text-base font-bold text-[#1D4289] mb-1">Imagen de perfil</h3>
				<p className="text-sm text-[#1D4289] mb-3">
					El rostro del trabajador debe de ser completamente visible, sin objetos que interfieran con la identificación.
				</p>
				<div className="flex items-center gap-4">
					<div className="relative flex-shrink-0">
						{avatarUrl ? (
							<img
								src={avatarUrl}
								alt=""
								className="w-14 h-14 rounded-full object-cover bg-gray-200"
							/>
						) : (
							<div
								className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-lg font-semibold"
								aria-hidden="true"
							>
								{nombre?.charAt(0)?.toUpperCase() || "T"}
							</div>
						)}
						<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap">
							EN USO
						</span>
					</div>
					<input
						ref={inputFileRef}
						type="file"
						accept="image/jpeg,image/png"
						className="sr-only"
						aria-label="Seleccionar imagen de perfil"
						onChange={() => {}}
					/>
					<button
						type="button"
						onClick={handleChangeImage}
						className="flex items-center gap-2 text-[#1D4289] text-sm font-medium active:scale-[0.98] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] rounded"
					>
						<svg
							className="w-4 h-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
						</svg>
						Cambiar imagen de perfil
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProfileSection;
