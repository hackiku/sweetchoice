// app/lib/translations/serverTransform.ts

export const translations: Record<string, string> = {
	// Hero Section
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

	// Headers and sections
	'All About': 'Sve o',
	'Holiday Treats': 'Prazničnim poslasticama',
	'Loading...': 'Učitavanje...',
};

export function createTransformStream(locale: string) {
	if (locale === 'en') return new TransformStream();

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	return new TransformStream({
		transform(chunk, controller) {
			let html = decoder.decode(chunk);

			// First, handle exact matches
			Object.entries(translations).forEach(([en, sr]) => {
				const safeEn = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const regex = new RegExp(`(>|"|\\'|\\s)${safeEn}(<|"|\\'|\\s)`, 'g');
				html = html.replace(regex, `$1${sr}$2`);
			});

			controller.enqueue(encoder.encode(html));
		},
	});
}