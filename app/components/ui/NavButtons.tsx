// app/components/ui/NavButtons.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { useContact } from '~/components/contact/ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { useAside } from '~/components/Aside';

const NavButtons = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { isOpen: isContactOpen, openContact, closeContact } = useContact();
	const { open: openMenu, close: closeMenu } = useAside();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Get both translation namespaces
	const { t: tNav } = useTranslation('nav');
	const { t: tContact } = useTranslation('contact');

	const [isScrolled, setIsScrolled] = useState(false);
	const currentLocale = searchParams.get('locale') || 'sr';
	const oppositeLocale = currentLocale === 'sr' ? 'en' : 'sr';

	// Handle scroll behavior
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

	const containerClasses = `fixed z-[9999] flex items-center gap-2 transition-all duration-300 
    ${isScrolled ? 'top-4 right-4' : 'top-8 right-8 lg:top-12 lg:right-12'}`;

	// Determine which button is active (if any)
	const activeButton = isContactOpen ? 'contact' : isMenuOpen ? 'menu' : null;

	return (
		<div className={containerClasses}>
			{/* Language Switcher - Hidden when any button is active */}
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
					aria-label={tNav('buttons.language.' + oppositeLocale)}
				>
					{tNav('buttons.language.' + oppositeLocale)}
				</button>
			)}

			{/* Menu Button - Hidden when contact is active */}
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
                   ${isMenuOpen
							? 'bg-[#FF6B6B] text-black'
							: 'bg-white text-black'}`}
					aria-label={isMenuOpen ? tNav('buttons.menu.close') : tNav('buttons.menu.open')}
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

			{/* Contact Button - Hidden when menu is active */}
			{activeButton !== 'menu' && (
				<button
					onClick={isContactOpen ? closeContact : openContact}
					className={`group h-12 border-2 border-black
                   transition-all duration-300
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]
                   rounded-full
                   flex items-center justify-center
                   ${isContactOpen
							? 'bg-[#FF6B6B] text-black w-12'
							: 'bg-[#FFB6C1] text-black md:w-auto w-12'}`}
					aria-label={isContactOpen ? tContact('buttons.closeContact') : tContact('buttons.openContact')}
				>
					<span className="flex items-center">
						{isContactOpen ? (
							<span className="w-12 h-12 flex items-center justify-center text-2xl font-bold">×</span>
						) : (
							<>
								<span className="w-12 h-12 flex items-center justify-center text-2xl">
									👋
								</span>
								<span className="pr-4 hidden md:inline origin-left transform transition-all duration-300">
									{tContact('buttons.talkBiz')}
								</span>
							</>
						)}
					</span>
				</button>
			)}
		</div>
	);
};

export default NavButtons;