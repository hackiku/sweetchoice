// app/components/ecom/GridSelector.tsx

import React, { useState, useRef, useEffect } from 'react';

interface GridSelectorProps {
	value: number;
	onChange: (value: number) => void;
}

const GridSelector: React.FC<GridSelectorProps> = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (columns: number) => {
		onChange(columns);
		setIsOpen(false);
	};

	// Generate single-row grid cells
	const generateGridCells = (columns: number) => {
		const cells = [];
		for (let i = 0; i < columns; i++) {
			cells.push(
				<div
					key={i}
					className="bg-blue-300 hover:bg-blue-400 border border-black rounded-md transition-colors duration-200"
				/>
			);
		}
		return cells;
	};

	return (
		<div ref={selectorRef} className="relative">
			<button
				type="button"
				onClick={handleButtonClick}
				className="relative grid gap-1 p-1 cursor-pointer transition-all duration-200 
				       focus:outline-none focus:ring-0 hover:scale-105 h-16 w-32"
				style={{
					gridTemplateColumns: `repeat(${value}, 1fr)`,
					gridTemplateRows: '1fr'
				}}
			>
				{generateGridCells(value)}

				{/* Center number overlay */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div className="bg-[#FF6B6B] text-white font-black text-lg rounded-full w-8 h-8 flex items-center justify-center border-2 border-black">
						{value}
					</div>
				</div>
			</button>

			{isOpen && (
				<div
					className={`absolute z-50 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden
					top-full mt-2 right-0`}
				>
					<div className="p-4 flex flex-col gap-2">
						{[1, 2, 3, 4, 5, 6].map((columns) => (
							<button
								key={columns}
								onClick={() => handleOptionClick(columns)}
								className={`relative grid gap-1 p-1 cursor-pointer transition-all duration-200 
								       focus:outline-none focus:ring-0 hover:scale-105 h-8 w-24
								       ${value === columns ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
								style={{
									gridTemplateColumns: `repeat(${columns}, 1fr)`,
									gridTemplateRows: '1fr'
								}}
							>
								{/* Mini grid cells */}
								{Array.from({ length: columns }, (_, i) => (
									<div
										key={i}
										className={`border border-black rounded-sm
										       ${value === columns ? 'bg-[#FFE135]' : 'bg-gray-200 hover:bg-gray-300'}`}
									/>
								))}

								{/* Mini center number */}
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
									<div className={`font-black text-xs rounded-full w-4 h-4 flex items-center justify-center border border-black
									       ${value === columns ? 'bg-[#ED1C24] text-white' : 'bg-white text-black'}`}>
										{columns}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default GridSelector;