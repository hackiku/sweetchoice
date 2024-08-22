// ~/components/contact/EmailOptin.tsx

import React, { useState } from 'react';
import { useFetcher } from '@remix-run/react';

const EmailOptin: React.FC = () => {
	const [email, setEmail] = useState('');
	const fetcher = useFetcher();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetcher.submit(
			{ email },
			{ method: 'post', action: '/api/newsletter-signup' }
		);
	};

	return (
		<div className="space-y-4">
			<h4 className="text-2xl font-black text-black uppercase">Join Newsletter</h4>
			{fetcher.data?.success ? (
				<p className="text-green-600 font-semibold">Thanks for subscribing!</p>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full px-4 py-2 text-lg border-4 border-black bg-transparent text-black placeholder-black focus:outline-none focus:ring-4 focus:ring-[#ED1C24]"
						required
					/>
					<button
						type="submit"
						disabled={fetcher.state === 'submitting'}
						className="w-full md:w-auto text-xl font-black px-8 py-2 border-4 border-black 
                     bg-[#ED1C24] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] 
                     transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)]
                     active:shadow-[2px_2px_0px_0px_rgba(0,0,0)] active:translate-x-[2px] active:translate-y-[2px]"
					>
						{fetcher.state === 'submitting' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
					</button>
				</form>
			)}
			{fetcher.data?.error && (
				<p className="text-red-600 font-semibold">{fetcher.data.error}</p>
			)}
		</div>
	);
};

export default EmailOptin;