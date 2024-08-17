// app/components/ui/Hero.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import Button from './Button';
import Logos from './Logos';

interface HeroProps {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaLink: string;
	secondaryButtonText: string;
	secondaryButtonLink: string;
	logos: Array<{ src: string; alt: string; style?: React.CSSProperties }>;
}

const Hero: React.FC<HeroProps> = ({
	title,
	subtitle,
	ctaText,
	ctaLink,
	secondaryButtonText,
	secondaryButtonLink,
	logos,
}) => {
	return (
		<section className="min-h-[calc(100vh-4rem)] flex flex-col justify-between px-6 sm:px-8 md:px-12">
			<div className="flex-grow flex flex-col justify-start space-y-4 sm:space-y-6">
				<div className="w-full">
					<h1 className="text-[calc(14vw-0.1rem)] sm:text-[10vw] md:text-[6vw] font-semibold leading-[1.1] mb-4 w-full">
						{title.split(' ').map((word, index) => (
							<span key={index} className="inline-block mr-[0.1em]">{word}</span>
						))}
					</h1>
					<p className="text-xl sm:text-2xl mt-4">
						{subtitle}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
					<Link
						to={ctaLink}
						className="text-xl font-semibold px-6 py-2 border-2 border-black bg-[#AE7AFF] hover:bg-[#d71e97]
                      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                      transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
					>
						{ctaText}
					</Link>
					<Button
						type="secondary"
						onClick={() => window.location.href = secondaryButtonLink}
						className="w-full sm:w-auto"
					>
						{secondaryButtonText}
					</Button>
				</div>
			</div>

			<div className="mt-8 mb-4">
				<div className="p-4 border-2 border-black rounded-full bg-white">
					<Logos logos={logos} />
				</div>
			</div>
		</section>
	);
};

export default Hero;