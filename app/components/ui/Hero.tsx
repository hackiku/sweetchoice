// app/components/ui/Hero.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import ContactButton from './ContactButton';
import Logos from './Logos';
import RotatingSeasonalCircle from './RotatingSeasonalCircle';

interface HeroProps {
	title?: string;
	subtitle: string;
	ctaText: string;
	ctaLink: string;
	secondaryButtonText: string;
	secondaryButtonLink: string;
	logos: Array<{ src: string; alt: string; style?: React.CSSProperties }>;
	onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({
	title,
	subtitle,
	ctaText,
	ctaLink,
	secondaryButtonText,
	secondaryButtonLink,
	logos,
	onContactClick,
}) => {
	return (
		<section className="min-h-[calc(90vh-4rem)] flex flex-col justify-between px-6 sm:px-8 md:px-12 relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<RotatingSeasonalCircle />
			</div>
			<div className="flex-grow flex flex-col justify-start space-y-4 sm:space-y-6 relative">
				<div className="w-full">
					<h1 className="text-[12vw] sm:text-[10vw] md:text-[7vw] font-bold leading-tight mb-4 uppercase text-orange-400 w-full"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						Sweet holidays <br /> all year long
					</h1>
					<p className="text-xl sm:text-2xl mt-4 max-w-2xl">
						We wholesale wholesome holiday treats to supermarkets large and small.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
						<ContactButton
							onClick={onContactClick}
							text="Get Catalog →"
							bgColor="bg-orange-500"
							hoverBgColor="hover:bg-black"
							hoverTextColor="hover:text-white"
							className="w-full sm:w-auto text-xl"
						/>
						<Link
							to={ctaLink}
							className="text-xl font-semibold px-6 py-2 border-2 border-black bg-white hover:bg-[#d71e97]
                      text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                      transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
						>
							{ctaText}
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-6 sm:mt-2 relative z-10">
				<div className="p-4 border-2 border-black rounded-full bg-white">
					<Logos logos={logos} />
				</div>
			</div>
		</section>
	);
};

export default Hero;