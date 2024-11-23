// app/components/ui/LogoMarquee.tsx
import React, { useRef, useEffect } from 'react';

const logos = [
	"/assets/logos/maxi-logo.svg",
	"/assets/logos/dis-logo.png",
	"/assets/logos/idea-logo.svg",
	"/assets/logos/univerexport-logo.svg",
	"/assets/logos/tempo-logo.svg",
	"/assets/logos/aroma-logo.svg"
];

const LogoMarquee: React.FC = () => {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scroll = scrollRef.current;
		if (!scroll) return;

		let animationFrameId: number;
		let currentScroll = 0;
		const speed = 1.6;

		const animate = () => {
			if (!scroll) return;

			currentScroll += speed;

			// Reset when we've scrolled the width of one set of logos
			if (currentScroll >= scroll.firstElementChild?.clientWidth || 0) {
				currentScroll = 0;
			}

			scroll.style.transform = `translateX(-${currentScroll}px)`;
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, []);

	// Double the logos to ensure smooth looping
	const allLogos = [...logos, ...logos];

	return (
		<div className="w-full border-y-2 border-black bg-white overflow-hidden">
			<div className="py-5 relative">
				<div
					ref={scrollRef}
					className="flex items-center gap-20 h-fit w-fit"
					style={{ willChange: 'transform' }}
				>
					{allLogos.map((logo, index) => (
						<img
							key={index}
							src={logo}
							alt={`Partner logo ${(index % logos.length) + 1}`}
							className="h-6 md:h-6 object-contain"
							// style={logo.includes('dis-logo') ? { height: '50px' } : { height: '10px' }}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default LogoMarquee;