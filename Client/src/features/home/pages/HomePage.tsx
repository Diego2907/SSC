import Carousel from "../../shared/components/Carousel.tsx";
import Image from "../../shared/components/Image";
import Brands from "../components/sectionComponents/brands-Section.tsx";
import Contact from "../components/sectionComponents/contact-Section.tsx";
import persona from "../assets/img/vista-lateral-hombre-trabajando-como-fontanero.webp";
import UbicacionImg from "../assets/img/Ubicacion.webp";
import UbicationIcon from "../assets/icons/ubicationIcon.svg";

import img1TechTeam from "../assets/img/Technical-Theme/Technical-theme-1.webp";
import img2TechTeam from "../assets/img/Technical-Theme/Technical-theme-2.webp";
import img3TechTeam from "../assets/img/Technical-Theme/Technical-theme-3.webp";
import img4TechTeam from "../assets/img/Technical-Theme/Technical-theme-4.webp";
import img5TechTeam from "../assets/img/Technical-Theme/Technical-theme-5.webp";
import img6TechTeam from "../assets/img/Technical-Theme/Technical-theme-6.webp";

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
		<main className="main-content">
			{/* Hero Section */}
			<header id="inicio" className="container mx-auto px-4 md:px-8 lg:px-16 pt-10 pb-0">
				<p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
					¡Preparados para grandes retos!
				</p>
				<h1 className="font-[Sora] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8">
					SHC es una empresa con más de
					<span className="text-green-600"> 30 años en el mercado </span> con
					técnicos
					<span className="text-[#1D4488]"> altamente capacitados</span>.
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
			<section className="pt-16 md:pt-20 lg:pt-24 container mx-auto px-4 md:px-8 lg:px-16">
				<article className="flex flex-col justify-between gap-6 lg:flex-row lg:space-x-20 mb-12 lg:mb-20">
					<header className="w-full lg:w-1/3 mb-8 lg:mb-0">
						<p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
							¿Quienes somos?
						</p>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
							Conócenos
						</h2>
					</header>

					<section className="w-full lg:w-2/3 space-y-4 text-gray-600 text-lg leading-relaxed">
						<p className="font-semibold font-[20px]">
							Somos una empresa especializada en{" "}
							<span className="text-green-700 font-semibold">
								mantenimiento de línea blanca
							</span>{" "}
							con más de{" "}
							<span className="font-semibold">10 años de experiencia</span> en
							el mercado.
						</p>
						<p>
							Nuestro equipo está formado por{" "}
							<span className="text-blue-700 font-semibold">
								técnicos certificados y apasionados
							</span>{" "}
							por ofrecer el mejor servicio. Nos distinguimos por nuestra
							puntualidad, honestidad y compromiso con la{" "}
							<span className="text-blue-700 font-semibold">
								satisfacción total de nuestros clientes
							</span>
							.
						</p>
					</section>
				</article>
			</section>

			{/* Mission & Vision - Con imágenes de fondo */}
			<section id="conocenos" className="grid grid-cols-1 md:grid-cols-2 w-full">
				<article className="w-full bg-[#2B4C9F] text-white px-8 py-[2.85rem] md:px-12 md:py-[3.8rem] lg:px-16 lg:py-[4.75rem] xl:px-24 xl:py-[5.7rem] relative overflow-hidden flex min-h-[330px] md:min-h-[380px]">
					<div
						className="absolute left-0 top-0 bottom-0 w-2/3 md:w-1/2 bg-no-repeat bg-left bg-contain opacity-30"
						style={{ backgroundImage: `url(${misionImg})` }}
					/>
					<div className="relative z-10 w-full max-w-[520px] mx-auto text-center flex flex-col gap-4">
						<h3 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
							Misión
						</h3>
						<p className="text-base md:text-lg leading-relaxed text-white/95">
							Somos una empresa especializada en{" "}
							<span className="text-yellow-300 font-semibold">
								<strong>
									soluciones integrales para la instalación, mantenimiento y
									reparación{" "}
								</strong>
							</span>
							de{" "}
							<span className="text-yellow-300 font-semibold">
								<strong>equipos de línea blanca</strong>
							</span>
							,{" "}
							<span className="text-yellow-300 font-semibold">
								<strong>aire acondicionado</strong>
							</span>{" "}
							y{" "}
							<span className="text-yellow-300 font-semibold">
								<strong>electrónica</strong>
							</span>
							, comprometidos con brindar un servicio oportuno, eficiente y
							confiable mediante{" "}
							<span className="text-yellow-300 font-semibold">
								<strong>personal altamente capacitado</strong>
							</span>
							, la implementación de{" "}
							<span className="text-yellow-300 font-semibold">
								<strong>tecnologías innovadoras</strong>{" "}
							</span>
							y una comunicación efectiva con nuestros clientes, colaboradores y
							aliados estratégicos, generando valor sustentable en cada
							interacción.
						</p>
					</div>
				</article>

				<article className="w-full bg-[#40BA5E] text-white px-8 py-[2.85rem] md:px-12 md:py-[3.8rem] lg:px-16 lg:py-[4.75rem] xl:px-24 xl:py-[5.7rem] relative overflow-hidden flex min-h-[330px] md:min-h-[380px]">
					<div
						className="absolute right-0 top-0 bottom-0 w-2/3 md:w-1/2 bg-no-repeat bg-right bg-contain opacity-30"
						style={{ backgroundImage: `url(${visionImg})` }}
					/>
					<div className="relative z-10 w-full max-w-[520px] mx-auto text-center flex flex-col gap-4">
						<h3 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
							Visión
						</h3>
						<p className="text-base md:text-lg leading-relaxed text-white/95">
							Ser reconocidos para el 2030 como la{" "}
							<span className="text-[#1d4488]">
								<strong>empresa líder </strong>
							</span>
							en el occidente del país en
							<span className="text-[#1d4488]">
								<strong> servicios técnicos especializados </strong>
							</span>
							para
							<span className="text-[#1d4488]">
								<strong> línea blanca</strong>
							</span>
							,
							<span className="text-[#1d4488]">
								<strong> aire acondicionado </strong>
							</span>
							y{" "}
							<span className="text-[#1d4488]">
								<strong>electrónica</strong>
							</span>
							, destacando por nuestra{" "}
							<span className="text-[#1d4488] ">
								<strong>capacidad tecnológica</strong>,{" "}
								<strong>innovación constante</strong>{" "}
							</span>
							y la{" "}
							<span className="text-[#1d4488] font-semibold">
								<strong>excelencia operativa</strong>,
							</span>
							ofreciendo a nuestros clientes soluciones ágiles, personalizadas y
							altamente competitivas.
						</p>
					</div>
				</article>
			</section>

			<ContactSchedule />

			{/* Location Section */}
			<section className="w-full pt-10">
				<header className="flex items-center justify-between gap-6 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
					<article>
						<p className="bg-red-600 text-white px-4 py-4 font-semibold text-sm inline-block mb-8">
							¿Dónde nos encontramos?
						</p>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
							Ubicación
						</h2>
					</article>

					<address className="flex items-center  not-italic">
						<Image
							classNameImage="w-12 h-12 mb-4"
							SrcImage={UbicationIcon}
							AltImage="Icono de ubicacion"
						/>
						<p className="font-semibold text-lg">
							Mariano Arista #125Centro, Colima CP. 28000
						</p>
					</address>
				</header>

				<figure className="relative w-full">
					<Image
						classNameImage="inset-0 w-full py-10"
						SrcImage={UbicacionImg}
						AltImage="Ubiacion de la empresa"
					/>
				</figure>
			</section>

			{/* Technical Team Section */}
			{/* <section>
				<header className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
					<p className="bg-red-600 text-white px-3 py-1 text-sm font-semibold inline-block mb-8">
						Nuestros expertos
					</p>
					<article className="flex items-center justify-between gap-10">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
							Equipo técnico
						</h2>
						<p>
							Nuestro equipo de{" "}
							<span className="text-blue-700 font-semibold">
								técnicos certificados y apasionados{" "}
							</span>
							por ofrecer el mejor servicio. Se distinguen por su puntualidad,
							honestidad y compromiso con la{" "}
							<span className="text-blue-700 font-semibold">
								satisfacción total de nuestros clientes.
							</span>
						</p>
					</article>
				</header>

				<figure className="relative mt-10">
					<Carousel
						images={[
							{
								src: img1TechTeam,
								classNameImage: "h-486 rounded-full object-cover mx-auto",
								alt: "erika-de-la-cruz",
								title: "Erika de la Cruz",
								description: "Refrigeración",
							},
							{
								src: img2TechTeam,
								classNameImage: "h-486 rounded-full object-cover mx-auto",
								alt: "valentina-gonzalez",
								title: "Valentina González",
								description: "Lavadoras",
							},
							{
								src: img3TechTeam,
								classNameImage: "h-486 rounded-full object-cover mx-auto",
								alt: "angel-santos",
								title: "Ángel Santos",
								description: "Instalación",
							},
							{
								src: img4TechTeam,
								classNameImage: "rounded-full h-486 object-center",
								alt: "daniela-ramos",
								title: "Daniela Ramos",
								description: "Televisores",
							},
							{
								src: img5TechTeam,
								classNameImage: "rounded-full h-486 object-center",
								alt: "hector-vargas",
								title: "Héctor Vargas",
								description: "Hornos",
							},
							{
								src: img6TechTeam,
								classNameImage: "rounded-full h-486 object-center",
								alt: "edwin-magana",
								title: "Edwin Magaña",
								description: "Mantenimiento",
							},
						]}
					/>
				</figure>
			</section>

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
