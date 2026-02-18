const LINKS = [
	{ to: "/about", label: "Sobre nosotros" },
	{ to: "/privacy", label: "Política de privacidad" },
	{ to: "/terms", label: "Términos y condiciones" },
];

const MoreLinksSection = () => {
	return (
		<section className="pt-2" aria-labelledby="more-links-heading">
			<h2 id="more-links-heading" className="text-sm font-medium text-gray-500 mb-3">
				Más
			</h2>
			<nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<ul className="divide-y divide-gray-100">
					{LINKS.map(({ to, label }) => (
						<li key={to}>
							<a
								href={to}
								className="flex items-center justify-between w-full px-4 py-3 text-gray-800 font-medium active:bg-gray-50 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4289] focus-visible:ring-inset"
							>
								<span>{label}</span>
								<svg
									className="w-5 h-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						</li>
					))}
				</ul>
			</nav>
		</section>
	);
};

export default MoreLinksSection;
