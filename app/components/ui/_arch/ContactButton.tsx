// app/components/ui/ContactButton.tsx

import React from 'react';

interface ContactButtonProps {
	onClick: () => void;
	className?: string;
	text?: string;
	emoji?: string;
	bgColor?: string;
	textColor?: string;
	hoverBgColor?: string;
	hoverTextColor?: string;
	shrinkOnMobile?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({
	onClick,
	className = '',
	text = 'Contact Us',
	emoji = '👋',
	bgColor = 'bg-[#ED1C24]', // Default brand color
	textColor = 'tesxt-white',
	hoverBgColor = 'hover:bg-[#AE7AFF]',
	hoverTextColor = 'hover:text-black',
	shrinkOnMobile = false
}) => {
	const baseClasses = `
    flex justify-center items-center
    px-6 py-3 border-2 border-black
    font-bold text-lg transition-all duration-300
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px]
  `;

	const colorClasses = `${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor}`;

	const sizeClasses = shrinkOnMobile
		? 'w-12 h-12 rounded-full sm:w-auto sm:h-auto sm:rounded-none sm:px-6 sm:py-3'
		: '';

	const contentClasses = shrinkOnMobile
		? 'hidden sm:inline'
		: 'inline';

	return (
		<button
			onClick={onClick}
			className={`
        ${baseClasses}
        ${colorClasses}
        ${sizeClasses}
        ${className}
      `}
		>
			<span className={contentClasses}>{text}</span>
			{shrinkOnMobile && <span className="sm:hidden">{emoji}</span>}
		</button>
	);
};

export default ContactButton;