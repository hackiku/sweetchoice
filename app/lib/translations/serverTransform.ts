// app/lib/translations/serverTransform.ts

import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export const translations: Record<string, string> = {
	// Page title and hero section
	'About us | SweetChoice': 'O nama | SweetChoice',
	'About Us': 'O nama',
	'WE HAVE CANDY': 'IMAMO SLATKIŠE',
	'and you know it': 'i to vam je jasno',

	// Main content
	'SweetChoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.':
		'SweetChoice je jedina kompanija u jugoistočnoj Evropi specijalizovana za uvoz i distribuciju sezonskih konditorskih proizvoda.',
	'You\'ve probably seen our sweets in your local supermarkets and stores right around holiday time.':
		'Verovatno ste videli naše slatkiše u lokalnim supermarketima i prodavnicama tokom praznika.',
	'Talk Business →': 'Razgovarajmo o poslu →',

	// Product section
	'All About': 'Sve o',
	'Holiday Treats': 'Prazničnim poslasticama',
	'Loading...': 'Učitavanje...',

	// Stats section
	'Year Founded': 'Godina osnivanja',
	'Countries Served': 'Zemalja',
	'Products': 'Proizvoda',
	'Retail Partners': 'Partnera',
	'All Around Southeast Europe': 'Širom Jugoistočne Evrope',

	// UI elements
	'Previous': 'Prethodno',
	'Next': 'Sledeće',
	'Close': 'Zatvori',
	'Loading cart ...': 'Učitavanje korpe ...',
};

export function createTransformStream(locale: string) {
	if (locale === 'en') return new TransformStream();

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	return new TransformStream({
		transform(chunk, controller) {
			let html = decoder.decode(chunk);

			Object.entries(translations).forEach(([en, sr]) => {
				// Escape special regex characters in the English text
				const safeEn = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const regex = new RegExp(safeEn, 'g');
				html = html.replace(regex, sr);
			});

			controller.enqueue(encoder.encode(html));
		},
	});
}