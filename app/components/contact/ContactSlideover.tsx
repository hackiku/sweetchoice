// app/components/contact/ContactSlideOver.tsx

import React, { useState, useRef } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdPerson } from 'react-icons/md';
import { useContact } from './ContactContext';
import { Money } from '@shopify/hydrogen';

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
		action: 'tel:+381111234567',
		onClick: () => window.location.href = 'tel:+381111234567'
	},
	{
		icon: MdLocationOn,
		text: 'Belgrade, Serbia',
		action: 'https://maps.google.com/?q=Belgrade,Serbia',
		onClick: () => window.open('https://maps.google.com/?q=Belgrade,Serbia', '_blank')
	},
];

interface FormData {
	name: string;
	email: string;
	orderSize: number;
	message: string;
}

const ContactSlideOver = () => {
	const { closeContact, selectedProducts, removeFromCatalog } = useContact();
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		orderSize: 50,
		message: ''
	});
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const slideOverRef = useRef<HTMLDivElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					selectedProducts,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			// Success! Close the contact form
			closeContact();
		} catch (error) {
			console.error('Error sending message:', error);
			// Handle error (show error message to user)
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
			<div
				ref={slideOverRef}
				className="bg-[#AE7AFF] w-full max-w-md rounded-l-3xl border-l-4 border-y-4 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out transform translate-x-0 flex flex-col"
				style={{
					height: 'calc(100% - 2rem)',
					marginTop: '1rem',
					marginBottom: '1rem',
				}}
			>
				{/* Header */}
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-4xl font-black text-orange-400 uppercase italic" style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
							LET'S TALK BIZ
						</h2>
						<button
							onClick={closeContact}
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

					<hr className='my-4 border-black border-2' />

					{/* Selected Products */}
					{selectedProducts.length > 0 && (
						<>
							<h3 className="text-2xl font-bold text-black mb-4">Your Catalog Selections</h3>
							<div className="grid grid-cols-2 gap-4 mb-6">
								{selectedProducts.map((product) => (
									<div
										key={product.id}
										className="relative bg-white p-3 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
									>
										{product.featuredImage && (
											<img
												src={product.featuredImage.url}
												alt={product.title}
												className="w-full aspect-square object-cover mb-2 border border-black"
											/>
										)}
										<h4 className="font-bold text-sm truncate">{product.title}</h4>
										{product.price && (
											<p className="text-sm">
												<Money data={product.price} />
											</p>
										)}
										<button
											onClick={() => removeFromCatalog(product.id)}
											className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B6B] rounded-full border-2 border-black flex items-center justify-center text-sm font-bold"
										>
											×
										</button>
									</div>
								))}
							</div>
						</>
					)}
				</div>

				{/* Contact Form */}
				<div className="p-4 border-t-4 border-black bg-[#AE7AFF] mt-auto">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="orderSize" className="block text-xl font-bold text-black">
								Expected Order Size: {formData.orderSize}kg
							</label>
							<input
								type="range"
								id="orderSize"
								name="orderSize"
								min="10"
								max="1000"
								step="10"
								value={formData.orderSize}
								onChange={handleInputChange}
								className="w-full"
							/>
							<div className="flex justify-between text-sm">
								<span>10 kg</span>
								<span>1000 kg</span>
							</div>
						</div>

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
							className="w-full border-black border-2 p-2 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 font-semibold text-gray-800 min-h-[100px]"
						/>

						<button
							type="submit"
							className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 text-xl"
						>
							Get Custom Catalog →
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactSlideOver;