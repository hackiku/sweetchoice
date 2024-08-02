// app/components/seasons/SeasonsSection.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import ProductCard from '~/components/ecom/ProductCard';
import { useVariantUrl } from '~/lib/variants';

const seasons = [
	{ id: 'winter', title: 'Christmas & New Year', description: 'Winter treats and sweets.', className: 'bg-[#00BFFF] bg-opacity-30' },
	{ id: 'spring', title: "Valentine's day", description: "Sweet love's in the air.", className: 'bg-[#98FB98] bg-opacity-30' },
	{ id: 'summer', title: 'Summer', description: 'Summer treats and sweets.', className: 'bg-[#FFD700] bg-opacity-30' },
	{ id: 'autumn', title: 'Autumn', description: 'Autumn treats and sweets.', className: 'bg-[#FF8C00] bg-opacity-30' },
];

const fakeProducts = [
	{
		id: '1',
		title: 'Sample Product 1',
		handle: 'sample-product-1',
		priceRange: { minVariantPrice: { amount: '10.00', currencyCode: 'USD' } },
		featuredImage: {
			url: 'https://placehold.co/600x400',
			altText: 'Sample Product 1',
		},
		variants: { nodes: [{ selectedOptions: [{ name: 'Color', value: 'Red' }] }] },
	},
	{
		id: '2',
		title: 'Sample Product 2',
		handle: 'sample-product-2',
		priceRange: { minVariantPrice: { amount: '20.00', currencyCode: 'USD' } },
		featuredImage: {
			url: 'https://placehold.co/600x400',
			altText: 'Sample Product 2',
		},
		variants: { nodes: [{ selectedOptions: [{ name: 'Size', value: 'M' }] }] },
	},
	{
		id: '3',
		title: 'Sample Product 3',
		handle: 'sample-product-3',
		priceRange: { minVariantPrice: { amount: '30.00', currencyCode: 'USD' } },
		featuredImage: {
			url: 'https://placehold.co/600x400',
			altText: 'Sample Product 3',
		},
		variants: { nodes: [{ selectedOptions: [{ name: 'Material', value: 'Cotton' }] }] },
	},
	{
		id: '4',
		title: 'Sample Product 4',
		handle: 'sample-product-4',
		priceRange: { minVariantPrice: { amount: '40.00', currencyCode: 'USD' } },
		featuredImage: {
			url: 'https://placehold.co/600x400',
			altText: 'Sample Product 4',
		},
		variants: { nodes: [{ selectedOptions: [{ name: 'Pattern', value: 'Striped' }] }] },
	},
];

const SeasonsSection = () => {
	return (
		<>
			{seasons.map((season) => (
				<section id={season.id} key={season.id} className={`relative h-[60vh] rounded-none mx-[-2rem] py-16 px-16 overflow-hidden z-1 ${season.className}`}>
					<div className="flex flex-col md:flex-row md:justify-between">
						<h2 className="mt-2 text-2xl font-bold">{season.title}</h2>
						<p className="mt-1 text-lg text-gray-700">{season.description}</p>
					</div>
					<ProductsGrid products={fakeProducts} />
				</section>
			))}
		</>
	);
};

export default SeasonsSection;

function ProductsGrid({ products }: { products: typeof fakeProducts }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product, index) => (
				<ProductCardComponent key={product.id} product={product} loading={index < 8 ? 'eager' : undefined} />
			))}
		</div>
	);
}

function ProductCardComponent({ product, loading }: { product: typeof fakeProducts[0]; loading?: 'eager' | 'lazy' }) {
	const variant = product.variants.nodes[0];
	const variantUrl = `/products/${product.handle}`;
	const productLink = variantUrl;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;
	const rating = 4.5;
	const reviewCount = 100;
	const features = ['Fast Delivery', 'Best Price'];

	return (
		<ProductCard
			productName={product.title}
			productLink={productLink}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			discountLabel="Up to 35% off"
			price={price}
			rating={rating}
			reviewCount={reviewCount}
			features={features}
			darkImageUrl={imageUrl} // Using the same image URL for both light and dark
		/>
	);
}
