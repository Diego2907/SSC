import Carousel from "../../shared/components/Carousel.tsx";
import Image from "../../shared/components/Image";
import Brands from "../components/sectionComponents/brands-Section.tsx";
import Contact from "../components/sectionComponents/contact-Section.tsx";
import persona from "../assets/img/vista-lateral-hombre-trabajando-como-fontanero.webp";
import UbicacionImg from "../assets/img/Ubicacion.webp";
import LocationIcon from "../assets/icons/location_icon.svg";

import altoAngulo from "../assets/img/hombre-de-alto-angulo-trabajando-como-fontanero.webp";
import lavadora from "../assets/img/hombre_reparando_lavadora.webp";
import radiador from "../assets/img/radiador.webp";
import misionImg from "../assets/img/mision.webp";
import visionImg from "../assets/img/vision.webp";

import Achievements from "../components/sectionComponents/achievements-Section.tsx";
import Testimonials from "../components/sectionComponents/testimonials-Section.tsx";
import ContactSchedule from "../components/sectionComponents/contactSchedule-Section.tsx";
import Services from "../components/Services";

const HomePage = () => {
	return (
		<main className="main-content bg-white dark:bg-gray-900 transition-colors duration-300">
			{/* Hero Section */}
			<header id="inicio" className="container mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-10 pb-0">
				<p className="bg-[#DA291C] text-white px-3 py-1 text-sm font-semibold inline-block mb-6 md:mb-8 font-poppins">
					¡Preparados para grandes retos!
				</p>
				<h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 md:mb-8 text-gray-900 dark:text-white">
					SHC es una empresa con más de
					<span className="text-[#44D62C]"> 30 años en el mercado </span> con
					técnicos
					<span className="text-[#1D4289]"> altamente capacitados</span>.
				</h1>
			</header>

			<Carousel
				images={[
					{
						src: persona,
						alt: "Vista lateral hombre trabajando como fontanero",
						classNameImage: "w-full h-full object-cover",
					},
					{
						src: altoAngulo,
						alt: "Hombre de alto ángulo trabajando como fontanero",
						classNameImage: "w-full h-full object-cover",
					},
					{
						src: lavadora,
						alt: "Hombre reparando lavadora",
						classNameImage: "w-full h-full object-cover",
					},
					{
						src: radiador,
						alt: "Radiador",
						classNameImage: "w-full h-full object-cover",
					},
				]}
				className="inset-0 w-full"
			/>

			{/* About Section */}
			<section className="pt-12 md:pt-16 lg:pt-24 container mx-auto px-4 md:px-8 lg:px-16">
				<article className="flex flex-col justify-between gap-6 lg:flex-row lg:space-x-20 mb-12 lg:mb-20">
					<header className="w-full lg:w-1/3 mb-6 lg:mb-0">
						<p className="bg-[#DA291C] text-white px-3 py-1 text-sm font-semibold inline-block mb-6 md:mb-8 font-poppins">
							¿Quienes somos?
						</p>
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white font-poppins">
							Conócenos
						</h2>
					</header>

					<section className="w-full lg:w-2/3 space-y-4 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed font-poppins">
						<p className="font-semibold">
							Somos una empresa especializada en{" "}
							<span className="text-[#44D62C] font-semibold">
								mantenimiento de línea blanca
							</span>{" "}
							con más de{" "}
							<span className="font-semibold">10 años de experiencia</span> en
							el mercado.
						</p>
						<p>
							Nuestro equipo está formado por{" "}
							<span className="text-[#1D4289] dark:text-blue-400 font-semibold">
								técnicos certificados y apasionados
							</span>{" "}
							por ofrecer el mejor servicio. Nos distinguimos por nuestra
							puntualidad, honestidad y compromiso con la{" "}
							<span className="text-[#1D4289] dark:text-blue-400 font-semibold">
								satisfacción total de nuestros clientes
							</span>
							.
						</p>
					</section>
				</article>
			</section>

			{/* Mission & Vision - Idéntico al Figma */}
			<section id="conocenos" className="grid grid-cols-1 md:grid-cols-2 w-full">
				{/* Misión - Fondo Azul Pantone 7687 C */}
				<article className="w-full bg-[#1D4289] text-white px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-16 xl:py-20 relative overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
					{/* Imagen decorativa de fondo - engrane */}
					<div
						className="absolute left-0 top-0 bottom-0 w-1/2 bg-no-repeat bg-left bg-contain opacity-20 pointer-events-none"
						style={{ backgroundImage: `url(${misionImg})` }}
						aria-hidden="true"
					/>
					<div className="relative z-10 w-full max-w-[480px] mx-auto text-center flex flex-col gap-3">
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-poppins mb-2">
							Misión
						</h3>
						<p className="text-xs sm:text-sm md:text-base leading-relaxed text-white font-poppins">
							Nuestra misión es <strong className="text-[#FFE900]">proporcionar servicios técnicos de calidad excepcional para electrodomésticos</strong>, garantizando soluciones rápidas y efectivas que superen las expectativas de nuestros clientes. Nos comprometemos con la <strong className="text-[#FFE900]">excelencia en cada servicio</strong>, utilizando <strong className="text-[#FFE900]">tecnología avanzada</strong> y las <strong className="text-[#FFE900]">mejores prácticas de la industria</strong>.
						</p>
					</div>
				</article>

				{/* Visión - Fondo Verde Pantone 802 C */}
				<article className="w-full bg-[#44D62C] text-white px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-16 xl:py-20 relative overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
					{/* Imagen decorativa de fondo - gráfica */}
					<div
						className="absolute right-0 top-0 bottom-0 w-1/2 bg-no-repeat bg-right bg-contain opacity-20 pointer-events-none"
						style={{ backgroundImage: `url(${visionImg})` }}
						aria-hidden="true"
					/>
					<div className="relative z-10 w-full max-w-[480px] mx-auto text-center flex flex-col gap-3">
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-poppins mb-2">
							Visión
						</h3>
						<p className="text-xs sm:text-sm md:text-base leading-relaxed text-white font-poppins">
							Ser la <strong className="text-[#1D4289]">empresa líder</strong> en servicios técnicos de línea blanca, reconocida por nuestra <strong className="text-[#FFE900]">excelencia, innovación y compromiso</strong> con la satisfacción del cliente. Buscamos <strong className="text-[#FFE900]">expandir nuestra presencia a nivel nacional</strong>, manteniendo siempre los más altos estándares de calidad y servicio personalizado.
						</p>
					</div>
				</article>
			</section>

			<ContactSchedule />

			{/* Location Section - Diseño Horizontal Idéntico al Figma */}
			<section className="w-full py-16 md:py-20 lg:py-24 bg-[#F8F9FA] dark:bg-gray-900 transition-colors duration-300">
				<div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
					{/* Layout Horizontal Principal - 45% / 55% */}
					<div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
						
						{/* Columna Izquierda - Información (45%) */}
						<div className="w-full lg:w-[45%] flex flex-col justify-start">
							{/* Título y descripción */}
							<div className="mb-8">
								<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold leading-[1.1] text-[#1A1A1A] dark:text-white font-poppins mb-5">
									Ubicación
								</h2>
								<p className="text-base md:text-lg lg:text-xl text-[#6B7280] dark:text-gray-300 font-poppins leading-relaxed max-w-md">
									Visítanos en nuestras instalaciones y conoce de cerca nuestro equipo de profesionales listos para atenderte.
								</p>
							</div>

							{/* Tarjeta de Dirección - Estilo Figma */}
							<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-100/50 dark:border-gray-700/50 transition-all duration-300">
								<div className="flex items-start gap-4 lg:gap-5">
									{/* Icono de ubicación - Usando el SVG existente */}
									<div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-[#FFEAEA] dark:bg-red-900/30 rounded-full flex items-center justify-center">
										<img 
											src={LocationIcon} 
											alt="Icono de ubicación" 
											className="w-6 h-8 lg:w-7 lg:h-9"
										/>
									</div>
									<div className="flex-1">
										<h3 className="font-poppins font-bold text-lg lg:text-xl text-[#1A1A1A] dark:text-white mb-2">
											Dirección
										</h3>
										<address className="not-italic font-poppins text-[#6B7280] dark:text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
											Mariano Arista #125<br />
											Centro, Colima<br />
											CP. 28000
										</address>
									</div>
								</div>

								{/* Botón para abrir en Maps - Estilo Figma */}
								<a 
									href="https://www.google.com/maps/search/?api=1&query=Servi+Hogar+de+Colima+Mariano+Arista+125+Centro+Colima" 
									target="_blank" 
									rel="noopener noreferrer"
									className="mt-6 lg:mt-8 w-full inline-flex items-center justify-center gap-3 bg-[#1D4289] hover:bg-[#163670] text-white font-poppins font-semibold text-base lg:text-lg px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
								>
									<img 
										src={LocationIcon} 
										alt="" 
										className="w-5 h-6 brightness-0 invert"
									/>
									Abrir en Google Maps
								</a>
							</div>

							{/* Información adicional - Diseño Figma */}
							<div className="mt-6 lg:mt-8 grid grid-cols-2 gap-4 lg:gap-6">
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-700/50">
									<div className="flex items-center gap-3 lg:gap-4">
										<div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#E8F5E8] dark:bg-green-900/30 rounded-full flex items-center justify-center">
											<svg width="20" height="20" viewBox="0 0 24 24" className="lg:w-6 lg:h-6">
												<path fill="#44D62C" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
											</svg>
										</div>
										<div>
											<p className="font-poppins font-semibold text-sm lg:text-base text-[#1A1A1A] dark:text-white">Fácil acceso</p>
											<p className="font-poppins text-xs lg:text-sm text-[#9CA3AF] dark:text-gray-400">Centro de la ciudad</p>
										</div>
									</div>
								</div>
								<div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] border border-gray-100/50 dark:border-gray-700/50">
									<div className="flex items-center gap-3 lg:gap-4">
										<div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#E8F0FA] dark:bg-blue-900/30 rounded-full flex items-center justify-center">
											<svg width="20" height="20" viewBox="0 0 24 24" className="lg:w-6 lg:h-6">
												<path fill="#1D4289" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
											</svg>
										</div>
										<div>
											<p className="font-poppins font-semibold text-sm lg:text-base text-[#1A1A1A] dark:text-white">Lun - Sáb</p>
											<p className="font-poppins text-xs lg:text-sm text-[#9CA3AF] dark:text-gray-400">Horario amplio</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Columna Derecha - Mapa (55%) */}
						<div className="w-full lg:w-[55%]">
							<div 
								className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-full lg:min-h-[520px] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
								id="google-map-container"
								data-lat="19.2433" 
								data-lng="-103.7250"
								data-zoom="16"
							>
								{/* Imagen estática del mapa - Placeholder para API */}
								<Image
									classNameImage="absolute inset-0 w-full h-full object-cover"
									SrcImage={UbicacionImg}
									AltImage="Mapa de ubicación - Servi Hogar de Colima"
								/>

								{/* Badge de ubicación - Estilo Figma */}
								<div className="absolute top-4 left-4 lg:top-5 lg:left-5 bg-white dark:bg-gray-800 px-4 py-2.5 lg:px-5 lg:py-3 rounded-xl shadow-lg flex items-center gap-2">
									<img 
										src={LocationIcon} 
										alt="" 
										className="w-4 h-5"
									/>
									<p className="font-poppins font-bold text-sm lg:text-base text-[#1D4289] dark:text-blue-400">
										Servi Hogar de Colima
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section - Nuestros Servicios */}
			<Services />

			{/* Brands Section - Sin padding extra */}
			<Brands />

			<Achievements />
			<Testimonials />
			<Contact />
		</main>
	);
};

export default HomePage;
