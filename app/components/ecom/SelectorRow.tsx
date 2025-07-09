// app/components/ecom/SelectorRow.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface SelectorRowProps {
	sortOption: string;
	stockFilter: string;
	gridSize: number;
	onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectorRow: React.FC<SelectorRowProps> = ({
	sortOption,
	stockFilter,
	gridSize,
	onSortChange,
}) => {
	const { t } = useTranslation();
	// Initialize layout with the provided gridSize
	const [layout, setLayout] = useState(() => ({
		columns: gridSize,
		products: 24
	}));

	// Single useEffect for handling both initial load and window resize
	useEffect(() => {
		const updateLayout = () => {
			const width = window.innerWidth;
			let newColumns;

			// Reduced by 1 for each breakpoint, mobile gets option for 1
			if (width < 640) newColumns = 1;
			else if (width < 768) newColumns = 2;
			else if (width < 1024) newColumns = 3;
			else if (width < 1280) newColumns = 4;
			else newColumns = 5;

			setLayout(prev => ({ ...prev, columns: newColumns }));

			// Notify parent component of the change
			const event = {
				target: {
					name: 'grid_size',
					value: String(newColumns)
				}
			} as React.ChangeEvent<HTMLSelectElement>;
			onSortChange(event);
		};

		// Run immediately on mount
		updateLayout();

		// Add resize listener
		window.addEventListener('resize', updateLayout);

		// Cleanup
		return () => window.removeEventListener('resize', updateLayout);
	}, []); // Empty dependency array since we want this to run only once on mount

	// Handle manual grid size changes
	const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newColumns = Number(e.target.value);
		setLayout(prev => ({ ...prev, columns: newColumns }));
		onSortChange(e);
	};

	return (
		<div className="flex flex-wrap justify-start gap-4">
			<select
				name="sort_by"
				value={sortOption}
				onChange={onSortChange}
				className="border-4 border-black p-3 font-bold bg-pink-300 cursor-pointer 
				       transform hover:scale-105 transition-all duration-200 
				       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
				       hover:shadow-[6px_6px_0px_0px_rgba(237,28,36,1)]
				       hover:bg-pink-400 rounded-xl text-lg
				       focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value="manual">{t('collections.filters.sort.options.featured')}</option>
				<option value="best-selling">{t('collections.filters.sort.options.bestSelling')}</option>
				<option value="title-ascending">{t('collections.filters.sort.options.titleAsc')}</option>
				<option value="title-descending">{t('collections.filters.sort.options.titleDesc')}</option>
				<option value="created-ascending">{t('collections.filters.sort.options.dateAsc')}</option>
				<option value="created-descending">{t('collections.filters.sort.options.dateDesc')}</option>
			</select>

			<select
				name="stock_filter"
				value={stockFilter}
				onChange={onSortChange}
				className="border-4 border-black p-3 font-bold bg-green-300 cursor-pointer 
				       transform hover:scale-105 transition-all duration-200 
				       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
				       hover:shadow-[6px_6px_0px_0px_rgba(237,28,36,1)]
				       hover:bg-green-400 rounded-xl text-lg
				       focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value="all">{t('collections.filters.stock.options.all')}</option>
				<option value="in-stock">{t('collections.filters.stock.options.inStock')}</option>
				<option value="out-of-stock">{t('collections.filters.stock.options.outOfStock')}</option>
			</select>

			<select
				name="grid_size"
				value={layout.columns}
				onChange={handleGridSizeChange}
				className="border-4 border-black p-3 font-bold bg-blue-300 cursor-pointer 
				       transform hover:scale-105 transition-all duration-200 
				       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
				       hover:shadow-[6px_6px_0px_0px_rgba(237,28,36,1)]
				       hover:bg-blue-400 rounded-xl text-lg
				       focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value="1">{t('collections.filters.grid.options.one')}</option>
				<option value="2">{t('collections.filters.grid.options.two')}</option>
				<option value="3">{t('collections.filters.grid.options.three')}</option>
				<option value="4">{t('collections.filters.grid.options.four')}</option>
				<option value="5">{t('collections.filters.grid.options.five')}</option>
				<option value="6">{t('collections.filters.grid.options.six')}</option>
			</select>
		</div>
	);
};

export default SelectorRow;