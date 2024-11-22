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
	const [layout, setLayout] = useState({ columns: gridSize, products: 24 });

	useEffect(() => {
		const updateLayout = () => {
			const width = window.innerWidth;
			if (width < 640) setLayout({ columns: 2, products: 24 });
			else if (width < 768) setLayout({ columns: 3, products: 24 });
			else if (width < 1024) setLayout({ columns: 4, products: 24 });
			else if (width < 1280) setLayout({ columns: 5, products: 24 });
			else setLayout({ columns: 6, products: 24 });
		};

		updateLayout();
		window.addEventListener('resize', updateLayout);
		return () => window.removeEventListener('resize', updateLayout);
	}, []);

	return (
		<div className="flex flex-wrap justify-start gap-4">
			<select
				name="sort_by"
				value={sortOption}
				onChange={onSortChange}
				className="border-4 border-black p-2 font-bold bg-pink-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value="manual">{t('collections.filters.sort.options.featured')}</option>
				<option value="best-selling">{t('collections.filters.sort.options.bestSelling')}</option>
				{/* <option value="manual">Featured</option> */}
				{/* <option value="best-selling">Best selling</option> */}
				<option value="title-ascending">{t('collections.filters.sort.options.titleAsc')}</option>
				<option value="title-descending">{t('collections.filters.sort.options.titleDesc')}</option>
				{/* <option value="price-ascending">{t('collections.filters.sort.options.priceAsc')}</option> */}
				{/* <option value="price-descending">{t('collections.filters.sort.options.priceDesc')}</option> */}
				<option value="created-ascending">{t('collections.filters.sort.options.dateAsc')}</option>
				<option value="created-descending">{t('collections.filters.sort.options.dateDesc')}</option>
			</select>

			<select
				name="stock_filter"
				value={stockFilter}
				onChange={onSortChange}
				className="border-4 border-black p-2 font-bold bg-green-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value="all">{t('collections.filters.stock.options.all')}</option>
				<option value="in-stock">{t('collections.filters.stock.options.inStock')}</option>
				<option value="out-of-stock">{t('collections.filters.stock.options.outOfStock')}</option>
			</select>

			<select
				name="grid_size"
				value={layout.columns}
				onChange={onSortChange}
				className="border-4 border-black p-2 font-bold bg-blue-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
			>
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