// app/components/cta/contact/ContactButton.tsx

import React from 'react';

interface ContactButtonProps {
	onClick?: () => void;
	text?: string;
	bgColor?: string;
	hoverBgColor?: string;
	textColor?: string;
	hoverTextColor?: string;
	className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
	onClick,
	text = 'Get Catalog →',
	bgColor = 'bg-[#FFE135]',
	hoverBgColor = 'hover:bg-[#FFD700]',
	textColor = 'text-black',
	hoverTextColor = 'hover:text-black',
	className = ''
}) => {
	return (
		<button
			onClick={onClick}
			className={`
				flex justify-center items-center 
				px-6 py-3 sm:px-8 sm:py-4
				border-4 border-black rounded-xl
				transition-all duration-200
				shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
				hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
				active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
				active:translate-x-[2px] active:translate-y-[2px]
				font-bold whitespace-nowrap
				${bgColor} ${hoverBgColor} ${textColor} ${hoverTextColor}
				cursor-pointer
				text-lg sm:text-xl
				${className}
			`}
		>
			{text}
		</button>
	);
};

export default ContactButton;