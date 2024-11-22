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
	const currentLocale = searchParams.get('locale') || 'sr';

	const toggleLanguage = () => {
		const newLocale = currentLocale === 'sr' ? 'en' : 'sr';
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('locale', newLocale);
		navigate(`?${newSearchParams.toString()}`, { replace: true });
	};

	const baseStyles = "px-3 py-1 bg-white border-2 border-black transition-all duration-200 font-semibold text-lg";

	const variants = {
		default: `rounded-full
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-[2px] active:translate-y-[2px]`,
		footer: `rounded-lg
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
			{currentLocale === 'sr' ? (
				<span className="flex items-center gap-2">
					<span className="text-2xl">🇺🇸</span>
					<span>| Eng</span>
				</span>
			) : (
				<span className="flex items-center gap-2">
					<span className="text-2xl">🇷🇸</span>
					<span>| Srb</span>
				</span>
			)}
		</button>
	);
}