// app/components/ecom/product/ProductCardWholesale.tsx

import React, { useState } from 'react';
import { useAside } from '~/components/Aside';
import { CartForm, type OptimisticCartLine } from '@shopify/hydrogen';
import AddToCart from '~/components/ecom/AddToCart';
import useProductVariant from '~/hooks/useProductVariant';

interface WholesaleCardProps {
	productName: string;
	product_id: string;
	productLink: string;
	imageUrl: string;
	imageAlt: string;
	weight: string;
	imageBgColor?: string;
	buttonBgColor?: string;
	tags?: string[];
}

const WholesaleCard: React.FC<WholesaleCardProps> = ({
	productName,
	product_id,
	productLink,
	imageUrl,
	imageAlt,
	weight,
	imageBgColor = '#FFF59F',
	buttonBgColor = '#A6FAFF',
	tags = [],
}) => {
	const [selectedOption, setSelectedOption] = useState('Box');
	const { variantId, loading, error } = useProductVariant(product_id);
	const { open } = useAside();

	const options = [
		{ name: 'Box', emoji: '📦' },
		{ name: 'Pallet', emoji: '🎨' },
		{ name: 'Transport', emoji: '🚚' },
	];

	const getQuantity = () => {
		switch (selectedOption) {
			case 'Box':
				return 10;
			case 'Pallet':
				return 500;
			case 'Transport':
				return 13000;
		}
	};

	const handleAddToCatalog = () => {
		console.log(productLink);
		open('cart');
	};

	const lines: Array<OptimisticCartLine> = variantId ? [
		{
			merchandiseId: variantId,
			quantity: getQuantity(),
		},
	] : [];

	const weightInGrams = parseFloat(weight) || 0;
	const totalWeight = weightInGrams * getQuantity();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                    hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200">
			<div className={`mb-4 aspect-square overflow-hidden border-2 border-black relative`} style={{ backgroundColor: imageBgColor }}>
				<img
					src={imageUrl}
					alt={imageAlt}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-wrap items-center justify-between mb-2">
				<h2 className="text-xl font-bold">{productName}</h2>
				{weight && (
					<span className="text-md font-semibold mb-4">{weight}</span>
				)}
			</div>

			<div className="mb-4">
				<div className="flex space-x-1">
					{options.map((option) => (
						<button
							key={option.name}
							onClick={() => setSelectedOption(option.name)}
							className={`
                flex-1 px-1 py-1 border-2 border-black text-xs font-bold
                ${selectedOption === option.name
									? 'bg-black text-white'
									: 'bg-white text-black hover:bg-gray-100'
								}
              `}
						>
							<span className="hidden sm:inline">{option.name}</span>
							<span className="sm:hidden">{option.emoji}</span>
						</button>
					))}
				</div>
				<p className="mt-2 text-lg font-bold">
					{getQuantity()} units
				</p>
			</div>

			<AddToCart
				lines={lines}
				buttonBgColor={buttonBgColor}
				onClick={handleAddToCatalog}
			>
				<span className="flex flex-col items-center justify-between w-full">
					Add to Catalog
					<span className="text-sm opacity-50 font-semibold">
						{(totalWeight / 1000).toFixed(2)} Kg
					</span>
				</span>
			</AddToCart>
		</div>
	);
};

export default WholesaleCard;