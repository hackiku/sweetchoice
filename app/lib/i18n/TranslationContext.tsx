// app/lib/i18n/TranslationContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './index';
import { useNavigate, useSearchParams } from '@remix-run/react';

type TranslationContextType = {
	t: (key: string) => string;
	locale: Language;
	changeLocale: (newLocale: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
	children,
	initialLocale = 'sr', // Keep a fallback default
}: {
	children: React.ReactNode;
	initialLocale: Language; // Accept the server-determined locale as a prop
}) {
	// THE FIX: Initialize the state with the `initialLocale` from the server.
	// This makes the client's first render match the server's render.
	const [locale, setLocale] = useState<Language>(initialLocale);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	// When the initialLocale from the server changes (e.g., user navigates with a ?locale param),
	// update the state to match.
	useEffect(() => {
		setLocale(initialLocale);
	}, [initialLocale]);

	const t = (key: string) => {
		return (
			key
				.split('.')
				.reduce(
					(obj, k) => obj && obj[k as keyof typeof obj],
					translations[locale],
				) as string
		) || key;
	};

	const changeLocale = (newLocale: Language) => {
		setLocale(newLocale);
		// This logic correctly updates the cookie and URL for subsequent navigation
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year

		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('locale', newLocale);
		navigate(`?${newSearchParams.toString()}`, { replace: true });
	};

	return (
		<TranslationContext.Provider value={{ t, locale, changeLocale }}>
			{children}
		</TranslationContext.Provider>
	);
}

export function useTranslation() {
	const context = useContext(TranslationContext);
	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider');
	}
	return context;
}