// app/components/pages/landing/Hero.tsx
import React from 'react';
import ContactButton from '~/components/cta/contact/ContactButton';
import ShopButton from '~/components/cta/buy/ShopButton';
import LogoMarquee from '~/components/proof/LogoMarquee';
import SmartphoneWrapper from '~/components/ui/media/SmartphoneWrapper';
import PolaroidPicture from '~/components/ui/media/PolaroidPicture';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from '~/components/cta/contact/ContactContext';

const Hero: React.FC = () => {
	const { t } = useTranslation();
	const { openContact } = useContact();

	return (
		<section className="relative min-h-[85vh] overflow-hidden" style={{ zIndex: 1 }}>
			{/* Background gradient with dot pattern */}
			<div
				className="absolute inset-0 bg-gradient-to-b from-[#FFE135] to-transparent"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px',
					backgroundPosition: '0 0',
					maskImage: 'linear-gradient(to bottom, black 75%, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent)',
					zIndex: 1
				}}>
			</div>

			{/* Main content container */}
			<div className="relative px-6 sm:px-8 md:px-12 pt-8 pb-20" style={{ zIndex: 10 }}>

				{/* Media positioned flush right - behind text */}
				<div className="absolute top-16 right-6 sm:right-8 md:right-20" style={{ zIndex: 5 }}>
					{/* Desktop: overlapping layout */}
					<div className="hidden md:block">
						<div className="relative">
							{/* Smartphone - primary position */}
							<div className="relative" style={{ zIndex: 7 }}>
								<SmartphoneWrapper
									imageSrc="/assets/images/palette-5.jpeg"
									rotation="rotate-12"
									size="medium"
								/>
							</div>

							{/* Polaroid - overlapping behind and to the left */}
							<div className="absolute bottom-4 right-[90%]" style={{ zIndex: 6 }}>
								<PolaroidPicture
									imageSrc="/assets/images/palette-4.jpeg"
									caption="🎄 '23"
									rotation="-rotate-12"
									size="medium"
								/>
							</div>
						</div>
					</div>

					{/* Mobile/Tablet: stacked flush right */}
					<div className="md:hidden">
						<div className="space-y-4">
							<SmartphoneWrapper
								imageSrc="/assets/images/palette-11.jpeg"
								rotation="rotate-6"
								size="small"
							/>
							<PolaroidPicture
								imageSrc="/assets/images/palette-4.jpeg"
								caption="Sweet Choice"
								rotation="-rotate-6"
								size="small"
							/>
						</div>
					</div>
				</div>

				{/* Text content - dominates the space, can overlap media */}
				<div className="relative max-w-none" style={{ zIndex: 15 }}>
					<h1 className="text-[15vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[8vw] xl:text-[8vw] 
									font-bold md:leading-[1.1] mb-8 uppercase text-orange-400 
									max-w-[90vw] md:max-w-[80vw] lg:max-w-[80vw]"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						{t('home.hero.headingTop')} <br />
						{t('home.hero.headingBottom')}
					</h1>

					{/* Subheading */}
					<p className="text-[4.5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw] 
									font-bold leading-tight mb-8 max-w-[90vw] md:max-w-[60vw] lg:max-w-[50vw]">
						{t('home.hero.subheading')}
					</p>

					{/* Buttons - always in a row */}
					<div className="flex gap-4 items-center">
						<ContactButton
							onClick={openContact}
							text={t('home.hero.ctaText')}
							bgColor="bg-orange-500"
							hoverBgColor="hover:bg-black"
							hoverTextColor="hover:text-white"
							className="text-[3.5vw] sm:text-[3vw] md:text-[2vw] lg:text-xl font-bold px-[4vw] md:px-8 py-[2vw] md:py-4 w-full sm:w-auto"
						/>
						<ShopButton
							size="large"
							className="w-[12vw] h-[12vw] md:w-16 md:h-16 self-start sm:self-auto"
						/>
					</div>
				</div>
			</div>

			{/* Logo Marquee - overlaps the media */}
			<div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 20 }}>
				<LogoMarquee />
			</div>
		</section>
	);
};

export default Hero;