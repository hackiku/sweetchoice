// app/components/holidays/HolidaySection.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import ProductCard from '~/components/ecom/ProductCard';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#E6F3FF', secondaryColor: '#FFD1DC' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#FFE6E6', secondaryColor: '#FF69B4' },
	{ id: 'easter', title: 'Easter', mainColor: '#F0FFF0', secondaryColor: '#98FB98' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFF5E6', secondaryColor: '#FFA500' },
];

const HolidaySection = ({ holidayCollections }) => {
	return (
		<div className="w-screen overflow-x-hidden">
			{holidays.map((holiday) => {
				const collection = holidayCollections[holiday.id];
				if (!collection) return null;

				return (
					<section
						id={holiday.id}
						key={holiday.id}
						className="px-8 py-16 md:p-20 w-full mx-[-2rem]"
						style={{ backgroundColor: holiday.mainColor }}
					>
						<div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
							<h2 className="text-4xl font-bold mb-4">{holiday.title}</h2>
							<div className="w-2/5">
								<p className="text-lg mb-4">{collection.description || 'Holiday description placeholder'}</p>
							</div>
						</div>
						<ProductsGrid
							products={collection.products.nodes}
							secondaryColor={holiday.secondaryColor}
						/>
						<div className="mt-8 flex justify-between items-center">
							<Link
								to={`/collections/${collection.handle}`}
								className="px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
								style={{ backgroundColor: holiday.secondaryColor }}
							>
								Explore {holiday.title} →
							</Link>
							<Link to="/collections/all" className="underline">All Collections →</Link>
						</div>
					</section>
				);
			})}
		</div>
	);
};

const ProductsGrid = ({ products, secondaryColor }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
			{products.map((product) => (
				<ProductCardComponent key={product.id} product={product} secondaryColor={secondaryColor} />
			))}
		</div>
	);
};

const ProductCardComponent = ({ product, secondaryColor }) => {
	const variantUrl = `/products/${product.handle}`;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;

	return (
		<ProductCard
			productName={product.title}
			productLink={variantUrl}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			price={price}
			weight="80g"
			buttonBgColor={secondaryColor}
		/>
	);
};

export default HolidaySection;