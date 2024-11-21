// app/lib/i18n/TranslationContext.tsx

import React, { createContext, useContext } from 'react';
import { translations } from './index';
import type { Language } from './useTranslation';

type TranslationContextType = {
	t: (key: string) => string;
	locale: Language;
	changeLocale: (newLocale: Language) => void;
};

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
	children,
	initialLocale = 'en'
}: {
	children: React.ReactNode;
	initialLocale?: Language;
}) {
	const [locale, setLocale] = React.useState<Language>(initialLocale);

	const t = React.useCallback((path: string) => {
		return path.split('.').reduce((obj, key) => {
			if (obj === undefined) return path;
			return obj[key as keyof typeof obj];
		}, translations[locale] as any) ?? path;
	}, [locale]);

	const changeLocale = React.useCallback((newLocale: Language) => {
		setLocale(newLocale);
	}, []);

	return (
		<TranslationContext.Provider value= {{ t, locale, changeLocale }
}>
	{ children }
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