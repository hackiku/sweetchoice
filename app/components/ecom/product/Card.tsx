// app/components/ecom/product/Card.tsx

import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '~/components/ui/Tooltip';

interface CardProps {
	productName: string;
	productLink: string;
	imageUrl: string;
	imageAlt: string;
	weight: number;
	seasonColor: string;
	boxQuantity?: number;
}

const Card: React.FC<CardProps> = ({
	productName,
	productLink,
	imageUrl,
	imageAlt,
	weight,
	seasonColor,
	boxQuantity = 9,
}) => {
	const [isInCatalog, setIsInCatalog] = useState(false);

	const handleAddToCatalog = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsInCatalog(!isInCatalog);
		// TODO: Implement actual catalog functionality
	};

	return (
		<Link to={productLink} className="block">
			<div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                      hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200">
				<div className="mb-4 aspect-square overflow-hidden border-2 border-black relative" style={{ backgroundColor: '#FFF59F' }}>
					<img
						src={imageUrl}
						alt={imageAlt}
						className="w-full h-full object-cover"
					/>
				</div>

				<h2 className="text-xl font-bold mb-2 truncate">{productName}</h2>

				<div className="flex justify-between items-center mb-4">
					<div className="text-sm font-semibold">
						{weight} g
					</div>
					<div className="text-sm font-semibold">
						📦 {boxQuantity}×
					</div>
				</div>
				<div className="flex justify-between items-center mb-4">
					<Tooltip content={isInCatalog ? "Remove from catalog" : "Add to catalog"}>
						<button
							onClick={handleAddToCatalog}
							className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200`}
							style={{ backgroundColor: seasonColor }}
						>
							{isInCatalog ? (
								<CheckIcon className="w-6 h-6 text-white" />
							) : (
								<PlusIcon className="w-6 h-6 text-white" />
							)}
						</button>
					</Tooltip>
				{isInCatalog && (
					<Link
						to="/catalog"
						className={`text-sm font-semibold hover:text-[${seasonColor}] transition-colors duration-200`}
					>
						Catalog →
					</Link>
				)}
				</div>

			</div>
		</Link>
	);
};

export default Card;