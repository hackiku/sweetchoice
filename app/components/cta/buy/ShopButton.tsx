// app/components/cta/buy/ShopButton.tsx

import React from 'react';
import { Link } from '@remix-run/react';

interface ShopButtonProps {
	to?: string;
	bgColor?: string;
	hoverBgColor?: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

const ShopButton: React.FC<ShopButtonProps> = ({
	to = '/collections/all',
	bgColor = 'bg-white',
	hoverBgColor = 'hover:bg-[#d71e97]',
	size = 'medium',
	className = ''
}) => {
	const sizeClasses = {
		small: 'w-12 h-12',
		medium: 'w-16 h-16',
		large: 'w-20 h-20'
	};

	const iconSizes = {
		small: '20',
		medium: '24',
		large: '28'
	};

	return (
		<Link
			to={to}
			className={`
				${sizeClasses[size]} 
				flex-shrink-0 
				border-4 border-black 
				${bgColor} ${hoverBgColor}
				text-black 
				shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
				hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
				active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
				active:translate-x-[2px] active:translate-y-[2px]
				transition-all duration-200 
				flex items-center justify-center
				rounded-full
				${className}
			`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={iconSizes[size]}
				height={iconSizes[size]}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="8" cy="21" r="1" />
				<circle cx="19" cy="21" r="1" />
				<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
			</svg>
		</Link>
	);
};

export default ShopButton;