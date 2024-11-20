import React, { useState, useRef, useEffect } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdPerson } from 'react-icons/md';
import { useContact } from './ContactContext';
import { Money } from '@shopify/hydrogen';

interface ContactSlideOverProps {
	onClose: () => void;
}

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

const ContactSlideOver: React.FC<ContactSlideOverProps> = ({ onClose }) => {
	const { selectedProducts } = useContact();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		orderSize: 50
	});
	const [focusedInput, setFocusedInput] = useState(null);
	const slideOverRef = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (slideOverRef.current && !slideOverRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [onClose]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log('Form submitted:', {
				...formData,
				selectedProducts: selectedProducts.map(p => p.id)
			});
			onClose();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-end">
			<div
				ref={slideOverRef}
				className="bg-[#AE7AFF] w-full max-w-md rounded-l-3xl border-l-4 border-y-4 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out transform translate-x-0 flex flex-col"
				style={{
					height: 'calc(100% - 2rem)',
					marginTop: '1rem',
					marginBottom: '1rem',
				}}
			>
				<div className="flex-grow overflow-auto">
					<div className="p-6" style={{
						backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
						backgroundSize: '20px 20px'
					}}>
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-4xl font-black text-orange-400 uppercase italic" style={{
								WebkitTextStroke: '3px black',
								textStroke: '3px black',
								textShadow: '-0.1em 0.12em 0 #000',
								filter: 'drop-shadow(0 0 1px black)'
							}}>
								CONTACT & CATALOG
							</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-[#FF6B6B] rounded-full transition-colors duration-200"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						{/* Contact Details */}
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

						<hr className="my-4 border-black border-2" />

						{/* Selected Products */}
						<h3 className="text-2xl font-bold text-black mb-4">Selected Products</h3>
						<div className="grid grid-cols-2 gap-4 mb-6">
							{selectedProducts.length > 0 ? (
								selectedProducts.map((product) => (
									<div
										key={product.id}
										className="aspect-square bg-[#FFF59F] p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative"
									>
										{product.featuredImage && (
											<img
												src={product.featuredImage.url}
												alt={product.title}
												className="w-full h-full object-cover border border-black"
											/>
										)}
										<div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50">
											<p className="text-white text-sm truncate">{product.title}</p>
										</div>
									</div>
								))
							) : (
								<div className="col-span-2 text-center p-4 bg-[#FFF59F] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
									<p className="text-black font-bold">No products selected yet</p>
									<p className="text-sm text-black mt-2">Browse our catalog and click "Add to Catalog" to start building your selection</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Contact Form */}
				<div className="p-4 border-t-4 border-black bg-[#AE7AFF]">
					<form onSubmit={handleSubmit} className="space-y-4">


						<div className="relative">
							<MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Willie Wonka"
								value={formData.name}
								onChange={handleInputChange}
								onFocus={() => setFocusedInput('name')}
								onBlur={() => setFocusedInput(null)}
								className="w-full border-black border-2 p-2 pl-10 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800"
								required
							/>
						</div>

						<div className="relative">
							<MdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
							<input
								type="email"
								id="email"
								name="email"
								placeholder="willie@disney.com"
								value={formData.email}
								onChange={handleInputChange}
								onFocus={() => setFocusedInput('email')}
								onBlur={() => setFocusedInput(null)}
								className="w-full border-black border-2 p-2 pl-10 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800"
								required
							/>
						</div>

						<textarea
							id="message"
							name="message"
							placeholder="Any specific requirements or questions?"
							value={formData.message}
							onChange={handleInputChange}
							className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800"
							rows={4}
						/>

						<button
							type="submit"
							className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 text-xl"
						>
							Get Catalog →
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

export default ContactSlideOver;