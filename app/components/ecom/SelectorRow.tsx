// app/components/ecom/SelectorRow.tsx

import React, { useState, useEffect } from 'react';

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
				<option value="manual">Featured</option>
				<option value="best-selling">Best selling</option>
				<option value="title-ascending">Alphabetically, A-Z</option>
				<option value="title-descending">Alphabetically, Z-A</option>
				<option value="price-ascending">Price, low to high</option>
				<option value="price-descending">Price, high to low</option>
				<option value="created-ascending">Date, old to new</option>
				<option value="created-descending">Date, new to old</option>
			</select>

			<select
				name="stock_filter"
				value={stockFilter}
				onChange={onSortChange}
				className="border-4 border-black p-2 font-bold bg-green-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value="all">All products</option>
				<option value="in-stock">In stock</option>
				<option value="out-of-stock">Out of stock</option>
			</select>

			<select
				name="grid_size"
				value={layout.columns}
				onChange={onSortChange}
				className="border-4 border-black p-2 font-bold bg-blue-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
			>
				<option value={2}>Grid: 2</option>
				<option value={3}>Grid: 3</option>
				<option value={4}>Grid: 4</option>
				<option value={5}>Grid: 5</option>
				<option value={6}>Grid: 6</option>
			</select>
		</div>
	);
};

export default SelectorRow;