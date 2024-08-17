// app/components/ui/ContactSlideOver.tsx

import React, { useState, useEffect, useRef } from 'react';
import ContactButton from './ContactButton';

const ContactSlideOver = ({ isOpen, onClose }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [orderSize, setOrderSize] = useState(50);
	const [selectedOption, setSelectedOption] = useState('Single');
	const slideOverRef = useRef(null);

	const options = [
		{ name: 'Single', emoji: '🍬' },
		{ name: 'Box', emoji: '📦' },
		{ name: 'Palette', emoji: '🎨' },
	];

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (slideOverRef.current && !slideOverRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ name, email, selectedOption, message, orderSize });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
			<div
				ref={slideOverRef}
				className="bg-[#AE7AFF] w-full max-w-md rounded-l-3xl border-l-4 border-y-4 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out transform translate-x-0"
				style={{
					height: 'calc(100% - 2rem)',
					marginTop: '1rem',
					marginBottom: '1rem',
					overflow: 'auto',
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px'
				}}
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-3xl font-bold text-black">Contact Us</h2>
						<button
							onClick={onClose}
							className="p-2 hover:bg-[#FF6B6B] rounded-full transition-colors duration-200"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="name" className="block text-lg font-semibold text-black mb-2">Name</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold"
								required
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-lg font-semibold text-black mb-2">Email</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold"
								required
							/>
						</div>
						<div>
							<div className="flex items-center mb-2">
								<span className="text-lg font-semibold text-black mr-4">Get catalog</span>
								<div className="relative">
									<button
										type="button"
										onClick={() => setSelectedOption(prevOption => {
											const currentIndex = options.findIndex(opt => opt.name === prevOption);
											const nextIndex = (currentIndex + 1) % options.length;
											return options[nextIndex].name;
										})}
										className="flex justify-center items-center rounded-full 
                               border-4 border-black transition-all duration-300 
                               hover:scale-110 w-12 h-12 text-xl bg-black text-white 
                               shadow-[4px_4px_0px_0px_#FFFFFF]"
									>
										{options.find(opt => opt.name === selectedOption)?.emoji}
									</button>
								</div>
							</div>
						</div>
						<div>
							<label htmlFor="message" className="block text-lg font-semibold text-black mb-2">Message</label>
							<textarea
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								rows={4}
								className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold"
								required
							/>
						</div>
						<div>
							<label htmlFor="orderSize" className="block text-lg font-semibold text-black mb-2">
								Expected Order Size: {orderSize} kg
							</label>
							<input
								type="range"
								id="orderSize"
								min="10"
								max="1000"
								step="10"
								value={orderSize}
								onChange={(e) => setOrderSize(Number(e.target.value))}
								className="w-full"
							/>
							<div className="flex justify-between text-xs mt-1">
								<span>10 kg</span>
								<span>1000 kg</span>
							</div>
						</div>
						<ContactButton onClick={handleSubmit} className="w-full" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactSlideOver;