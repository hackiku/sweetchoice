// app/components/cta/email/EmailSignup.tsx

import React, { useState } from 'react';
import { useTranslation } from '~/lib/i18n/useTranslation';
// import { Mail } from 'lucide-react';
import { EnvelopeIcon } from '@heroicons/react/24/outline'; 

interface EmailSignupProps {
	variant?: 'inline' | 'stacked';
	title?: string;
	buttonText?: string;
	className?: string;
	placeholder?: string;
}

const EmailSignup: React.FC<EmailSignupProps> = ({
	variant = 'inline',
	title,
	buttonText = 'Subscribe',
	className = '',
	placeholder = "Enter your email"
}) => {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [showMessage, setShowMessage] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowMessage(true);
	};

	const handleDismiss = () => {
		setShowMessage(false);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const containerClasses = `
		w-full max-w-lg mx-auto 
    ${className}
  `;

	const formClasses = `
    flex relative ${variant === 'inline' ? 'flex-row sm:flex-row' : 'flex-col'} 
    gap-4 w-full
  `;

	const inputClasses = `
    w-full pl-14 pr-6 py-4 border-4 border-black bg-white text-xl rounded-lg
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    focus:outline-none focus:bg-[#39FF14]
    transition-all duration-200
  `;

	const mailIconClasses = `
    absolute left-6 h-full h-6 w-6 text-black
    transition-opacity duration-200 pointer-events-none
    ${isFocused || email ? 'opacity-100' : 'opacity-40'}
  `;

	const buttonClasses = `
    px-8 py-4 text-xl border-4 border-black bg-[#39FF14] rounded-lg
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    hover:bg-orange-500 [#39FF14]
    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px]
    transition-all duration-200 font-bold whitespace-nowrap
    ${variant === 'stacked' ? 'w-full' : ''}
  `;

	if (showMessage) {
		return (
			<div className={containerClasses}>
				<div className="relative text-xl font-bold p-6 border-4 border-black bg-[#90EE90] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					{t('contact.newsletter.comingSoon.message')} <br />
					<a
						href="mailto:info@sweetchoice.rs"
						className="underline hover:text-orange-600 transition-colors"
					>
						info@sweetchoice.rs
					</a>
					<button
						onClick={handleDismiss}
						className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-[#FF6B6B] text-black rounded-full border-2 border-black"
						aria-label="Dismiss message"
					>
						<span className="text-xl font-bold">×</span>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={containerClasses}>
			{title && (
				<h4 className="text-2xl font-black text-black uppercase mb-4">{title}</h4>
			)}
			<form onSubmit={handleSubmit} className={formClasses}>
				<div className="relative flex-1">
					<EnvelopeIcon className={mailIconClasses} />
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder={placeholder}
						className={inputClasses}
						required
					/>
				</div>
				<button
					type="submit"
					className={buttonClasses}
				>
					{buttonText} →
				</button>
			</form>
		</div>
	);
};

export default EmailSignup;