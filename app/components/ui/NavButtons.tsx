// app/components/ui/NavButtons.tsx

import React from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { useContact } from '~/components/contact/ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { useAside } from '~/components/Aside';

const NavButtons = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { isOpen, openContact, closeContact } = useContact();
	const { open: openMenu } = useAside();
	const { t } = useTranslation();

	const currentLocale = searchParams.get('locale') || 'sr';
	const oppositeLocale = currentLocale === 'sr' ? 'en' : 'sr';

	const toggleLanguage = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('locale', oppositeLocale);
		navigate(`?${newSearchParams.toString()}`, { replace: true });
	};

	return (
		<div className="fixed top-4 right-4 z-50 flex items-center gap-2">
			{/* Language Switcher */}
			<button
				onClick={toggleLanguage}
				className="w-12 h-12 rounded-full bg-white text-black border-2 border-black
                 font-bold text-lg transition-all duration-200
                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-[2px] active:translate-y-[2px]
                 flex items-center justify-center"
			>
				{oppositeLocale.toUpperCase()}
			</button>

			{/* Menu Button */}
			<button
				onClick={() => openMenu('mobile')}
				className="w-12 h-12 rounded-full bg-white text-black border-2 border-black
                 transition-all duration-200
                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-[2px] active:translate-y-[2px]
                 flex items-center justify-center"
				aria-label="Menu"
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

			{/* Contact Button */}
			<button
				onClick={isOpen ? closeContact : openContact}
				className="group h-12 bg-[#FFB6C1] text-black border-2 border-black
                 transition-all duration-300
                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-[2px] active:translate-y-[2px]
                 rounded-full
                 flex items-center justify-center
                 md:w-auto w-12"
			>
				<span className="flex items-center">
					<span className="w-12 h-12 flex items-center justify-center text-2xl">
						👋
					</span>
					<span className="pr-4 hidden md:inline origin-left transform transition-all duration-300">
						{t('common.talkBiz')}
					</span>
				</span>
			</button>
		</div>
	);
};

export default NavButtons;