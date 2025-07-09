// app/components/ecom/SelectorRow.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from '~/lib/i18n/useTranslation';
import CustomDropdown from './CustomDropdown';
import GridSelector from './GridSelector';

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

			// Max 4 columns by default, but user can select up to 6
			if (width < 640) newColumns = 1;
			else if (width < 768) newColumns = 2;
			else if (width < 1024) newColumns = 3;
			else newColumns = 4; // Max 4 columns by default

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

	// Handle custom dropdown changes
	const handleSortChange = (value: string) => {
		const event = {
			target: {
				name: 'sort_by',
				value: value
			}
		} as React.ChangeEvent<HTMLSelectElement>;
		onSortChange(event);
	};

	const handleStockFilterChange = (value: string) => {
		const event = {
			target: {
				name: 'stock_filter',
				value: value
			}
		} as React.ChangeEvent<HTMLSelectElement>;
		onSortChange(event);
	};

	// Handle grid size changes
	const handleGridSizeChange = (value: number) => {
		setLayout(prev => ({ ...prev, columns: value }));
		const event = {
			target: {
				name: 'grid_size',
				value: String(value)
			}
		} as React.ChangeEvent<HTMLSelectElement>;
		onSortChange(event);
	};

	// Options for dropdowns
	const sortOptions = [
		{ value: 'manual', label: t('collections.filters.sort.options.featured') },
		{ value: 'best-selling', label: t('collections.filters.sort.options.bestSelling') },
		{ value: 'title-ascending', label: t('collections.filters.sort.options.titleAsc') },
		{ value: 'title-descending', label: t('collections.filters.sort.options.titleDesc') },
		{ value: 'created-ascending', label: t('collections.filters.sort.options.dateAsc') },
		{ value: 'created-descending', label: t('collections.filters.sort.options.dateDesc') }
	];

	const stockOptions = [
		{ value: 'all', label: t('collections.filters.stock.options.all') },
		{ value: 'in-stock', label: t('collections.filters.stock.options.inStock') },
		{ value: 'out-of-stock', label: t('collections.filters.stock.options.outOfStock') }
	];

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			{/* Left side - Sort and Stock filters */}
			<div className="flex flex-wrap gap-4">
				<CustomDropdown
					name="sort_by"
					options={sortOptions}
					value={sortOption}
					onChange={handleSortChange}
					bgColor="bg-pink-300"
					hoverBgColor="hover:bg-pink-400"
				/>

				<CustomDropdown
					name="stock_filter"
					options={stockOptions}
					value={stockFilter}
					onChange={handleStockFilterChange}
					bgColor="bg-green-300"
					hoverBgColor="hover:bg-green-400"
				/>
			</div>

			{/* Right side - Grid selector */}
			<div className="right-4 z-30 flex justify-end sm:justify-start">
				<GridSelector
					value={layout.columns}
					onChange={handleGridSizeChange}
				/>
			</div>
		</div>
	);
};

export default SelectorRow;