// app/components/ecom/product/ProductGrid.tsx

import React, { useState, useEffect } from 'react';
import Card from '~/components/ecom/product/Card';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

interface ProductGridProps {
	products: ProductItemFragment[];
	secondaryColor: string;
	onContactClick: () => void;
	manualGridSize?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
	products,
	secondaryColor,
	onContactClick,
	manualGridSize
}) => {
	const [gridSize, setGridSize] = useState(getDefaultGridSize());

	useEffect(() => {
		if (manualGridSize) {
			setGridSize(manualGridSize);
		} else {
			const handleResize = () => {
				setGridSize(getDefaultGridSize());
			};
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [manualGridSize]);

	function getDefaultGridSize() {
		const width = window.innerWidth;
		if (width < 640) return 2;
		if (width < 768) return 3;
		if (width < 1024) return 4;
		if (width < 1280) return 5;
		return 6;
	}

	const gridClass = `grid gap-4 grid-cols-${gridSize}`;

	return (
		<div className={gridClass}>
			{products.map((product) => (
				<ProductCardComponent
					key={product.id}
					product={product}
					secondaryColor={secondaryColor}
					onContactClick={onContactClick}
				/>
			))}
		</div>
	);
};

function ProductCardComponent({ product, secondaryColor, onContactClick }: { product: ProductItemFragment; secondaryColor: string; onContactClick: () => void }) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
	const productLink = variantUrl;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const firstVariant = product.variants?.nodes[0];
	const weight = firstVariant?.weight || 0;
	const weightUnit = firstVariant?.weightUnit || 'g';

	return (
		<Card
			productName={product.title}
			productLink={productLink}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			weight={weight}
			weightUnit={weightUnit}
			secondaryColor={secondaryColor}
			boxQuantity={10} // Example value, adjust as needed
			onContactClick={onContactClick}
		/>
	);
}

export default ProductGrid;