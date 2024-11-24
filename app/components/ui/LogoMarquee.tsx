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
			<div className="py-6">
				<div className="flex animate-scroll">
					{/* Original set */}
					{logos.map((logo, index) => (
						<div key={index} className="mx-8 flex-shrink-0">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-8 w-auto object-contain"
							/>
						</div>
					))}
					{/* Second set */}
					{logos.map((logo, index) => (
						<div key={`second-${index}`} className="mx-8 flex-shrink-0">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-8 w-auto object-contain"
							/>
						</div>
					))}
					{/* Third set for seamless loop */}
					{logos.map((logo, index) => (
						<div key={`third-${index}`} className="mx-8 flex-shrink-0">
							<img
								src={logo}
								alt={`Partner logo ${index + 1}`}
								className="h-8 w-auto object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// Update tailwind.config.js:
// {
//   theme: {
//     extend: {
//       animation: {
//         scroll: 'scroll 45s linear infinite',
//       },
//       keyframes: {
//         scroll: {
//           '0%': { transform: 'translateX(0)' },
//           '100%': { transform: 'translateX(-66.666%)' }  // Moves through 2 sets
//         }
//       },
//     }
//   }
// }

export default LogoMarquee;

