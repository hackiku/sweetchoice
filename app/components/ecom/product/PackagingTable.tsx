//app/components/ecom/product/PackagingTable.tsx
import React from 'react';
import { useState } from 'react';
import { CubeIcon, TruckIcon, ArchiveBoxIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Metafield {
	value: string;
	type: string;
}

interface ProductMetafields {
	jmpal?: Metafield | null;
	tppal?: Metafield | null;
	jmtp?: Metafield | null;
	jmkp?: Metafield | null;
	rok_trajanja?: Metafield | null;
}

function parsePackagingValue(value: string): number[] {
	if (!value) return [];
	// Remove square brackets and split by comma
	const cleanValue = value.replace(/[\[\]]/g, '').split(',');
	return cleanValue.map(v => parseInt(v.trim()));
}

interface PackagingTableProps {
	metafields?: ProductMetafields;
	usePlaceholder?: boolean;
}

// Placeholder data showing the structure: [units, packages]
const PLACEHOLDER_DATA: ProductMetafields = {
	jmpal: { value: '[3888,4320]', type: 'single_line_text_field' },
	tppal: { value: '[72,180]', type: 'single_line_text_field' },
	jmtp: { value: '[54,24]', type: 'single_line_text_field' },
	jmkp: { value: '[30,10]', type: 'single_line_text_field' },
};

export function PackagingTable({ metafields, usePlaceholder = false }: PackagingTableProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const data = usePlaceholder ? PLACEHOLDER_DATA : metafields;

	if (!data || Object.values(data).every(value => !value)) {
		return null;
	}

	const packagingOptions = [
		{
			key: 'pallet',
			label: 'Pallet Packaging',
			icon: <CubeIcon className="w-6 h-6" />,
			values: [
				{
					label: 'Units per Pallet',
					value: parsePackagingValue(data.jmpal?.value || '')[0],
					secondary: parsePackagingValue(data.jmpal?.value || '')[1],
				},
				{
					label: 'Transport Boxes',
					value: parsePackagingValue(data.tppal?.value || '')[0],
					secondary: parsePackagingValue(data.tppal?.value || '')[1],
				}
			]
		},
		{
			key: 'transport',
			label: 'Transport Box',
			icon: <TruckIcon className="w-6 h-6" />,
			values: [
				{
					label: 'Units per Box',
					value: parsePackagingValue(data.jmtp?.value || '')[0],
					secondary: parsePackagingValue(data.jmtp?.value || '')[1],
				}
			]
		},
		{
			key: 'commercial',
			label: 'Commercial Pack',
			icon: <ArchiveBoxIcon className="w-6 h-6" />,
			values: [
				{
					label: 'Units per Pack',
					value: parsePackagingValue(data.jmkp?.value || '')[0],
					secondary: parsePackagingValue(data.jmkp?.value || '')[1],
				}
			]
		}
	];

	return (
		<div className="bg-white rounded-xl border-2 border-black p-6 
                    shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                    transition-all duration-200">
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full flex items-center justify-between group"
			>
				<h3 className="text-2xl font-bold group-hover:text-gray-600 transition-colors">
					Packaging Options
				</h3>
				<div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
					<ChevronDownIcon className="w-6 h-6" />
				</div>
			</button>

			<div className={`grid gap-6 transition-all duration-200 overflow-hidden
                      ${isExpanded ? 'mt-6 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
				{packagingOptions.map((option) => (
					<div key={option.key} className="group">
						<div className="flex items-center gap-3 mb-3">
							<div className="p-2 bg-gray-100 rounded-lg border-2 border-black">
								{option.icon}
							</div>
							<h4 className="text-lg font-semibold">{option.label}</h4>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{option.values.map((item, index) => (
								<div
									key={index}
									className="p-4 bg-gray-50 rounded-lg border-2 border-black 
                           hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                           transition-all duration-200"
								>
									<div className="text-sm text-gray-600 mb-1">{item.label}</div>
									<div className="text-xl font-bold flex items-baseline gap-2">
										{item.value}
										{item.secondary && (
											<>
												<span className="text-sm text-gray-400 mx-1">or</span>
												<span className="text-gray-500">{item.secondary}</span>
											</>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function extractPackagingInfo(product: any): ProductMetafields {
	if (!product) return {};

	return {
		jmpal: product.jmpal,
		tppal: product.tppal,
		jmtp: product.jmtp,
		jmkp: product.jmkp,
		rok_trajanja: product.rok_trajanja
	};
}