// app/components/ui/NavButtons.tsx

// app/components/ui/NavButtons.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { useContact } from '~/components/contact/ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { useAside } from '~/components/Aside';

const NavButtons = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const contact = useContact();
	const { open: openMenu, close: closeMenu } = useAside();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { t } = useTranslation();

	const [isScrolled, setIsScrolled] = useState(false);
	const currentLocale = searchParams.get('locale') || 'sr';
	const oppositeLocale = currentLocale === 'sr' ? 'en' : 'sr';

	// Safely access contact context properties
	const isContactOpen = contact?.isOpen ?? false;
	const openContact = contact?.openContact ?? (() => { });
	const closeContact = contact?.closeContact ?? (() => { });

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const headerHeight = 100;
			setIsScrolled(scrollPosition > headerHeight);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleLanguage = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('locale', oppositeLocale);
		navigate(`?${newSearchParams.toString()}`, { replace: true });
	};

	const toggleMenu = () => {
		if (isMenuOpen) {
			closeMenu();
			setIsMenuOpen(false);
		} else {
			openMenu('mobile');
			setIsMenuOpen(true);
		}
	};

	const handleContactClick = () => {
		if (isContactOpen) {
			closeContact();
		} else {
			openContact();
		}
	};

	const containerClasses = `fixed z-50 flex items-center gap-2 transition-all duration-300 
    ${isScrolled ? 'top-4 right-4' : 'top-8 right-8 lg:top-12 lg:right-12'}`;

	const activeButton = isContactOpen ? 'contact' : isMenuOpen ? 'menu' : null;

	// If contact context is not available yet, don't render anything
	if (!contact) return null;

	return (
		<div className={containerClasses}>
			{/* Language Button */}
			{!activeButton && (
				<button
					onClick={toggleLanguage}
					className="w-12 h-12 rounded-full bg-white text-black border-2 border-black
                   font-bold text-lg transition-all duration-200
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]
                   flex items-center justify-center"
					aria-label={`Switch to ${oppositeLocale.toUpperCase()}`}
				>
					{currentLocale === 'sr' ? 'SRB' : 'ENG'}
				</button>
			)}

			{/* Menu Button */}
			{activeButton !== 'contact' && (
				<button
					onClick={toggleMenu}
					className={`w-12 h-12 rounded-full border-2 border-black
                   transition-all duration-200
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]
                   flex items-center justify-center
                   ${isMenuOpen ? 'bg-[#FF6B6B] text-black' : 'bg-white text-black'}`}
					aria-label={isMenuOpen ? t('nav.buttons.menu.close') : t('nav.buttons.menu.open')}
				>
					{isMenuOpen ? (
						<span className="text-2xl font-bold">×</span>
					) : (
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					)}
				</button>
			)}

			{/* Contact Button */}
			{activeButton !== 'menu' && (
				<button
					onClick={handleContactClick}
					className={`group h-12 border-2 border-black
                   transition-all duration-300
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]
                   rounded-full flex items-center justify-center
                   ${isContactOpen
							? 'bg-[#FF6B6B] text-black w-12'
							: 'bg-[#FFB6C1] text-black md:w-auto w-12'}`}
					aria-label={isContactOpen ? t('contact.buttons.closeContact') : t('contact.buttons.openContact')}
				>
					{isContactOpen ? (
						<span className="w-12 h-12 flex items-center justify-center text-2xl font-bold">×</span>
					) : (
						<div className="flex items-center">
							<span className="w-12 h-12 flex items-center justify-center text-2xl">
								👋
							</span>
							<span className="pr-4 w-24 text-lg font-semibold hidden md:inline whitespace-nowrap">
								{t('contact.buttons.talkBiz')}
							</span>
						</div>
					)}
				</button>
			)}
		</div>
	);
};

export default NavButtons;