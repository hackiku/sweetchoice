// app/components/ui/ContactSlideOver.tsx

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { MdMail, MdPhone, MdLocationOn } from 'react-icons/md';
import ContactButton from './ContactButton';

const ContactSlideOverContext = createContext<{ openSlideOver: () => void }>({
	openSlideOver: () => { }
});

export const useContactSlideOver = () => useContext(ContactSlideOverContext);

export const ContactSlideOverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openSlideOver = () => setIsOpen(true);

	return (
		<ContactSlideOverContext.Provider value={{ openSlideOver }}>
			{children}
			<ContactSlideOver isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</ContactSlideOverContext.Provider>
	);
};

const ContactSlideOver = ({ isOpen, onClose }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [orderSize, setOrderSize] = useState(50);
	const [selectedOption, setSelectedOption] = useState('Single');
	const slideOverRef = useRef(null);
	const nameInputRef = useRef(null);

	const options = [
		{ name: 'Single', emoji: '🍬' },
		{ name: 'Box', emoji: '📦' },
		{ name: 'Palette', emoji: '🎨' },
	];

	const contactDetails = [
		{ icon: MdMail, text: 'info@sweetchoice.com' },
		{ icon: MdPhone, text: '+381 11 123 4567' },
		{ icon: MdLocationOn, text: 'Belgrade, Serbia' },
	];

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (slideOverRef.current && !slideOverRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
			nameInputRef.current?.focus();
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ name, email, selectedOption, orderSize });
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
						<h2 className="text-3xl font-bold text-black">Let's Talk Biz</h2>
						<button
							onClick={onClose}
							className="p-2 hover:bg-[#FF6B6B] rounded-full transition-colors duration-200"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div className="grid grid-cols-1 gap-4 mb-6">
						{contactDetails.map((detail, index) => (
							<div key={index} className="flex items-center">
								<detail.icon className="w-6 h-6 mr-2" />
								<span className="text-xl font-semibold">{detail.text}</span>
							</div>
						))}
					</div>

					<hr className='my-4 border-black border-2' />

					<h3 className="text-2xl font-bold text-black mb-4">Get Catalog</h3>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="relative">
							<input
								ref={nameInputRef}
								type="text"
								id="name"
								placeholder='Willie Wonka'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800 italic pl-8"
								required
							/>
							<div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-black animate-blink"></div>
						</div>
						<div>
							<input
								type="email"
								id="email"
								placeholder='willie@disney.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800 italic"
								required
							/>
						</div>
						<div>
							<label htmlFor="orderSize" className="block text-lg font-semibold text-black mb-2">
								Approx Order Weight
							</label>
							<div className="relative">
								<div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent rounded-full overflow-hidden">
									<div className="h-full bg-[#90EE90]" style={{ width: `${(orderSize - 10) / 990 * 100}%` }}></div>
								</div>
								<input
									type="range"
									id="orderSize"
									min="10"
									max="1000"
									step="10"
									value={orderSize}
									onChange={(e) => setOrderSize(Number(e.target.value))}
									className="w-full h-12 appearance-none bg-transparent cursor-pointer"
								/>
								<div
									className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 bg-[#FF6B6B] border-4 border-black rounded-full flex items-center justify-center text-black font-bold"
									style={{ left: `calc(${(orderSize - 10) / 990 * 100}% - 24px)` }}
								>
									{orderSize}
								</div>
							</div>
							<div className="flex justify-between text-sm mt-1">
								<span>10 kg</span>
								<span>1000 kg</span>
							</div>
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
						<ContactButton onClick={handleSubmit} className="w-full" text="Send Message" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactSlideOver;