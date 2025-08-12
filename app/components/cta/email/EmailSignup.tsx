// app/components/cta/email/EmailSignup.tsx

import React, { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface EmailSignupProps {
	variant?: 'inline' | 'stacked';
	title?: string;
	buttonText?: string;
	className?: string;
	placeholder?: string;
	successMessage?: string; // Add a prop for success message
}

const EmailSignup: React.FC<EmailSignupProps> = ({
	variant = 'inline',
	title,
	buttonText = 'Subscribe',
	className = '',
	placeholder = 'Enter your email',
	successMessage = "Thanks! We'll be in touch.", // Default success message
}) => {
	const { t } = useTranslation();
	const fetcher = useFetcher();
	const [email, setEmail] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	// Determine the component's state from the fetcher
	const isSubmitting = fetcher.state === 'submitting';
	const isSuccess = fetcher.data?.success === true;
	const submissionError = fetcher.data?.error;

	// Clear the input on successful submission
	useEffect(() => {
		if (isSuccess) {
			setEmail('');
		}
	}, [isSuccess]);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	// --- All your styling classes remain the same ---
	const containerClasses = `w-full max-w-lg mx-auto ${className}`;
	const formClasses = `flex relative ${variant === 'inline' ? 'flex-row sm:flex-row' : 'flex-col'} gap-4 w-full`;
	const inputClasses = `w-full pl-14 pr-6 py-4 border-4 border-black bg-white text-xl rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-[#39FF14] transition-all duration-200`;
	const mailIconClasses = `absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-black transition-opacity duration-200 pointer-events-none ${isFocused || email ? 'opacity-100' : 'opacity-40'}`;
	const buttonClasses = `px-8 py-4 text-xl border-4 border-black bg-[#39FF14] rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-500 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-bold whitespace-nowrap disabled:opacity-50 disabled:cursor-wait ${variant === 'stacked' ? 'w-full' : ''}`;

	// Render a success message if the submission was successful
	if (isSuccess) {
		return (
			<div className={containerClasses}>
				<div className="relative text-xl font-bold p-6 border-4 border-black bg-[#90EE90] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
			{/* Use the fetcher.Form component */}
			<fetcher.Form method="post" action="/api/newsletter" className={formClasses}>
				<div className="relative flex-1">
					<EnvelopeIcon className={mailIconClasses} />
					<input
						type="email"
						name="email" // The 'name' attribute is crucial for form submission
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder={placeholder}
						className={inputClasses}
						required
					/>
				</div>
				<button type="submit" className={buttonClasses} disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : `${buttonText} →`}
				</button>
			</fetcher.Form>
			{/* Display an error message if the API returns one */}
			{submissionError && (
				<p className="mt-2 text-red-600 font-bold">{submissionError}</p>
			)}
		</div>
	);
};

export default EmailSignup;