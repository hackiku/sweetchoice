// app/components/navigation/NavButtons.tsx

import { useEffect, useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useContact } from '~/components/cta/contact/ContactContext';
import { useMenu } from './MenuContext';
import { useTranslation } from '~/lib/i18n/useTranslation';
import LanguageButton from '~/components/ui/LanguageButton';

const NavButtons = () => {
	const { t } = useTranslation();
	const [shake, setShake] = useState(false);

	// Contact context
	const {
		isOpen: isContactOpen,
		openContact,
		closeContact,
		selectedProducts
	} = useContact();

	// Menu context
	const {
		isOpen: isMenuOpen,
		openMenu,
		closeMenu,
		isScrolled
	} = useMenu();

	// Shake animation when product is added
	useEffect(() => {
		if (selectedProducts.length > 0) {
			setShake(true);
			const timer = setTimeout(() => setShake(false), 500);
			return () => clearTimeout(timer);
		}
	}, [selectedProducts.length]);

	const handleContactClick = () => {
		if (isContactOpen) {
			closeContact();
		} else {
			if (isMenuOpen) closeMenu();
			openContact();
		}
	};

	useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
      20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }
  `;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);



	const handleMenuClick = () => {
		if (isMenuOpen) {
			closeMenu();
		} else {
			if (isContactOpen) closeContact();
			openMenu();
		}
	};

	const containerClasses = `fixed z-[101] flex items-center gap-2 transition-all duration-300 
  ${isScrolled ? 'top-2 right-2' : 'top-8 right-8'}`;

	const activeButton = isContactOpen ? 'contact' : isMenuOpen ? 'menu' : null;

	return (
		<div className={containerClasses}>
			{/* Language Button */}
			{!activeButton && (
				<LanguageButton variant="minimal" />
			)}

			{/* Menu Button */}
			{activeButton !== 'contact' && (
				<button
					onClick={handleMenuClick}
					className={`w-12 h-12 md:mr-2 rounded-full border-2 border-black
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

			{/* Contact Button with Shake Animation */}
			{activeButton !== 'menu' && (
				<button
					onClick={handleContactClick}
					className={`group h-12 border-2 border-black
                   transition-all duration-300
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]
                   rounded-full md:rounded-lg flex items-center justify-center
                   ${isContactOpen
							? 'bg-[#FF5A1F] text-black w-12'
							: 'bg-[#FF5A1F] text-black w-12 md:w-auto pl-2 pr-4 '}
                   ${shake ? 'animate-shake' : ''}`}
					aria-label={isContactOpen ? t('contact.buttons.closeContact') : t('contact.buttons.openContact')}
				>
					{isContactOpen ? (
						<span className="w-12 h-12 flex items-center justify-center text-2xl font-bold">×</span>
					) : (
						<div className="flex items-center gap-2">
							<span className="w-12 h-12 flex items-center justify-center text-2xl relative">
								<EnvelopeIcon className="h-6" />
								{selectedProducts.length > 0 && (
									<span className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
										{selectedProducts.length}
									</span>
								)}
							</span>
							<span className="-ml-4 w-28 text-lg font-semibold hidden md:inline whitespace-nowrap">
								{t('contact.buttons.talkBiz')}
							</span>
						</div>
					)}
				</button>
			)}

			{/* Add shake animation CSS */}
			{/* <style jsx>{`
				@keyframes shake {
					0%, 100% { transform: translateX(0); }
					10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
					20%, 40%, 60%, 80% { transform: translateX(2px); }
				}
				
				.animate-shake {
					animation: shake 0.5s ease-in-out;
				}
			`}</style> */}
		</div>
	);
};

export default NavButtons;