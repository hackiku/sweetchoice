// app/components/seasons/SeasonsSection.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import Eyebrow from '~/components/ui/Eyebrow';
import { Image, Money } from '@shopify/hydrogen';

const seasons = [
	{ id: 'spring', title: "Saint Valentine's", description: "Sweet love's in the air.", className: 'spring' },
	{ id: 'summer', title: 'Summer', description: 'Summer treats and sweets.', className: 'summer' },
	{ id: 'autumn', title: 'Autumn', description: 'Autumn treats and sweets.', className: 'autumn' },
	{ id: 'winter', title: 'Christmas & New Year', description: 'Winter treats and sweets.', className: 'winter' },
];

const mockProducts = [
	{
		id: '1',
		title: 'Sample Product 1',
		handle: 'sample-product-1',
		priceRange: { minVariantPrice: { amount: '10.00', currencyCode: 'USD' } },
		images: { nodes: [{ id: 'img1', url: 'https://placehold.co/600x400', altText: 'Sample Image 1', width: 500, height: 500 }] },
	},
	{
		id: '2',
		title: 'Sample Product 2',
		handle: 'sample-product-2',
		priceRange: { minVariantPrice: { amount: '20.00', currencyCode: 'USD' } },
		images: { nodes: [{ id: 'img2', url: 'https://placehold.co/600x400', altText: 'Sample Image 2', width: 500, height: 500 }] },
	},
];

const SeasonsSection = () => {
	return (
		<>
			{seasons.map((season) => (
				<section id={season.id} key={season.id} className={`relative h-[60vh] rounded-none my-8 mx-[-2rem] py-16 px-16 overflow-hidden z-1 ${season.className}`}>
					<Eyebrow title={season.title} />
					<h2 className="mt-2 text-2xl font-bold">{season.title}</h2>
					<p className="mt-1 text-lg text-gray-700">{season.description}</p>
					<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mb-8">
						{mockProducts.map((product) => (
							<Link key={product.id} className="text-center" to={`/products/${product.handle}`}>
								<Image data={product.images.nodes[0]} className="w-full h-auto" aspectRatio="1/1" sizes="(min-width: 45em) 20vw, 50vw" />
								<h4 className="mt-2 text-lg font-medium">{product.title}</h4>
								<small className="text-gray-500">
									<Money data={product.priceRange.minVariantPrice} />
								</small>
							</Link>
						))}
					</div>
				</section>
			))}
		</>
	);
};

export default SeasonsSection;
