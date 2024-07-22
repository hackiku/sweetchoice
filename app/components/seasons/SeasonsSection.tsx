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
				<section id={season.id} key={season.id} className={`season-card ${season.className}`}>
					<Eyebrow title={season.title} />
					<h2>{season.title}</h2>
					<p>{season.description}</p>
					<div className="products-grid">
						{mockProducts.map((product) => (
							<Link key={product.id} className="product-item" to={`/products/${product.handle}`}>
								<Image data={product.images.nodes[0]} aspectRatio="1/1" sizes="(min-width: 45em) 20vw, 50vw" />
								<h4>{product.title}</h4>
								<small>
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
