// app/components/ui/ContactModal.tsx

import React, { useState, useEffect, useRef } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdPerson } from 'react-icons/md';

interface ContactModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const contactDetails = [
		{
			icon: MdMail,
			text: 'info@sweetchoice.rs',
			action: 'mailto:info@sweetchoice.rs',
			onClick: () => window.location.href = 'mailto:info@sweetchoice.rs'
		},
		{
			icon: MdPhone,
			text: '+381 63 111 33 11',
			action: 'tel:+381631113311',
			onClick: () => window.location.href = 'tel:+381631113311'
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
		console.log({ name, email });
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
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-stretch justify-end" style={{ zIndex: 9999 }}>
			<div
				ref={modalRef}
				className="bottom-8 md:bottom-0 md:top-12 bg-[#AE7AFF] w-full max-w-md border-4 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out transform translate-x-0 flex flex-col"
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

					<h3 className="text-2xl font-bold text-black mb-4">Selected Products</h3>

					<div className="w-full aspect-square rounded-lg bg-[#FFF59F] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
						{/* Product list will go here */}
					</div>
				</div>

				<div className="p-4 border-t-4 border-black bg-[#AE7AFF]">
					<form onSubmit={handleSubmit} className="space-y-2">
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
							Get Catalog
						</button>
						<p className="text-sm text-center mt-2 text-black/80">
							We'll send you our complete product catalog, including your selected items and many more seasonal favorites.
						</p>
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