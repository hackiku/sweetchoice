// app/components/ecom/product/ProductInfo.tsx

import React from 'react';
import { ClockIcon, CubeIcon } from '@heroicons/react/24/solid';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface ProductInfoProps {
	product: any;
	selectedVariant: any;
}

// Utility function to convert days to months
function daysToMonths(days: number): number {
	return Math.round(days / 30.44); // Average days per month
}

export function ProductInfo({ product, selectedVariant }: ProductInfoProps) {
	const { t } = useTranslation();
	// Extract weight from variant or product title
	const getWeight = () => {
		if (selectedVariant?.weight) {
			return `${selectedVariant.weight}${selectedVariant.weightUnit || 'g'}`;
		}
		// Fallback to extract from title
		const weightMatch = product.title.match(/(\d+)g/);
		return weightMatch ? weightMatch[0] : '80g';
	};

	// Extract shelf life and convert to months
	const shelfLifeDays = product.rok_trajanja?.value ? parseInt(product.rok_trajanja.value) : null;
	const shelfLifeMonths = shelfLifeDays ? daysToMonths(shelfLifeDays) : null;

	const weight = getWeight();

	return (
		<div className="grid grid-cols-2 gap-4">
			{/* Package Size Card */}
			<div className="bg-[#FFD700] border-4 border-black rounded-xl p-6 
                      shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]
                      transition-all duration-200 flex items-center gap-4">
				<CubeIcon className="w-8 h-8 text-black flex-shrink-0" />
				<div className="flex flex-col">
					<div className="text-3xl font-black text-black leading-none">
						{weight}
					</div>
					<div className="text-lg font-bold text-black opacity-70">
						{t('product.info.packageSize.unit')}
					</div>
				</div>
			</div>

			{/* Shelf Life Card */}
			<div className="bg-[#90EE90] border-4 border-black rounded-xl p-6 
                     shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]
                     transition-all duration-200 flex items-center gap-4">
				<ClockIcon className="w-8 h-8 text-black flex-shrink-0" />
				<div className="flex flex-col gap-1">
					<div className="text-3xl font-black text-black leading-none">
						{shelfLifeMonths || 21}
					</div>
					<div className="text-lg font-bold text-black opacity-70">
						{t('product.info.shelfLife.unit')}
					</div>
				</div>
			</div>
		</div>
	);
}