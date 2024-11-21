// app/components/ecom/product/ProductWeight.tsx

import { useState } from 'react';

interface ProductWeightProps {
	selectedVariant: {
		weight?: number;
		weightUnit?: string;
	} | null;
}

export function ProductWeight({ selectedVariant }: ProductWeightProps) {
	const [selectedType, setSelectedType] = useState('Box');

	const weights = ['Box', 'Pallet', 'Transport'];
	const defaultWeight = selectedVariant?.weight || 12;

	const multipliers = {
		Box: 1,
		Pallet: 48,
		Transport: 48 * 24,
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				{weights.map((type) => (
					<button
						key={type}
						onClick={() => setSelectedType(type)}
						className={`px-4 py-2 border-2 border-black text-lg font-bold transition-all duration-200
                       ${selectedType === type
								? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
								: 'bg-white text-black hover:bg-gray-100'}`}
					>
						{type}
					</button>
				))}
			</div>
			<p className="text-4xl font-bold">
				{defaultWeight * multipliers[selectedType]} units
			</p>
		</div>
	);
}