import React from 'react';
import { Link } from '@remix-run/react';
import ContactButton from './ContactButton';
import Logos from './Logos';
import RotatingSeasonalCircle from './RotatingSeasonalCircle';

import { useTranslation } from '~/lib/i18n/useTranslation';

const logos = [
	{ src: "/assets/logos/maxi-logo.svg", alt: "Maxi logo" },
	{ src: "/assets/logos/dis-logo.png", alt: "DIS logo", style: { height: '20px' } },
	{ src: "/assets/logos/idea-logo.svg", alt: "Idea logo" },
	{ src: "/assets/logos/univerexport-logo.svg", alt: "Univerexport logo" },
	{ src: "/assets/logos/tempo-logo.svg", alt: "Tempo logo" },
	{ src: "/assets/logos/aroma-logo.svg", alt: "Aroma logo" },
];

const Hero: React.FC = () => {
	const { t } = useTranslation();

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
						{t('home.hero.headingTop')} <br />
						{t('home.hero.headingBottom')}	
					</h1>
					<p className="text-xl sm:text-2xl mt-4 max-w-2xl">
						{t('home.hero.subheading')}
					</p>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
						<ContactButton
							onClick={() => { }} // You'll need to implement this
							text={t('home.hero.ctaText')}
							bgColor="bg-orange-500"
							hoverBgColor="hover:bg-black"
							hoverTextColor="hover:text-white"
							className="w-full sm:w-auto text-xl"
						/>
						<Link
							to={t('home.hero.secondaryButtonLink')}
							className="text-xl font-semibold px-6 py-2 border-2 border-black bg-white hover:bg-[#d71e97]
                text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
						>
							{t('home.hero.secondaryButtonText')}
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-6 sm:mt-6 md:mt-4 relative z-10s">
				<div className="p-4 border-2 border-black rounded-full bg-white">
					<Logos logos={logos} />
				</div>
			</div>
		</section>
	);
};

export default Hero;
