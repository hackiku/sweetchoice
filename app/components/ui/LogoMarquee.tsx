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
	"/assets/logos/supervero-logo.png"
];

const LogoMarquee = () => {
	return (
		<div className="w-full border-y-2 border-black bg-white overflow-hidden">
			<div className="py-8 relative flex">
				<div className="flex animate-scroll space-x-16 min-w-full">
					{logos.map((logo, index) => (
						<div key={index} className="flex items-center flex-shrink-0">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-8 w-auto object-contain"
							/>
						</div>
					))}
				</div>
				{/* <div className="flex absolute left-full bg-reds-500 -ml-32 space-x-16 min-w-full animate-scroll">
					{logos.map((logo, index) => (
						<div key={`duplicate-${index}`} className="flex items-center flex-shrink-0">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-8 w-auto object-contain"
							/>
						</div>
					))}
				</div> */}
			</div>
		</div>
	);
};


export default LogoMarquee;