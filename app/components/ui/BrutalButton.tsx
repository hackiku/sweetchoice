// app/components/ui/BrutalButton.tsx

import React from 'react';

interface BrutalButtonProps {
	onClick: () => void;
	text?: string;
	emoji?: string;
	isOpen?: boolean;
	className?: string;
}

const BrutalButton: React.FC<BrutalButtonProps> = ({
	onClick,
	text = "Contact",
	emoji = "👋",
	isOpen = false,
	className = ""
}) => {
	const baseClasses = `
    flex items-center border-2 border-black rounded-lg
    transition-all h-14 duration-200
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px]
    font-semibold
  `;

	return (
		<button
			onClick={onClick}
			className={`
        ${baseClasses}
        ${isOpen ? 'bg-[#FF1F8F] w-12 h-12' : 'bg-[#FF1F8F] hover:bg-[#00F5FF] h-12 px-2'}
        ${className}
      `}
		>
			{isOpen ? (
				<span className="w-full text-2xl font-bold flex justify-center">×</span>
			) : (
				<div className="flex items-center">
					<span className="w-12 h-12 flex items-center justify-center text-2xl">
						{emoji}
					</span>
					{text && (
						<span className="pr-4 font-semibold whitespace-nowrap">
							{text}
						</span>
					)}
				</div>
			)}
		</button>
	);
};

export default BrutalButton;