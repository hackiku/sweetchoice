// app/components/ecom/ProductCard.tsx

import React from 'react';

interface ProductCardProps {
	productName: string;
	productLink: string;
	imageUrl: string;
	imageAlt: string;
	price: string;
	weight: string;
	imageBgColor?: string;
	buttonBgColor?: string;
	buttonHoverBgColor?: string;
	buttonActiveBgColor?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
	productName,
	productLink,
	imageUrl,
	imageAlt,
	price,
	weight,
	imageBgColor = '#FFF59F',
	buttonBgColor = '#A6FAFF',
	buttonHoverBgColor = '#79F7FF',
	buttonActiveBgColor = '#00E1EF',
}) => {
	return (
		<a
			href={productLink}
			target="_blank"
			rel="noopener noreferrer"
			className="block bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer"
		>
			<div className={`mb-4 aspect-square overflow-hidden border-2 border-black`} style={{ backgroundColor: imageBgColor }}>
				<img
					src={imageUrl}
					alt={imageAlt}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-xl mb-0 font-bold ">{productName}</h2>
				<span className="text-md">{weight}</span>
			</div>

			<span className="text-lg font-bold block mb-6">{price}</span>

			<button
				className={`w-full border-2 border-black py-2 px-4 font-bold 
                           hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                           transition-all`}
				style={{
					backgroundColor: buttonBgColor,
				}}
				onClick={(e) => {
					e.preventDefault();
					// Add to cart logic here
				}}
			>
				+ Add to Cart
			</button>
		</a>
	);
};

export default ProductCard;