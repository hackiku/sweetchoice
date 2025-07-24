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
				className="absolute inset-0 mt-[20vh] mb-8  bg-gradient-to-b from-transparent to-[#FFE135]"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px',
					backgroundPosition: '0 0',
					maskImage: 'linear-gradient(to top, black 25%, transparent)',
					WebkitMaskImage: 'linear-gradient(to top, black 25%, transparent)',
					zIndex: 1
				}}>
			</div>

			{/* Mobile/Small: Two-line layout */}
			<div className="lg:hidden relative" style={{ zIndex: 10 }}>
				{/* Content above */}
				<div className="px-6 sm:px-8 pt-8 pb-6">
					<h1 className="text-[12vw] sm:text-[9.5vw] ssmd:text-[12vw] font-bold leading-tight mb-6 uppercase text-orange-400"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						{t('home.hero.headingTop')} <br />
						{t('home.hero.headingBottom')}
					</h1>

					<p className="text-[4.5vw] sm:text-[4vw] md:text-[3vw] font-bold leading-tight mb-6 max-w-3xl">
						{t('home.hero.subheading')}
					</p>

					<div className="flex gap-4 items-center">
						<ContactButton
							onClick={openContact}
							text={t('home.hero.ctaText')}
							bgColor="bg-orange-500"
							hoverBgColor="hover:bg-black"
							hoverTextColor="hover:text-white"
							className="text-[3.5vw] sm:text-[3vw] font-bold px-[4vw] py-[2vw] w-full sm:w-auto"
						/>
						<ShopButton
							size="medium"
							className="w-[12vw] h-[12vw] sm:w-14 sm:h-14"
						/>
					</div>
				</div>

				{/* Assets below - scaled down by default */}
				<div className="px-6 sm:px-8 mb-2" style={{ zIndex: 5 }}>
					<div className="relative flex justify-center -gap-4 -mt-6  sm:-mt-[15vh] md:-mt-[20vh] sm:-mr-[30vw]">
					{/* <div className="absolute top-16 right-20 " style={{ zIndex: 5 }}> */}
						<div className="mt-44">
							<PolaroidPicture
								imageSrc="/assets/images/palette-4.jpeg"
								caption="🎄 '23"
								rotation="-rotate-6"
								size="small"
							/>
						</div>
						<div className="mt-20">
							<SmartphoneWrapper
								imageSrc="/assets/images/palette-5.jpeg"
								rotation="rotate-6"
								size="small"
							/>
						</div>
					</div>
				</div>

				{/* Logos below */}
				<div className="relative" style={{ zIndex: 20 }}>
					<LogoMarquee />
				</div>
			</div>

			{/* Desktop: Overlapping layout */}
			<div className="hidden lg:block relative min-h-[85vh]" style={{ zIndex: 10 }}>
				{/* Media positioned flush right */}
				<div className="absolute top-24 right-20 " style={{ zIndex: 5 }}>
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
						<div className="absolute -bottom-0 right-[90%]" style={{ zIndex: 6 }}>
							<PolaroidPicture
								imageSrc="/assets/images/palette-4.jpeg"
								caption="🎄 '23"
								rotation="-rotate-12"
								size="medium"
							/>
						</div>
					</div>
				</div>

				{/* Text content - dominates the space, can overlap media */}
				<div className="relative max-w-none px-12 pt-8 pb-20" style={{ zIndex: 15 }}>
					<h1 className="text-[8vw] lg:text-[8vw] xl:text-[8vw] 
									font-bold leading-[1.1] mb-8 uppercase text-orange-400 
									max-w-[80vw] lg:max-w-[80vw]"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						{t('home.hero.headingTop')} <br />
						{t('home.hero.headingBottom')}
					</h1>

					<p className="text-[3vw] lg:text-[2.5vw] xl:text-[2vw] 
									font-bold leading-tight mb-8 max-w-[60vw] lg:max-w-[50vw]">
						{t('home.hero.subheading')}
					</p>

					<div className="flex gap-4 items-center">
						<ContactButton
							onClick={openContact}
							text={t('home.hero.ctaText')}
							bgColor="bg-orange-500"
							hoverBgColor="hover:bg-pink-500"
							hoverTextColor="hover:text-black"
						/>
						<ShopButton
							size="large"
						/>
					</div>
				</div>

				{/* Logo Marquee - positioned higher so bottom line is visible */}
				<div className="absolute bottom-8 left-0 right-0" style={{ zIndex: 20 }}>
					<LogoMarquee />
				</div>
			</div>
		</section>
	);
};

export default Hero;