import React from 'react';

const logos = [
	"/assets/logos/maxi-logo.svg",
	"/assets/logos/dis-logo.png",
	"/assets/logos/idea-logo.svg",
	"/assets/logos/metro-logo.svg",
	"/assets/logos/tempo-logo.svg",
	"/assets/logos/aman-logo.png",
	"/assets/logos/supervero-logo.png",
	// "/assets/logos/univerexport-logo.svg",
];

const LogoGroup = () => (
	logos.map((logo, index) => (
		<div key={index} className="p-2 mx-8 w-24 flex-shrink-0">
			<img
				src={logo}
				alt={`Partner logo ${index + 1}`}
				className="h-8 w-auto object-contain"
			/>
		</div>
	))
);

const LogoMarquee = () => {
	return (
		<div className="w-full border-y-2 border-black bg-white overflow-hidden">
			<div className="py-3">
				<div className="relative flex overflow-x-hidden">
					<div className="flex animate-marquee">
						<LogoGroup />
						<LogoGroup />
						<LogoGroup />
					</div>
					<div className="flex absolute top-0 animate-marquee2">
						<LogoGroup />
						<LogoGroup />
						<LogoGroup />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogoMarquee;