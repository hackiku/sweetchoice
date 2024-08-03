// app/components/ui/ArrowButton.tsx

import React from 'react';

interface ArrowButtonProps {
	direction: 'left' | 'right';
	onClick?: () => void;  // Make onClick optional
	bgColor?: string;
	className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
	direction,
	onClick,
	bgColor = 'white',
	className = ''
}) => {

	const baseClasses = `
    w-24 h-24 rounded-full border-2 border-black 
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    flex items-center justify-center text-4xl 
    hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
    transition-all duration-200
  `;

	const positionClasses = direction === 'left'
		? 'absolute -left-8 top-1/2 transform -translate-y-1/2'
		: 'absolute -right-8 top-1/2 transform -translate-y-1/2';
 
	return (
		<button
			onClick={onClick || (() => { })}  // Use a no-op function if onClick is not provided
			className={`${baseClasses} ${positionClasses} ${className}`}
			style={{ backgroundColor: bgColor }}
			aria-label={direction === 'left' ? 'Previous' : 'Next'}
		>
			{direction === 'left' ? '←' : '→'}
		</button>
	);
};

export default ArrowButton;

