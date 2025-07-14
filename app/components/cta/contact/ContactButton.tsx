// app/components/cta/contact/ContactButton.tsx

import React from 'react';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from './ContactContext';

interface ContactButtonProps {
	shrinkOnMobile?: boolean;
	className?: string;
	size?: 'normal' | 'large';
}

const ContactButton: React.FC<ContactButtonProps> = ({
	shrinkOnMobile = true,
	className = '',
	size = 'normal'
}) => {
	const { isOpen, openContact, closeContact } = useContact();
	const { t } = useTranslation();

	const baseClasses = `
		flex justify-center items-center 
		border-4 border-black transition-all duration-300
		shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
		hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
		active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
		active:translate-x-[2px] active:translate-y-[2px]
		font-bold whitespace-nowrap
		bg-[#FFE135] text-black hover:bg-[#FFD700]
		cursor-pointer
	`;

	// Larger sizing for hero use
	const sizeClasses = size === 'large'
		? 'px-8 py-4 text-xl md:px-12 md:py-6 md:text-2xl rounded-lg'
		: shrinkOnMobile
			? 'z-40 h-16 rounded-full md:w-auto md:h-auto md:rounded-lg md:px-8 md:py-4'
			: 'px-6 py-4 rounded-lg';

	const textClasses = shrinkOnMobile && size !== 'large'
		? 'hidden md:inline'
		: 'inline';

	const emojiClasses = shrinkOnMobile && size !== 'large'
		? 'md:hidden text-2xl'
		: 'mr-2 text-xl';

	// Get the appropriate text based on current locale
	const buttonText = t('home.hero.ctaText') || 'Get Catalog →';

	return (
		<button
			onClick={isOpen ? closeContact : openContact}
			className={`${baseClasses} ${sizeClasses} ${className}`}
		>
			<span className={emojiClasses}>{isOpen ? '×' : '📋'}</span>
			<span className={textClasses}>{buttonText}</span>
		</button>
	);
};

export default ContactButton;