// lib/i18n.ts
import type { I18nLocale } from '@shopify/hydrogen';
import { useLocale } from '@shopify/hydrogen';

const translations = {
	en: {
		about: {
			title: 'About Us',
			heading: 'WE HAVE CANDY',
			subheading: '(and you know it)',
			description: 'SweetChoice is the only...'
		}
	},
	sr: {
		about: {
			title: 'O Nama',
			heading: 'IMAMO SLATKIŠE',
			subheading: '(i to vam je jasno)',
			description: 'SweetChoice je jedina...'
		}
	}
} as const;

export function useTranslation() {
	const locale = useLocale();
	return {
		t: (key: string) => translations[locale.language][key] || key,
		locale: locale.language
	};
}