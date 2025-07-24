// lib/i18n/useTranslation.ts
import { useLocation } from '@remix-run/react';
import { translations } from './index';

export type Language = 'en' | 'sr';
type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
	? `${Key}${'.'}${NestedKeyOf<ObjectType[Key]>}`
	: `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof translations.en>;

// Helper to get cookie value
function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
	return null;
}

export function useTranslation() {
	const location = useLocation();

	// Priority: URL param > Cookie > Default 'en'
	const urlLocale = new URLSearchParams(location.search).get('locale') as Language;
	const cookieLocale = getCookie('locale') as Language;
	const locale = urlLocale || cookieLocale || 'en';

	function t(path: string) {
		return path.split('.').reduce((obj, key) => {
			if (obj === undefined) return path;
			return obj[key as keyof typeof obj];
		}, translations[locale] as any) ?? path;
	}

	return { t, locale };
}