// app/components/ecom/product/Card.tsx

import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { PlusIcon, CheckIcon, TruckIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '~/components/ui/Tooltip';

interface CardProps {
	productName: string;
	productLink: string;
	imageUrl: string;
	imageAlt: string;
	weight: number;
	seasonColor: string;
	boxQuantity: number;
	palletQuantity: number;
	transportQuantity: number;
}

const Card: React.FC<CardProps> = ({
	productName,
	productLink,
	imageUrl,
	imageAlt,
	weight,
	seasonColor,
	boxQuantity,
	palletQuantity,
	transportQuantity,
}) => {
	const [isInCatalog, setIsInCatalog] = useState(false);

	const handleAddToCatalog = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsInCatalog(!isInCatalog);
		// TODO: Implement actual catalog functionality
	};

	return (
		<div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                    hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200">
			<div className="mb-4 aspect-square overflow-hidden border-2 border-black relative">
				<img
					src={imageUrl}
					alt={imageAlt}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex items-center justify-between mb-2">
				<h2 className="text-xl font-bold">{productName}</h2>
				<span className="text-sm font-semibold">{weight} g</span>
			</div>

			<SizeTable
				boxQuantity={boxQuantity}
				palletQuantity={palletQuantity}
				transportQuantity={transportQuantity}
			/>

			<div className="mt-4 flex items-center">
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
						className="ml-4 px-3 py-1 text-sm font-semibold border-2 border-black 
                       shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       transition-all duration-200"
					>
						Open catalog →
					</Link>
				)}
			</div>
		</div>
	);
};

interface SizeTableProps {
	boxQuantity: number;
	palletQuantity: number;
	transportQuantity: number;
}

const SizeTable: React.FC<SizeTableProps> = ({ boxQuantity, palletQuantity, transportQuantity }) => {
	return (
		<table className="w-full text-xs">
			<tbody>
				<tr>
					<Tooltip content="Box quantity">
						<td className="text-center">📦</td>
					</Tooltip>
					<Tooltip content="Pallet quantity">
						<td className="text-center">🏗️</td>
					</Tooltip>
					<Tooltip content="Transport quantity">
						<td className="text-center"><TruckIcon className="w-4 h-4 inline-block" /></td>
					</Tooltip>
				</tr>
				<tr>
					<td className="text-center">{boxQuantity}×</td>
					<td className="text-center">{palletQuantity}×</td>
					<td className="text-center">{transportQuantity}×</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Card;