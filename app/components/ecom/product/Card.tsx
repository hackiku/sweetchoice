// app/components/ecom/product/Card.tsx

import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useContact } from '~/components/cta/contact/ContactContext';

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

function Tooltip({ content, children, bgColor }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	// Clean up timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [timeoutId]);

	const showTooltip = () => {
		if (timeoutId) clearTimeout(timeoutId);
		setIsVisible(true);
	};

	const hideTooltip = () => {
		// Add small delay before hiding to prevent flicker
		const id = setTimeout(() => setIsVisible(false), 100);
		setTimeoutId(id);
	};

	return (
		<div
			className="relative inline-block"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onTouchStart={(e) => {
				// Prevent default touch behavior
				e.preventDefault();
				showTooltip();
				// Auto-hide after 2 seconds on touch
				setTimeout(() => setIsVisible(false), 2000);
			}}
		>
			{children}
			<div
				className={`absolute -top-12 left-1/2 transform -translate-x-1/2 
					transition-all duration-300 pointer-events-none z-20
					${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
			>
				<div className="relative">
					<div
						className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border-2 border-black
							shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
						style={{ backgroundColor: bgColor, color: bgColor === '#000000' ? 'white' : 'black' }}
					>
						{content}
					</div>
					<div
						className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 w-4 h-4 border-r-2 border-b-2 border-black"
						style={{ backgroundColor: bgColor }}
					/>
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
	const [isButtonHovered, setIsButtonHovered] = useState(false);
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
		<Link to={`/products/${product.handle}`} className="block h-full">
			<div className="bg-white border-2 border-black p-4 h-full flex flex-col
				shadow-[4px_4px_0px_rgba(0,0,0,1)] 
				hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] 
				hover:-translate-y-1 hover:-translate-x-1 hover:-rotate-1
				transition-all duration-200 transform-gpu">

				{/* Image container - fixed aspect ratio */}
				<div
					className="mb-4 aspect-square overflow-hidden border-2 border-black relative flex-shrink-0"
					style={{ backgroundColor: '#FFF59F' }}
				>
					{product.featuredImage && (
						<img
							src={product.featuredImage.url}
							alt={product.featuredImage.altText || product.title}
							className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
							loading="lazy"
						/>
					)}
				</div>

				{/* Content container - flexible height */}
				<div className="flex-1 flex flex-col">
					{/* Title container - always takes space for 2 lines */}
					<div className="h-14 mb-4 flex items-start">
						<h2 className="text-xl font-bold break-words line-clamp-2 leading-tight">
							{product.title}
						</h2>
					</div>

					{/* Bottom section - pushed to bottom */}
					<div className="flex justify-between items-center mt-auto">
						<div className="flex flex-col justify-between items-start gap-1">
							<div className="font-bold text-lg">
								{weight} g
							</div>
							{/* <div className="text-sm font-semibold">
								📦 {boxQuantity}×
							</div> */}
						</div>

						<Tooltip
							content={isInCatalog ? "Remove from catalog" : "Add to catalog"}
							bgColor={tooltipBgColor}
						>
							<button
								onClick={handleCatalogAction}
								onMouseEnter={() => setIsButtonHovered(true)}
								onMouseLeave={() => setIsButtonHovered(false)}
								className={`w-12 h-12 rounded-full flex items-center justify-center 
									transition-all duration-200 border-2 border-black
									shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
									hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
									hover:-translate-y-0.5 hover:-translate-x-0.5 hover:rotate-6
									active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
									active:translate-x-[2px] active:translate-y-[2px] active:rotate-0
									touch-manipulation transform-gpu ${isButtonHovered ? 'scale-110' : 'scale-100'}`}
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
			</div>
		</Link>
	);
};

export default Card;