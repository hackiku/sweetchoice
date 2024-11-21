// app/lib/translations/serverTransform.ts

import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

const translations: Record<string, string> = {
	// Keep your English content exactly as it appears in components
	'About Us': 'O nama',
	'WE HAVE CANDY': 'IMAMO SLATKIŠE',
	'(and you know it)': '(i to vam je jasno)',
	'SweetChoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.':
		'SweetChoice je jedina kompanija u jugoistočnoj Evropi specijalizovana za uvoz i distribuciju sezonskih konditorskih proizvoda.',
	'You\'ve probably seen our sweets in your local supermarkets and stores right around holiday time.':
		'Verovatno ste videli naše slatkiše u lokalnim supermarketima i prodavnicama tokom praznika.',
	'Talk Business →': 'Razgovarajmo o poslu →',
	'All About': 'Sve o',
	'Holiday Treats': 'Prazničnim poslasticama',
};

// This gets added to your root.tsx
export function createTransformStream(locale: string) {
	if (locale === 'en') return new TransformStream();

	return new TransformStream({
		transform(chunk, controller) {
			let html = chunk.toString();

			// Replace all occurrences of English text with Serbian
			Object.entries(translations).forEach(([en, sr]) => {
				// Use regex to match exact phrases, being careful with special characters
				const safeEn = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const regex = new RegExp(safeEn, 'g');
				html = html.replace(regex, sr);
			});

			controller.enqueue(new TextEncoder().encode(html));
		},
	});
}