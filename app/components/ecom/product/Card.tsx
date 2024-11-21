// app/components/ecom/product/Card.tsx
import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
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

interface TooltipProps {
	content: string;
	children: React.ReactNode;
	bgColor: string;
}

// Separate Tooltip component with better mobile support
function Tooltip({ content, children, bgColor }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div className="relative inline-block"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onTouchStart={() => setIsVisible(true)}
			onTouchEnd={() => setIsVisible(false)}>
			{children}
			<div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 
                      transition-opacity duration-200 pointer-events-none
                      ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
				<div className="relative">
					<div className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
						style={{ backgroundColor: bgColor, color: bgColor === '#000000' ? 'white' : 'black' }}>
						{content}
					</div>
					{/* Arrow that matches tooltip background */}
					<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4"
						style={{ backgroundColor: bgColor }}></div>
				</div>
			</div>
		</div>
	);
}

const Card: React.FC<CardProps> = ({
	product,
	seasonColor,
	secondaryColor = '#A6FAFF',
	boxQuantity = 9,
}) => {
	const { toggleProduct, isProductSelected } = useContact();
	const isInCatalog = isProductSelected(product.id);
	const tooltipBgColor = isInCatalog ? '#000000' : secondaryColor;

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
						bgColor={tooltipBgColor}
					>
						<button
							onClick={handleCatalogAction}
							className={`w-12 h-12 rounded-full flex items-center justify-center 
                         transition-all duration-200 border-2 border-black
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                         active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                         active:translate-x-[2px] active:translate-y-[2px]
                         touch-manipulation`}
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