// app/components/ecom/product/Card.tsx
import React from 'react';
import { Link } from '@remix-run/react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '~/components/ui/Tooltip';
import { useContact } from '~/components/contact/ContactContext';

interface CardProps {
	product: {
		id: string;
		title: string;
		handle: string;
		featuredImage?: {
			url: string;
			altText?: string;
		};
		variants: {
			nodes: Array<{
				weight?: number;
				weightUnit?: string;
			}>;
		};
	};
	seasonColor?: string;
	secondaryColor?: string;
	boxQuantity?: number;
}

const Card: React.FC<CardProps> = ({
	product,
	seasonColor,
	secondaryColor = '#A6FAFF',
	boxQuantity = 9,
}) => {
	const { toggleProduct, isProductSelected } = useContact();
	const isInCatalog = isProductSelected(product.id);

	const variant = product.variants.nodes[0];
	const weight = variant?.weight || 0;
	const weightUnit = variant?.weightUnit || 'g';

	const handleCatalogAction = (e: React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggleProduct(product);
	};

	return (
		<Link to={`/products/${product.handle}`} className="block">
			<div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                    hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200">
				<div className="mb-4 aspect-square overflow-hidden border-2 border-black relative"
					style={{ backgroundColor: '#FFF59F' }}>
					{product.featuredImage && (
						<img
							src={product.featuredImage.url}
							alt={product.featuredImage.altText || product.title}
							className="w-full h-full object-cover"
						/>
					)}
				</div>

				<h2 className="text-xl font-bold mb-2 truncate">{product.title}</h2>

				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col justify-between items-start gap-1">
						<div className="font-bold">
							{weight} {weightUnit}
						</div>
						<div className="text-sm font-semibold">
							📦 {boxQuantity}×
						</div>
					</div>

					<Tooltip
						content={isInCatalog ? "Remove from catalog" : "Add to catalog"}
						style={{ backgroundColor: isInCatalog ? 'black' : secondaryColor }}
					>
						<button
							onClick={handleCatalogAction}
							className={`w-12 h-12 rounded-full flex items-center justify-center 
                       transition-all duration-200 border-2 border-black
                       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                       active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                       active:translate-x-[2px] active:translate-y-[2px]`}
							style={{
								backgroundColor: isInCatalog ? '#4B5563' : secondaryColor
							}}
						>
							{isInCatalog ? (
								<CheckIcon className="w-6 h-6 text-white" />
							) : (
								<PlusIcon className="w-6 h-6 text-black" />
							)}
						</button>
					</Tooltip>
				</div>
			</div>
		</Link>
	);
};

export default Card;