import React, { useState, useRef, useEffect } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdPerson, MdClose } from 'react-icons/md';
import { useContact } from './ContactContext';

interface ContactSlideOverProps {
	onClose: () => void;
}

const contactDetails = [
	{
		icon: MdMail,
		text: 'info@sweetchoice.rs',
		action: 'mailto:info@sweetchoice.rs',
	},
	{
		icon: MdPhone,
		text: '+381 63 111 33 11',
		action: 'tel:+381631113311',
	},
	{
		icon: MdLocationOn,
		text: 'Belgrade, Serbia',
		action: 'https://maps.google.com/?q=Belgrade,Serbia',
	},
];

const ContactSlideOver: React.FC<ContactSlideOverProps> = ({ onClose }) => {
	const { selectedProducts, toggleProduct } = useContact();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isFormExpanded, setIsFormExpanded] = useState(false);
	const slideOverRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (slideOverRef.current && !slideOverRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', {
			...formData,
			selectedProducts: selectedProducts.map(p => p.id)
		});
		onClose();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const removeAllProducts = () => {
		selectedProducts.forEach(product => toggleProduct(product));
	};

	const handleFormClick = () => {
		setIsFormExpanded(true);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-end">
			<div
				ref={slideOverRef}
				className="bg-[#AE7AFF] w-full max-w-md h-[calc(100vh-2rem)] mt-4 rounded-l-3xl border-l-4 border-y-4 border-black shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
			>
				<div className="flex-grow overflow-auto">
					<div className="p-6" style={{
						backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
						backgroundSize: '20px 20px'
					}}>
						{/* Header */}
						<h2 className="text-4xl font-black text-orange-400 uppercase italic mb-6" style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
							CONTACT & CATALOG
						</h2>

						{/* Contact Details */}
						<div className="space-y-1 mb-6">
							{contactDetails.map((detail, index) => (
								<a
									key={index}
									href={detail.action}
									className="flex items-center group p-2 hover:bg-white/20 rounded-xl transition-colors"
								>
									<detail.icon className="w-6 h-6 mr-3 text-black" />
									<span className="text-xl font-semibold">{detail.text}</span>
								</a>
							))}
						</div>

						<hr className="my-4 border-black border-2" />

						{/* Selected Products */}
						<div className="mb-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-2xl font-bold text-black">Selected Products</h3>
								{selectedProducts.length > 0 && (
									<button
										onClick={removeAllProducts}
										className="px-3 py-2 bg-red-400 text-black font-bold border-2 border-black rounded-xl hover:bg-red-500 transition-colors"
									>
										Remove All
									</button>
								)}
							</div>
							<div className="space-y-2">
								{selectedProducts.length > 0 ? (
									selectedProducts.map((product) => (
										<div
											key={product.id}
											className="flex items-center gap-2 bg-[#FFF59F] rounded-xl border-2 border-black p-2"
										>
											{product.featuredImage && (
												<img
													src={product.featuredImage.url}
													alt={product.title}
													className="w-12 h-12 object-cover rounded-lg border border-black"
												/>
											)}
											<span className="flex-1 font-medium truncate">{product.title}</span>
											<button
												onClick={() => toggleProduct(product)}
												className="p-1 bg-red-400 text-black rounded-lg border-2 border-black hover:bg-red-500 transition-colors"
											>
												<MdClose size={20} />
											</button>
										</div>
									))
								) : (
									<div className="text-center p-4 bg-[#FFF59F] border-2 border-black rounded-xl">
										<p className="text-black font-bold">No products selected yet</p>
										<p className="text-sm text-black mt-2">Browse our catalog and click "Add to Catalog" to start building your selection</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Contact Form */}
				<div
					ref={formRef}
					className="p-4 border-t-4 border-black bg-[#AE7AFF]"
					onClick={handleFormClick}
				>
					<form onSubmit={handleSubmit} className="space-y-2">
						<div className="relative">
							<MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
							<input
								type="text"
								name="name"
								placeholder="Willie Wonka"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full border-black border-2 p-2 pl-10 rounded-xl focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] transition-all duration-200 font-semibold text-gray-800"
								required
							/>
						</div>

						<div className="relative">
							<MdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
							<input
								type="email"
								name="email"
								placeholder="willie@disney.com"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full border-black border-2 p-2 pl-10 rounded-xl focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] transition-all duration-200 font-semibold text-gray-800"
								required
							/>
						</div>

						<textarea
							name="message"
							placeholder="What's on your mind?"
							value={formData.message}
							onChange={handleInputChange}
							className={`w-full border-black border-2 p-2 rounded-xl focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] transition-all duration-200 font-semibold text-gray-800 ${isFormExpanded ? 'h-32' : 'h-12'
								}`}
						/>

						<button
							type="submit"
							className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 text-xl"
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