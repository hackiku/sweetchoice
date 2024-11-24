// app/components/ui/LogoMarquee.tsx
import React from 'react';

const logos = [
	"/assets/logos/maxi-logo.svg",
	"/assets/logos/dis-logo.png",
	"/assets/logos/idea-logo.svg",
	"/assets/logos/univerexport-logo.svg",
	"/assets/logos/tempo-logo.svg",
	"/assets/logos/aroma-logo.svg",
	"/assets/logos/aman-logo.png",
	"/assets/logos/metro-logo.svg",
	"/assets/logos/supervero-logo.png",
];

const LogoMarquee = () => {
	return (
		<div className="w-full border-y-2 border-black bg-white overflow-hidden">
			<div className="py-5 relative">
				<div className="flex animate-marquee whitespace-nowrap">
					{/* First set of logos */}
					{logos.map((logo, index) => (
						<div key={`first-${index}`} className="mx-5 flex items-center">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-6 md:h-6 object-contain"
							/>
						</div>
					))}
					{/* Duplicate set for seamless loop */}
					{logos.map((logo, index) => (
						<div key={`second-${index}`} className="mx-5 flex items-center">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-6 md:h-6 object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LogoMarquee;