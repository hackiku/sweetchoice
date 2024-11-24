// app/components/contact/EmailSignup.tsx
import React, { useState } from 'react';
import { useFetcher } from '@remix-run/react';

interface EmailSignupProps {
	variant?: 'inline' | 'stacked';
	title?: string;
	buttonText?: string;
	className?: string;
	successMessage?: string;
	placeholder?: string;
}

const EmailSignup: React.FC<EmailSignupProps> = ({
	variant = 'inline',
	title,
	buttonText = 'Subscribe',
	className = '',
	successMessage = "You're in! Thanks for subscribing.",
	placeholder = "Enter your email"
}) => {
	const [email, setEmail] = useState('');
	const fetcher = useFetcher();

	const isSubmitting = fetcher.state === 'submitting';
	const isSuccess = fetcher.data?.success;
	const error = fetcher.data?.error;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('_action', 'SUBSCRIBE');

		fetcher.submit(formData, {
			method: 'post',
			action: '/api/newsletter'
		});
	};

	// Style classes following your existing design system
	const containerClasses = `
    w-full max-w-lg mx-auto 
    ${className}
  `;

	const formClasses = `
    flex ${variant === 'inline' ? 'flex-row sm:flex-row' : 'flex-col'} 
    gap-4 w-full
  `;

	const inputClasses = `
    flex-1 px-6 py-4 border-4 border-black bg-white text-xl
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
    focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    focus:outline-none focus:bg-[#FFA6F6] 
    transition-all duration-200
  `;

	const buttonClasses = `
    px-8 py-4 text-xl border-4 border-black bg-orange-400
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    active:translate-x-[2px] active:translate-y-[2px]
    transition-all duration-200 font-bold whitespace-nowrap
    ${variant === 'stacked' ? 'w-full' : ''}
  `;

	if (isSuccess) {
		return (
			<div className={containerClasses}>
				<div className="text-xl font-bold p-6 border-4 border-black bg-[#90EE90] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					{successMessage}
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
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={placeholder}
					className={inputClasses}
					required
					disabled={isSubmitting}
				/>
				<button
					type="submit"
					className={buttonClasses}
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Subscribing...' : buttonText} →
				</button>
			</form>
			{error && (
				<p className="mt-2 text-red-600 font-semibold">{error}</p>
			)}
		</div>
	);
};

export default EmailSignup;
