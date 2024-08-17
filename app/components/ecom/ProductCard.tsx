// app/components/ecom/ProductCard.tsx

import React from 'react';
import { useAside } from '~/components/Aside';
import { CartForm, type OptimisticCartLine, useAnalytics } from '@shopify/hydrogen';
import AddToCart from './AddToCart';
import useProductVariant from '~/hooks/useProductVariant'; // Import the custom hook
interface ProductCardProps {
	productName: string;
	productLink: string;
	product_id: string;
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
	product_id,
	imageUrl,
	imageAlt,
	price,
	weight,
	imageBgColor = '#FFF59F',
	buttonBgColor = '#A6FAFF',
	buttonHoverBgColor = '#79F7FF',
	buttonActiveBgColor = '#00E1EF',
}) => {
	// Use the custom hook
	const { variantId, loading, error } = useProductVariant(product_id);
	const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  const handleAddToCatalog = () => {
    console.log(productLink);
    open('cart');
  };

  // Define the cart line item for AddToCart
  const lines: Array<OptimisticCartLine> = variantId ? [
    {
      merchandiseId: variantId, // Use the fetched variant ID
      quantity: 1,
    },
  ] : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

			<AddToCart 
				lines={lines} 
				buttonBgColor={buttonBgColor}
				onClick={handleAddToCatalog}
			>
				+ Add to Cart
			</AddToCart>
		</a>
	);
};

export default ProductCard;