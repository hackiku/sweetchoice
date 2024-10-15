import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import Card from '~/components/ecom/product/Card';
import ContactModal from '~/components/ui/ContactModal';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#F65A4D', secondaryColor: '#00FF00' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#D8B3F8', secondaryColor: '#FF6B6B' },
	{ id: 'easter', title: 'Easter', mainColor: '#FFDB58', secondaryColor: '#FF6B6B' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFA500', secondaryColor: '#00FF00' },
];

const HolidaySection = ({ holidayCollections }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [expandedHolidays, setExpandedHolidays] = useState({});

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	const toggleExpand = (holidayId) => {
		setExpandedHolidays(prev => ({
			...prev,
			[holidayId]: !prev[holidayId]
		}));
	};

	return (
		<div className="flex flex-col items-center gap-8 overflow-x-hidden">
			{holidays.map((holiday) => {
				const collection = holidayCollections[holiday.id];
				if (!collection) return null;

				const isExpanded = expandedHolidays[holiday.id];
				const displayedProducts = isExpanded ? collection.products.nodes : collection.products.nodes.slice(0, 3);

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

						<ProductGrid
							products={displayedProducts}
							mainColor={holiday.mainColor}
							secondaryColor={holiday.secondaryColor}
							onContactClick={handleContactClick}
						/>

						<div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
							<button
								onClick={() => toggleExpand(holiday.id)}
								className="text-xl font-semibold px-6 py-2 border-2 border-black bg-transparent
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                    transition-all duration-200 w-full sm:w-auto"
							>
								{isExpanded ? 'Show Less' : 'Show More'}
							</button>
							<Link
								to={`/collections/${holiday.id}`}
								className="text-xl font-semibold px-6 py-2 border-2 border-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                    transition-all duration-200 w-full sm:w-auto sm:text-2xl sm:px-8 sm:py-3"
								style={{ backgroundColor: holiday.secondaryColor }}
							>
								Explore {holiday.title}
							</Link>
						</div>
					</section>
				);
			})}
			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
};

const ProductGrid = ({ products, mainColor, secondaryColor, onContactClick }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{products.map((product) => (
				<ProductCardComponent
					key={product.id}
					product={product}
					seasonMainColor={mainColor}
					seasonSecondaryColor={secondaryColor}
					onContactClick={onContactClick}
				/>
			))}
		</div>
	);
};

const ProductCardComponent = ({ product, seasonMainColor, seasonSecondaryColor, onContactClick }) => {
	const variantUrl = `/products/${product.handle}`;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const firstVariant = product.variants?.nodes[0];
	const weight = firstVariant?.weight || 0;
	const weightUnit = firstVariant?.weightUnit || 'g';

	return (
		<Card
			productName={product.title}
			productLink={variantUrl}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			weight={weight}
			weightUnit={weightUnit}
			seasonColor={seasonMainColor}
			secondaryColor={seasonSecondaryColor}
			boxQuantity={10} // Example value, adjust as needed
			onContactClick={onContactClick}
		/>
	);
};

export default HolidaySection;