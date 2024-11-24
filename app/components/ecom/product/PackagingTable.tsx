// app/components/ecom/product/PackagingTable.tsx
import React from 'react';

interface Metafield {
	value: string;
	type: string;
}

interface ProductMetafields {
	jmpal?: Metafield | null;
	tppal?: Metafield | null;
	jmitp?: Metafield | null;
	jmkp?: Metafield | null;
	rok_trajanja?: Metafield | null;
}

// Placeholder data for development
const PLACEHOLDER_DATA: ProductMetafields = {
	jmpal: { value: '3888 • 4320', type: 'single_line_text_field' },
	tppal: { value: '72 • 180', type: 'single_line_text_field' },
	jmitp: { value: '54 • 24', type: 'single_line_text_field' },
	jmkp: { value: '30 • 25', type: 'single_line_text_field' },
	rok_trajanja: { value: '630', type: 'single_line_text_field' }
};

function formatPackagingValue(value: string): string {
	if (!value) return '';
	// If value contains bullet point, format as "X × Y"
	if (value.includes('•')) {
		return value.replace('•', '×').trim();
	}
	return value;
}

interface PackagingTableProps {
	metafields?: ProductMetafields;
	usePlaceholder?: boolean;
}

export function PackagingTable({ metafields, usePlaceholder = false }: PackagingTableProps) {
	const data = usePlaceholder ? PLACEHOLDER_DATA : metafields;

	// Only render if we have any packaging info
	if (!data || Object.values(data).every(value => !value)) {
		return null;
	}

	const packagingFields = [
		{ key: 'jmpal', label: 'JM/PAL', value: data.jmpal?.value },
		{ key: 'tppal', label: 'TP/PAL', value: data.tppal?.value },
		{ key: 'jmitp', label: 'JM/TP', value: data.jmitp?.value },
		{ key: 'jmkp', label: 'JM/KP', value: data.jmkp?.value },
		{ key: 'rok_trajanja', label: 'Rok Trajanja', value: data.rok_trajanja?.value }
	];

	return (
		<div className="bg-white rounded-xl border-2 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200">
			<h3 className="text-2xl font-bold mb-4">Packaging Options</h3>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{packagingFields.map(({ key, label, value }) => (
					value && (
						<div
							key={key}
							className="p-4 bg-gray-50 rounded-lg border-2 border-black 
                         hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                         transition-all duration-200"
						>
							<div className="text-sm text-gray-600 mb-1">{label}</div>
							<div className="text-lg font-bold">
								{formatPackagingValue(value)}
							</div>
						</div>
					)
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
		jmitp: product.jmitp,
		jmkp: product.jmkp,
		rok_trajanja: product.rok_trajanja
	};
}