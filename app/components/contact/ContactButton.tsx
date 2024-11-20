import React from 'react';
import { useContact } from './ContactContext';

const ContactButton = ({
	shrinkOnMobile = true,
	className = ''
}) => {
	const { isOpen, openContact, closeContact } = useContact();

	const baseClasses = `
    flex justify-center items-center 
    border-4 border-black transition-all duration-300
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
    active:translate-x-[2px] active:translate-y-[2px]
    font-semibold whitespace-nowrap
    bg-[#d71e97] text-black hover:bg-[#AE7AFF]
  `;

	const sizeClasses = shrinkOnMobile
		? 'fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full md:w-auto md:h-auto md:rounded-none md:px-6 md:py-4'
		: 'px-6 py-4';

	const textClasses = shrinkOnMobile
		? 'hidden md:inline'
		: 'inline';

	const emojiClasses = shrinkOnMobile
		? 'md:hidden text-2xl'
		: 'hidden';

	return (
		<button
			onClick={isOpen ? closeContact : openContact}
			className={`
        ${baseClasses}
        ${sizeClasses}
        ${className}
      `}
		>
			<span className={textClasses}>Talk Biz →</span>
			<span className={emojiClasses}>{isOpen ? '×' : '👋'}</span>
		</button>
	);
};

export default ContactButton;