// app/lib/translations/serverTranslate.ts

import type { SerializeFrom } from '@shopify/remix-oxygen';

const translations: Record<string, string> = {
	// About page translations
	'About Us': 'O nama',
	'WE HAVE CANDY': 'IMAMO SLATKIŠE',
	'and you know it': 'i to vam je jasno',
	'SweetChoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.':
		'SweetChoice je jedina kompanija u jugoistočnoj Evropi specijalizovana za uvoz i distribuciju sezonskih konditorskih proizvoda.',
	'You\'ve probably seen our sweets in your local supermarkets and stores right around holiday time.':
		'Verovatno ste videli naše slatkiše u lokalnim supermarketima i prodavnicama tokom praznika.',
	'Talk Business →': 'Razgovarajmo o poslu →',
	'All About': 'Sve o',
	'Holiday Treats': 'Prazničnim poslasticama',
	// Stat translations
	'Year Founded': 'Godina osnivanja',
	'Countries Served': 'Zemalja',
	'Products': 'Proizvoda',
	'Retail Partners': 'Partnera'
};

export function translateData<T>(data: T, locale: string = 'sr'): T {
	if (locale === 'en') return data;

	return transformValue(data) as T;
}

function transformValue(value: any): any {
	if (value == null) return value;

	if (typeof value === 'string') {
		// Handle phrases that might be broken across multiple lines
		const trimmed = value.trim();
		if (translations[trimmed]) {
			return translations[trimmed];
		}
		// Try matching parts of the string
		for (const [key, translation] of Object.entries(translations)) {
			if (trimmed.includes(key)) {
				return trimmed.replace(key, translation);
			}
		}
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(item => transformValue(item));
	}

	if (typeof value === 'object') {
		const transformed: Record<string, any> = {};
		for (const [key, val] of Object.entries(value)) {
			if (key === 'id' || key === 'handle' || key.startsWith('_')) {
				transformed[key] = val;
				continue;
			}
			transformed[key] = transformValue(val);
		}
		return transformed;
	}

	return value;
}

// Simple locale storage helper
export const localeStorage = {
	getLocale: () => {
		if (typeof window === 'undefined') return 'sr';
		return localStorage.getItem('locale') || 'sr';
	},
	setLocale: (locale: string) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('locale', locale);
		}
	}
};