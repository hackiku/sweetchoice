// app/components/ui/IconToggleButton.tsx

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface IconToggleButtonProps {
	isOpen: boolean;
	onClick: () => void;
	icon: React.ReactNode;
	label?: string;
	className?: string;
	variant?: 'contact' | 'menu';
}

const IconToggleButton: React.FC<IconToggleButtonProps> = ({
	isOpen,
	onClick,
	icon,
	label = '',
	className = '',
	variant = 'contact'
}) => {
	// Base classes for all buttons
	const baseClasses = `
    relative w-12 h-12 flex items-center justify-center
    border-4 border-black transition-all duration-200
    hover:scale-105 active:scale-95
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    active:shadow-[2px_2px_0px_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px]
  `;

	// Variant-specific classes
	const variantClasses = {
		contact: `rounded-full ${isOpen ? 'bg-[#FF6B6B]' : 'bg-blue-500'} hover:bg-black text-black hover:text-white`,
		menu: `md:hidden rounded-full ${isOpen ? 'bg-[#ED1C24]' : 'bg-white'} hover:bg-black text-black hover:text-white`
	};

	// Combine all classes
	const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
  `;

	return (
		<button
			onClick={onClick}
			className={buttonClasses}
			aria-label={label}
		>
			<div
				className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300
          ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `}
			>
				{icon}
			</div>
			<div
				className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300
          ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}
        `}
			>
				<XMarkIcon className={`w-6 h-6 ${isOpen ? 'text-white' : ''}`} />
			</div>
		</button>
	);
};

export default IconToggleButton;