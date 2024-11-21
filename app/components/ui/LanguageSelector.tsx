// app/components/ui/LanguageSelector.tsx

import React from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';

export default function LanguageSelector() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const currentLocale = searchParams.get('locale') || 'sr';

	const toggleLanguage = () => {
		const newLocale = currentLocale === 'sr' ? 'en' : 'sr';
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('locale', newLocale);
		navigate(`?${newSearchParams.toString()}`, { replace: true });
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