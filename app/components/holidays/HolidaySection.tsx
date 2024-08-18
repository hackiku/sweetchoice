// app/components/holidays/HolidaySection.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import WholesaleCard from '~/components/ecom/WholesaleCard';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#F65A4D', secondaryColor: '#00FF00' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#D8B3F8', secondaryColor: '#FF6B6B' },
	{ id: 'easter', title: 'Easter', mainColor: '#FFDB58', secondaryColor: '#FF6B6B' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFA500', secondaryColor: '#00FF00' },
];

const HolidaySection = ({ holidayCollections }) => {
	return (
		<div className="flex flex-col items-center gap-8 overflow-x-hidden">
			{holidays.map((holiday) => {
				const collection = holidayCollections[holiday.id];
				if (!collection) return null;

				return (
					<section
						id={holiday.id}
						key={holiday.id}
						className="w-[92vw] rounded-[2em] border-4 border-black px-8 py-12 md:p-16 relative"
						style={{ backgroundColor: holiday.mainColor }}
					>
						<div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
							<h2 className="text-6xl font-bold mb-1 relative z-10 md-max:text-4xl">{holiday.title}</h2>
							<div className="w-full md:w-3/6">
								<p className="text-xl font-semibold mb-4 md-max:text-base">{collection.description || 'Holiday description placeholder'}</p>
							</div>
						</div>

						<WholesaleGrid
							products={collection.products.nodes.slice(0, 3)}
							secondaryColor={holiday.secondaryColor}
						/>

						<div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8">
							<Link
								to={`/collections/${holiday.id}`}
								className="text-xl px-6 py-2 border-2 border-black
									shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
									transition-all duration-200
									flex items-center justify-center"
								style={{ backgroundColor: holiday.secondaryColor }}
							>
								Explore {holiday.title} →
							</Link>
						</div>
					</section>
				);
			})}
		</div>
	);
};

const WholesaleGrid = ({ products, secondaryColor }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-4">
			{products.map((product) => (
				<WholesaleCardComponent key={product.id} product={product} secondaryColor={secondaryColor} />
			))}
		</div>
	);
};

const WholesaleCardComponent = ({ product, secondaryColor }) => {
	const variantUrl = `/products/${product.handle}`;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;
	const product_id = product.id;

	return (
		<WholesaleCard
			productName={product.title}
			productLink={variantUrl}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			price={price}
			weight="80g"
			buttonBgColor={secondaryColor}
			tags={product.tags || []}
			product_id={product_id}
		/>
	);
};

export default HolidaySection;