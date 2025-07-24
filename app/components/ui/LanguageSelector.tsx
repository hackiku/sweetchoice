// app/components/ui/LanguageSelector.tsx

import React from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';

interface LanguageSelectorProps {
	className?: string;
	variant?: 'default' | 'footer';
}

export default function LanguageSelector({ className = '', variant = 'default' }: LanguageSelectorProps) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const currentLocale = searchParams.get('locale') || 'en'; // Fixed: default to 'en'

	// const toggleLanguage = () => {
	// 	const newLocale = currentLocale === 'en' ? 'sr' : 'en';
	// 	const newSearchParams = new URLSearchParams(searchParams);
	// 	newSearchParams.set('locale', newLocale);
	// 	navigate(`?${newSearchParams.toString()}`, { replace: true });
	// };

	const toggleLanguage = () => {
		const newLocale = currentLocale === 'en' ? 'sr' : 'en';
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
		window.location.search = newLocale === 'en' ? '' : `?locale=${newLocale}`;
	};

	const baseStyles = "bg-white border-2 border-black transition-all duration-200 font-semibold text-lg flex items-center justify-center";

	const variants = {
		default: `rounded-full
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-[2px] active:translate-y-[2px]`,
		footer: `rounded-full h-12 px-4
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-[2px] active:translate-y-[2px]`
	};

	return (
		<button
			onClick={toggleLanguage}
			className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
		>
			<div className="flex items-center gap-2">
				{currentLocale === 'en' ? (
					<>
						<img src="/assets/flags/gb.svg" alt="English" className="w-6 h-6" />
						<span>English</span>
					</>
				) : (
					<>
						<img src="/assets/flags/rs.svg" alt="Srpski" className="w-6 h-6" />
						<span>Srpski</span>
					</>
				)}
			</div>
		</button>
	);
}