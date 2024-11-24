// app/components/ecom/product/ProductInfo.tsx
import { ClockIcon } from '@heroicons/react/24/solid';
import type { SelectedOption } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';

interface ProductInfoProps {
	product: {
		title: string;
		options: Array<{
			name: string;
			values: string[];
		}>;
		variants: {
			nodes: Array<{
				id: string;
				selectedOptions: Array<SelectedOption>;
				availableForSale: boolean;
			}>;
		};
		rok_trajanja?: {
			value: string;
		};
	};
	selectedVariant: {
		id: string;
		selectedOptions: Array<SelectedOption>;
	} | null;
}

export function ProductInfo({ product, selectedVariant }: ProductInfoProps) {
	const shelfLife = product.rok_trajanja?.value || '630';

	return (
		<div className="flex flex-col gap-4">
			{/* Shelf Life Card */}
			<div className="bg-yellow-100 rounded-xl border-2 border-black p-3 
                    shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                    transition-all duration-200 w-fit">
				<div className="flex items-center gap-2">
					<ClockIcon className="w-5 h-5" />
					<span className="text-md font-semibold">
						{shelfLife} days
					</span>
				</div>
			</div>

			{/* Variant Options */}
			<div className="w-full">
				{product.options.map((option) => {
					if (option.values.length === 1) {
						return null;
					}
					return (
						<div key={option.name} className="flex flex-col gap-2 mb-4">
							<legend className="text-sm font-medium text-gray-700">
								{option.name}
							</legend>
							<div className="flex flex-wrap gap-3">
								{option.values.map((value) => {
									const optionIsSelected =
										selectedVariant?.selectedOptions?.find(
											(opt) => opt.name === option.name
										)?.value === value;

									const isAvailable = product.variants.nodes.some(
										(variant) =>
											variant.selectedOptions.find(
												(opt) => opt.name === option.name
											)?.value === value && variant.availableForSale
									);

									return (
										<Link
											key={value}
											to={getVariantUrl(product, selectedVariant, option.name, value)}
											preventScrollReset
											replace
											className={`px-4 py-2 border-2 border-black rounded-lg 
                        transition-all duration-200
                        ${optionIsSelected
													? 'bg-black text-white shadow-[4px_4px_0px_rgba(255,255,255,1)]'
													: isAvailable
														? 'hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]'
														: 'opacity-50 cursor-not-allowed'
												}`}
										>
											{value}
										</Link>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>

		</div>
	);
}

function getVariantUrl(
	product: ProductInfoProps['product'],
	selectedVariant: ProductInfoProps['selectedVariant'],
	optionName: string,
	optionValue: string
) {
	const currentOptions = selectedVariant?.selectedOptions || [];
	const searchParams = new URLSearchParams();

	currentOptions.forEach((opt) => {
		if (opt.name === optionName) {
			searchParams.set(optionName, optionValue);
		} else {
			searchParams.set(opt.name, opt.value);
		}
	});

	return `?${searchParams.toString()}`;
}