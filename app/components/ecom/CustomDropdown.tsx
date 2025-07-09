// app/components/ecom/CustomDropdown.tsx

import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
	value: string;
	label: string;
}

interface CustomDropdownProps {
	options: DropdownOption[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	bgColor?: string;
	hoverBgColor?: string;
	name: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Select...',
	bgColor = 'bg-pink-300',
	hoverBgColor = 'hover:bg-pink-400',
	name
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const selectedOption = options.find(opt => opt.value === value);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

	const handleOptionClick = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={`border-4 border-black p-3 font-bold ${bgColor} cursor-pointer 
				       transform hover:scale-105 transition-all duration-200 
				       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
				       hover:shadow-[6px_6px_0px_0px_rgba(237,28,36,1)]
				       ${hoverBgColor} rounded-xl text-lg
				       focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_rgba(237,28,36,1)]
				       flex items-center justify-between min-w-[180px]`}
			>
				<span>{selectedOption?.label || placeholder}</span>
				<svg
					className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute z-50 w-full mt-2 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
					{options.map((option) => (
						<button
							key={option.value}
							onClick={() => handleOptionClick(option.value)}
							className={`w-full px-4 py-3 text-left font-bold hover:bg-gray-100 
							       border-b-2 border-black last:border-b-0 transition-colors duration-200
							       ${value === option.value ? 'bg-[#FFE135]' : 'bg-white'}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;