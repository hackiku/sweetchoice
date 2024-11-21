// app/components/ui/LanguageSelector.tsx

import React from 'react';

export default function LanguageSelector() {
	const [currentLocale, setCurrentLocale] = React.useState(() =>
		typeof window !== 'undefined' ? localStorage.getItem('locale') || 'sr' : 'sr'
	);

	const toggleLanguage = () => {
		const newLocale = currentLocale === 'sr' ? 'en' : 'sr';
		localStorage.setItem('locale', newLocale);
		setCurrentLocale(newLocale);

		// Refresh the page to get new translations
		window.location.reload();
	};

	return (
		<button
			onClick={toggleLanguage}
			className="fixed top-4 right-4 z-50 
                 bg-black text-white 
                 w-12 h-12 rounded-full 
                 border-4 border-white
                 font-bold text-lg
                 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]
                 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]
                 hover:bg-white hover:text-black hover:border-black 
                 transition-all duration-200
                 flex items-center justify-center"
		>
			{currentLocale === 'sr' ? 'EN' : 'SR'}
		</button>
	);
}