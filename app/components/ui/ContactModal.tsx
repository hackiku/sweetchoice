// app/components/ui/ContactModal.tsx
// This file contains the ContactModal component, which has been updated to:
// 1. Extend the form to the bottom of the viewport
// 2. Add a larger, more stylized close button
// 3. Improve the overall layout and styling for a more neo-brutalist look

import React, { useState, useEffect, useRef } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdPerson } from 'react-icons/md';

interface ContactModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [orderSize, setOrderSize] = useState(50);
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const contactDetails = [
		{
			icon: MdMail,
			text: 'info@sweetchoice.com',
			action: 'mailto:info@sweetchoice.com',
			onClick: () => window.location.href = 'mailto:info@sweetchoice.com'
		},
		{
			icon: MdPhone,
			text: '+381 11 123 4567',
			action: 'tel:+38111234567',
			onClick: () => window.location.href = 'tel:+38111234567'
		},
		{
			icon: MdLocationOn,
			text: 'Belgrade, Serbia',
			action: 'https://maps.google.com/?q=Belgrade,Serbia',
			onClick: () => window.open('https://maps.google.com/?q=Belgrade,Serbia', '_blank')
		},
	];

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ name, email, orderSize });
		onClose();
	};

	const renderCursor = (inputValue: string) => {
		if (inputValue.length === 0) {
			return <div className="absolute left-10 top-1/2 transform -translate-y-1/2 w-[2px] h-5 bg-black animate-blink"></div>;
		}
		return null;
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-stretch justify-end">
			<div
				ref={modalRef}
				className="bottom-8 md:bottom-0 md:top-12 bg-[#AE7AFF] w-5/6 max-w-2xl border-4 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out transform translate-x-0 flex flex-col"
			>
				<div className="flex-grow overflow-auto p-6" style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px'
				}}>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-4xl font-black text-orange-400 uppercase italic" style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
							CONTACT & CATALOG
						</h2>
					</div>

					<div className="grid grid-cols-1 gap-4 mb-6">
						{contactDetails.map((detail, index) => (
							<button
								key={index}
								onClick={detail.onClick}
								className="flex items-center w-full text-left transition-all duration-200 group"
							>
								<detail.icon className="w-8 h-8 mr-3 text-black transition-colors duration-200 group-hover:text-[#FF6B6B]" />
								<span className="text-2xl md:text-xl font-semibold relative">
									{detail.text}
									<span className="absolute bottom-0 left-0 w-0 h-1 bg-[#FF6B6B] transition-all duration-200 group-hover:w-full"></span>
								</span>
							</button>
						))}
					</div>

					<hr className='my-4 border-black border-2' />

					<h3 className="text-2xl font-bold text-black mb-4">Your B2B Catalog</h3>

					<div className="grid grid-cols-2 gap-4 mb-6">
						{[...Array(4)].map((_, index) => (
							<div key={index} className="aspect-square rounded-lg bg-[#FFF59F] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"></div>
						))}
					</div>
				</div>

				<div className="p-4 border-t-4 border-black bg-[#AE7AFF]">
					<form onSubmit={handleSubmit} className="space-y-1ss">
						<div>
							<label htmlFor="orderSize" className="block text-xl font-bold text-black mb-2">
								Ballpark Order Weight
							</label>
							<div className="relative h-8">
								<div className="absolute top-1/2 transform -translate-y-1/2 w-full h-4 border-4 border-black rounded-full overflow-hidden">
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
									className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
								/>
								<div
									className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-16 bg-[#FF6B6B] border-4 border-black rounded-full flex flex-col items-center justify-center text-black font-bold"
									style={{ left: `calc(${(orderSize - 10) / 990 * 100}% - 24px)` }}
								>
									<div>{orderSize}</div>
									<div>Kg</div>
								</div>
							</div>
							<div className="flex justify-between text-sm mt-1">
								<span>10 kg</span>
								<span>1000 kg</span>
							</div>
						</div>
						<div className="relative">
							<MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
							<input
								type="text"
								id="name"
								placeholder='Willie Wonka'
								value={name}
								onChange={(e) => setName(e.target.value)}
								onFocus={() => setFocusedInput('name')}
								onBlur={() => setFocusedInput(null)}
								className="w-full border-black border-2 p-2 pl-10 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800"
								required
							/>
							{focusedInput === 'name' && renderCursor(name)}
						</div>
						<div className="relative">
							<MdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
							<input
								type="email"
								id="email"
								placeholder='willie@disney.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onFocus={() => setFocusedInput('email')}
								onBlur={() => setFocusedInput(null)}
								className="w-full border-black border-2 p-2 pl-10 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800 italic"
								required
							/>
							{focusedInput === 'email' && renderCursor(email)}
						</div>
						<button
							type="submit"
							className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 text-xl"
						>
							Get Custom Catalog
						</button>
					</form>
				</div>
			</div>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 w-16 h-16 bg-[#FF6B6B] text-black font-bold text-2xl rounded-full border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 flex items-center justify-center"
			>
				×
			</button>
		</div>
	);
};

export default ContactModal;