// ~/components/contact/EmailOptin.tsx

import React, { useState } from 'react';
import { Form, useActionData } from '@remix-run/react';

/**
 * EmailOptin Component
 * 
 * This component renders an email opt-in form for newsletter subscriptions.
 * It handles its own state, submission logic, and displays a thank you message after submission.
 * 
 * @returns {JSX.Element} The rendered EmailOptin component
 */
const EmailOptin: React.FC = () => {
	const [email, setEmail] = useState('');
	const actionData = useActionData();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Form submission is handled by Remix action
	};

	return (
		<div className="space-y-4">
			<h4 className="text-2xl font-black text-black uppercase">Join Newsletter</h4>
			{actionData?.success ? (
				<p className="text-green-600 font-semibold">Thanks for subscribing!</p>
			) : (
				<Form method="post" action="/api/subscribe" onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full px-4 py-2 text-lg border-4 border-black bg-transparent text-black placeholder-black focus:outline-none focus:ring-4 focus:ring-[#ED1C24]"
						required
					/>
					<button
						type="submit"
						className="w-full md:w-auto text-xl font-black px-8 py-2 border-4 border-black 
                       bg-[#ED1C24] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] 
                       transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)]
                       active:shadow-[2px_2px_0px_0px_rgba(0,0,0)] active:translate-x-[2px] active:translate-y-[2px]"
					>
						SUBSCRIBE
					</button>
				</Form>
			)}
			{actionData?.error && (
				<p className="text-red-600 font-semibold">{actionData.error}</p>
			)}
		</div>
	);
};

export default EmailOptin;