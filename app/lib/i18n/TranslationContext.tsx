// app/lib/i18n/TranslationContext.tsx

import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from './index';

type TranslationContextType = {
	t: (key: string) => string;
	locale: Language;
	changeLocale: (newLocale: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
	children,
	initialLocale = 'sr'
}: {
	children: React.ReactNode;
	initialLocale: Language;
}) {
	const [locale, setLocale] = useState<Language>(initialLocale);

	const t = (key: string) => {
		return key.split('.').reduce((obj, k) => obj && obj[k as keyof typeof obj], translations[locale]) as string || key;
	};

	const changeLocale = (newLocale: Language) => {
		setLocale(newLocale);
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
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
		throw new Error('useTranslation must be used within TranslationProvider');
	}
	return context;
}

