// app/components/ui/Hero.tsx
import React from 'react';
import { Link } from '@remix-run/react';
import ContactButton from './ContactButton';
import LogoMarquee from './LogoMarquee';
import RotatingSeasonalCircle from './RotatingSeasonalCircle';
import { useTranslation } from '~/lib/i18n/useTranslation';

const Hero: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="h-[calc(90vh-6rem)] flex flex-col justify-between px-6 sm:px-8 md:px-12 relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<RotatingSeasonalCircle />
			</div>

			<div className="flex-grow flex flex-col justify-center relative">
				<div className="w-full">
					<h1 className="text-[12vw] sm:text-[12vw] md:text-[7vw] font-bold leading-tight mb-4 uppercase text-orange-400 w-full"
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

					<div className="flex flex-row gap-4 sm:gap-6 my-6 sm:mb-16 md:w-3/5 lg:w-2/5">
						<ContactButton
							onClick={() => { }}
							text={t('home.hero.ctaText')}
							bgColor="bg-orange-500"
							hoverBgColor="hover:bg-black"
							hoverTextColor="hover:text-white"
							className="w-7/12 text-xl"
						/>
						<Link
							to={t('home.hero.secondaryButtonLink')}
							className="text-xl font-semibold px-4 py-2 border-2 border-black bg-white hover:bg-[#d71e97]
                text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                transition-all duration-200 flex items-center justify-center w-5/12"
						>
							{t('home.hero.secondaryButtonText')}
						</Link>
					</div>
				</div>
				<div className="relative z-10">
					<LogoMarquee />
				</div>
			</div>

		</section>
	);
};

export default Hero;