// app/components/ui/Hero.tsx
import React from 'react';
import { Link } from '@remix-run/react';
import ContactButton from './ContactButton';
import LogoMarquee from './LogoMarquee';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from '~/components/contact/ContactContext';

const Hero: React.FC = () => {
	const { t } = useTranslation();
	const { openContact } = useContact();

	return (
		<section className="relative h-[calc(85vh-5rem)] flex flex-col justify-between overflow-hidden border-t-4 border-black">
			{/* Background gradient with dot pattern */}
			<div className="absolute inset-0 z-0 bg-gradient-to-b from-[#00A86B] to-transparent"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px), linear-gradient(to bottom, #00A86B, transparent)',
					backgroundSize: '20px 20px, 100% 100%',
					backgroundPosition: '0 0, 0 0',
					maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
				}}>
			</div>

			<div className="flex-grow flex mt-8 flex-col justify-start relative z-10 px-6 sm:px-8 md:px-12">
				<div className="w-full">
					<h1 className="text-[14vw] sm:text-[10vw] md:text-[10vw] font-bold leading-tight mb-6 uppercase text-orange-400 w-full"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						{t('home.hero.headingTop')} <br />
						{t('home.hero.headingBottom')}
					</h1>

					{/* Desktop: inline layout, Mobile: stacked */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<p className="text-xl sm:text-2xl font-bold max-w-lg">
							{t('home.hero.subheading')}
						</p>

						<div className="flex gap-4 w-full md:w-auto">
							<ContactButton
								onClick={openContact}
								text={t('home.hero.ctaText')}
								bgColor="bg-orange-500"
								hoverBgColor="hover:bg-black"
								hoverTextColor="hover:text-white"
								className="flex-1 sm:flex-none _lg:w-48 text-xl h-14"
							/>
							<Link
								to="/collections/all"
								className="w-14 h-14 flex-shrink-0 text-xl font-semibold border-2 border-black bg-white hover:bg-[#d71e97]
                text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                transition-all duration-200 flex items-center justify-center
                rounded-full aspect-square"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="8" cy="21" r="1" />
									<circle cx="19" cy="21" r="1" />
									<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Logo Marquee - Rotated and positioned */}
			<div className="absolute -mx-4 z-0 -rotate-6 top-[45%] w-[calc(100vw+2rem)]">
				<LogoMarquee />
			</div>
		</section>
	);
};

export default Hero;