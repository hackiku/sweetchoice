// ~/components/contact/EmailOptin.tsx

import React, { useState } from 'react';

const EmailOptin: React.FC = () => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitted email:', email);
		setIsSubmitted(true);
	};

	const handleDismiss = () => {
		setIsSubmitted(false);
		setEmail('');
	};

	return (
		<div className="space-y-4">
			<h4 className="text-2xl font-black text-black uppercase">Join Newsletter</h4>
			{isSubmitted ? (
				<div className="w-full relative overflow-hidden bg-[#90EE90] py-4 px-4 sm:px-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
					style={{
						backgroundImage: 'radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)',
						backgroundSize: '20px 20px',
						backgroundPosition: '0 0, 10px 10px'
					}}>
					<h2 className="text-3xl font-black text-blue-400 uppercase italic" style={{
						WebkitTextStroke: '2px black',
						textStroke: '2px black',
						textShadow: '-0.1em 0.12em 0 #000',
						filter: 'drop-shadow(0 0 1px black)'
					}}>
						you're in!
					</h2>
					<p className="text-xl font-black text-green-200 uppercase italic mb-4" style={{
						WebkitTextStroke: '1px black',
						textStroke: '1px black',
						textShadow: '-0.1em 0.1em 0 #000',
						filter: 'drop-shadow(0 0 1px black)'
					}}>
						{email}
					</p>
					<button
						onClick={handleDismiss}
						className="w-full md:w-auto text-xl font-black px-8 py-2 border-4 border-black 
                     bg-[#FFA6F6] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] 
                     transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)]
                     active:shadow-[2px_2px_0px_0px_rgba(0,0,0)] active:translate-x-[2px] active:translate-y-[2px]"
					>
						Alright 👍
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full px-4 py-2 text-lg border-4 border-black bg-transparent text-black placeholder-black focus:outline-none focus:ring-4 focus:ring-[#ED1C24]"
							required
						/>
						{email && (
							<div
								className="absolute inset-0 bg-[#FFA6F6] -z-10"
								style={{
									clipPath: `polygon(0 0, ${(email.length / 30) * 100}% 0, ${(email.length / 30) * 100}% 100%, 0 100%)`
								}}
							/>
						)}
					</div>
					<button
						type="submit"
						className="w-full md:w-auto text-xl font-black px-8 py-2 border-4 border-black 
                     bg-[#ED1C24] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] 
                     transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)]
                     active:shadow-[2px_2px_0px_0px_rgba(0,0,0)] active:translate-x-[2px] active:translate-y-[2px]"
					>
						SUBSCRIBE
					</button>
				</form>
			)}
		</div>
	);
};

export default EmailOptin;