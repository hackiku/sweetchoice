// app/components/ui/LanguageButton.tsx

import React from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface LanguageButtonProps {
	variant?: 'minimal' | 'full';
	className?: string;
}

export default function LanguageButton({ variant = 'minimal', className = '' }: LanguageButtonProps) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { locale: currentLocale } = useTranslation(); // Use actual locale from hook
	const oppositeLocale = currentLocale === 'sr' ? 'en' : 'sr';

	const toggleLanguage = () => {
		// Cookie strategy with clean URLs
		document.cookie = `locale=${oppositeLocale}; path=/; max-age=31536000`;

		// Clean URL approach - remove locale=en param
		if (oppositeLocale === 'en') {
			// Remove locale param entirely for English (default)
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.delete('locale');
			const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
			navigate(newUrl, { replace: true });
		} else {
			// Add locale param for Serbian
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set('locale', oppositeLocale);
			navigate(`?${newSearchParams.toString()}`, { replace: true });
		}
	};

	const baseStyles = `
		bg-white text-black border-2 border-black font-bold transition-all duration-200
		shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
		hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
		active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
		active:translate-x-[2px] active:translate-y-[2px]
		flex items-center justify-center
	`;

	if (variant === 'minimal') {
		return (
			<button
				onClick={toggleLanguage}
				className={`
					${baseStyles}
					w-12 h-12 rounded-full text-lg
					${className}
				`}
				aria-label={`Switch to ${oppositeLocale.toUpperCase()}`}
			>
				{currentLocale === 'sr' ? (
					// <img src="/assets/flags/rs.svg" alt="Switch to English" className="w-full h-full" />
					<span>SR</span>
				) : (
					// <img src="/assets/flags/gb.svg" alt="Switch to Serbian" className="w-full h-full" />
					<span>EN</span>
				)}
			</button>
		);
	}

	// Full variant with text
	return (
		<button
			onClick={toggleLanguage}
			className={`
				${baseStyles}
				h-12 px-4 rounded-full
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