// lib/i18n/useTranslation.ts
import { useLocation } from '@remix-run/react';
import { translations, type Translations, type Language } from './translations';

type TranslationKey = keyof Translations[Language];

export function useTranslation() {
	const location = useLocation();
	const locale = new URLSearchParams(location.search).get('locale') as Language || 'en';

	function t(path: string) {
		return path.split('.').reduce((obj, key) => obj?.[key], translations[locale]) || path;
	}

	return { t, locale };
}