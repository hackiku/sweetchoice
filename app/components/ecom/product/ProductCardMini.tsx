// app/components/ecom/product/ProductCardMini.tsx

import React from 'react';
import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';

interface ProductCardMiniProps {
	productName: string;
	productLink: string;
	price: React.ReactNode;
	weight: string;
	imageBgColor?: string;
}

const ProductCardMini: React.FC<ProductCardMiniProps> = ({
	productName,
	productLink,
	price,
	weight,
	imageBgColor = '#FFF59F',
}) => {
	return (
		<div
			className="relative aspect-square overflow-hidden border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200"
			style={{ backgroundColor: imageBgColor }}
		>
			<Link
				to={productLink}
				className="block w-full h-full p-4 flex flex-col justify-between"
			>
				<div>
					<h2 className="text-lg font-bold mb-1">{productName}</h2>
					<span className="text-sm">{weight}</span>
				</div>
				<div className="flex justify-between items-end">
					<span className="text-lg font-bold">{price}</span>
					<button className="px-3 py-1 border-2 border-black bg-transparent hover:bg-black hover:text-white transition-colors duration-200">
						+
					</button>
				</div>
			</Link>
		</div>
	);
};

export default ProductCardMini;