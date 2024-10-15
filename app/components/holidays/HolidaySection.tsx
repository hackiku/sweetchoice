// app/components/holidays/HolidaySection.tsx

import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import WholesaleCard from '~/components/ecom/product/ProductCardWholesale';
import Card from '~/components/ecom/product/Card';
import { Tooltip } from '~/components/ui/Tooltip';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#F65A4D', secondaryColor: '#00FF00' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#D8B3F8', secondaryColor: '#FF6B6B' },
	{ id: 'easter', title: 'Easter', mainColor: '#FFDB58', secondaryColor: '#FF6B6B' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFA500', secondaryColor: '#00FF00' },
];

const HolidaySection = ({ holidayCollections }) => {
	const [cardTypes, setCardTypes] = useState({
		christmas: 'card',
		valentines: 'card',
		easter: 'card',
		halloween: 'card',
	});

	const handleCardTypeChange = (holidayId, cardType) => {
		setCardTypes(prev => ({ ...prev, [holidayId]: cardType }));
	};

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
							<div>
								<h2 className="text-6xl font-bold mb-1 relative z-10 md-max:text-4xl">{holiday.title}</h2>
								<select
									value={cardTypes[holiday.id]}
									onChange={(e) => handleCardTypeChange(holiday.id, e.target.value)}
									className="mt-2 p-2 border-2 border-black rounded bg-transparent"
								>
									<option value="card">Card</option>
									<option value="wholesale">Wholesale Card</option>
								</select>
							</div>
							<div className="w-full md:w-3/6">
								<p className="text-xl font-semibold mb-4 md-max:text-base">{collection.description || 'Holiday description placeholder'}</p>
							</div>
						</div>

						<ProductGrid
							products={collection.products.nodes.slice(0, 3)}
							mainColor={holiday.mainColor}
							secondaryColor={holiday.secondaryColor}
							cardType={cardTypes[holiday.id]}
						/>

						<div className="mt-8 flex justify-end">
							<Link
								to={`/collections/${holiday.id}`}
								className="text-xl font-semibold px-6 py-2 border-2 border-black
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                  transition-all duration-200
                  flex items-center justify-center"
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

const ProductGrid = ({ products, mainColor, secondaryColor, cardType }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
			{products.map((product) => (
				<ProductCardComponent
					key={product.id}
					product={product}
					seasonMainColor={mainColor}
					seasonSecondaryColor={secondaryColor}
					cardType={cardType}
				/>
			))}
		</div>
	);
};

const ProductCardComponent = ({ product, seasonMainColor, seasonSecondaryColor, cardType }) => {
	const variantUrl = `/products/${product.handle}`;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;
	const product_id = product.id;

	const firstVariant = product.variants?.nodes[0];
	const weight = firstVariant?.weight || 0;
	const weightUnit = firstVariant?.weightUnit || 'g';

	if (cardType === 'wholesale') {
		return (
			<WholesaleCard
				productName={product.title}
				productLink={variantUrl}
				imageUrl={imageUrl}
				imageAlt={imageAlt}
				price={price}
				weight={`${weight}${weightUnit}`}
				buttonBgColor={seasonSecondaryColor}
				tags={product.tags || []}
				product_id={product_id}
				seasonMainColor={seasonMainColor}
				seasonSecondaryColor={seasonSecondaryColor}
			/>
		);
	} else {
		return (
			<Card
				productName={product.title}
				productLink={variantUrl}
				imageUrl={imageUrl}
				imageAlt={imageAlt}
				weight={weight}
				seasonColor={seasonMainColor}
				boxQuantity={10} // Example value, adjust as needed
				palletQuantity={100} // Example value, adjust as needed
				transportQuantity={1000} // Example value, adjust as needed
			/>
		);
	}
};

export default HolidaySection;