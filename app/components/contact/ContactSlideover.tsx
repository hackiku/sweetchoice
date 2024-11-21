// app/components/contact/ContactSlideOver.tsx
import React, { useRef, useState, useEffect } from 'react';
import { MdMail, MdPhone, MdLocationOn, MdClose, MdContentCopy } from 'react-icons/md';
import { useFetcher } from '@remix-run/react';
import { useContact } from './ContactContext';
import ContactForm from './ContactForm';

interface ContactSlideOverProps {
	onClose: () => void;
}

const contactDetails = [
	{
		icon: MdMail,
		text: 'info@sweetchoice.rs',
		action: 'mailto:info@sweetchoice.rs',
		expandedInfo: null,
	},
	{
		icon: MdPhone,
		text: '+381 63 111 33 11',
		action: 'tel:+381631113311',
		expandedInfo: null,
	},
	{
		icon: MdLocationOn,
		text: 'Belgrade, Serbia',
		action: 'https://maps.google.com/?q=Nemanjina+7+11080+Belgrade+Serbia',
		expandedInfo: `Nemanjina 7
11080 Belgrade
Serbia
P.I.B. - 108257834
M.B. - 20963026`,
	},
];

const ContactSlideOver: React.FC<ContactSlideOverProps> = ({ onClose }) => {
	const { selectedProducts } = useContact();
	const fetcher = useFetcher();
	const [isFormExpanded, setIsFormExpanded] = useState(false);
	const [copiedInfo, setCopiedInfo] = useState<string | null>(null);
	const [expandedContact, setExpandedContact] = useState<number | null>(null);
	const slideOverRef = useRef<HTMLDivElement>(null);

	// Prevent body scroll when slide-over is open
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	// Handle outside clicks
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (slideOverRef.current && !slideOverRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [onClose]);

	const copyToClipboard = (text: string, fullInfo?: string) => {
		navigator.clipboard.writeText(fullInfo || text).then(() => {
			setCopiedInfo(text);
			setTimeout(() => setCopiedInfo(null), 2000);
		});
	};

	const handleClearCatalog = () => {
		const formData = new FormData();
		formData.append('_action', 'CLEAR_CATALOG');
		fetcher.submit(formData, {
			method: 'post',
			action: '/api/contact',
		});
	};

	const handleRemoveProduct = (productId: string) => {
		const formData = new FormData();
		formData.append('_action', 'REMOVE_PRODUCT');
		formData.append('productId', productId);
		fetcher.submit(formData, {
			method: 'post',
			action: '/api/contact',
		});
	};

	const handleFormSuccess = () => {
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 z-50">
			<div className="flex items-start justify-end h-full">
				<div
					ref={slideOverRef}
					className="bg-[#AE7AFF] w-full max-w-md h-[calc(100vh-2rem)] mt-4 
                   rounded-l-3xl border-l-4 border-y-4 border-black 
                   shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
				>
					{/* Scrollable Content Area */}
					<div className="flex-grow overflow-y-auto">
						<div
							className="p-6"
							style={{
								backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
								backgroundSize: '20px 20px'
							}}
						>
							{/* Header */}
							<h2
								className="text-4xl font-black text-orange-400 uppercase italic mb-6"
								style={{
									WebkitTextStroke: '3px black',
									textStroke: '3px black',
									textShadow: '-0.1em 0.12em 0 #000',
									filter: 'drop-shadow(0 0 1px black)'
								}}
							>
								CONTACT & CATALOG
							</h2>

							{/* Contact Details */}
							<div className="space-y-1 mb-6">
								{contactDetails.map((detail, index) => (
									<div key={index} className="relative">
										<div
											className={`
                        relative overflow-hidden transition-all duration-300
                        ${expandedContact === index ? 'bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]' : ''}
                        rounded-xl
                      `}
											onMouseEnter={() => detail.expandedInfo && setExpandedContact(index)}
											onMouseLeave={() => setExpandedContact(null)}
										>
											<a
												href={detail.action}
												target={detail.icon === MdLocationOn ? '_blank' : undefined}
												rel={detail.icon === MdLocationOn ? 'noopener noreferrer' : undefined}
												className="flex items-center group p-2 hover:bg-white
                                 transition-colors hover:border-2 hover:border-black 
                                 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl"
												onClick={(e) => {
													if (detail.expandedInfo) {
														e.preventDefault();
													}
												}}
											>
												<detail.icon className="w-6 h-6 mr-3 text-black group-hover:text-[#FF6B6B]" />
												<div className="flex-1">
													<span className="text-xl font-semibold group-hover:text-[#FF6B6B]">
														{detail.text}
													</span>
													{expandedContact === index && detail.expandedInfo && (
														<div className="mt-2 text-sm whitespace-pre-line">
															{detail.expandedInfo}
														</div>
													)}
												</div>
												<button
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														copyToClipboard(
															detail.text,
															detail.expandedInfo || detail.text
														);
													}}
													className="ml-auto"
												>
													{copiedInfo === detail.text ? (
														<span className="text-green-500">✓</span>
													) : (
														<MdContentCopy className="text-black group-hover:text-[#FF6B6B]" />
													)}
												</button>
											</a>
										</div>
									</div>
								))}
							</div>

							<hr className="my-4 border-black border-2" />

							{/* Selected Products */}
							<div className="mb-4">
								<div className="flex justify-between items-center mb-2">
									<h3 className="text-2xl font-bold text-black">Selected Products</h3>
									{selectedProducts.length > 0 && (
										<button
											onClick={handleClearCatalog}
											className="px-3 py-2 bg-red-400 text-black font-bold border-2 
                               border-black rounded-xl hover:bg-red-500 transition-colors"
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
												className="flex items-center gap-2 bg-[#FFF59F] rounded-xl 
                               border-2 border-black p-2"
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
													onClick={() => handleRemoveProduct(product.id)}
													className="p-1 bg-red-400 text-black rounded-lg border-2 
                                 border-black hover:bg-red-500 transition-colors"
												>
													<MdClose size={20} />
												</button>
											</div>
										))
									) : (
										<div className="text-center p-4 bg-[#FFF59F] border-2 border-black rounded-xl">
											<p className="text-black font-bold">No products selected yet</p>
											<p className="text-sm text-black mt-2">
												Browse our catalog and click "Add to Catalog" to start building your selection
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Fixed Contact Form at Bottom */}
					<div className="sticky bottom-0 w-full">
						<ContactForm
							isExpanded={isFormExpanded}
							onExpandToggle={() => setIsFormExpanded(!isFormExpanded)}
							onSuccess={handleFormSuccess}
						/>
					</div>
				</div>

				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 w-16 h-16 bg-[#FF6B6B] text-black 
                   font-bold text-2xl rounded-full border-4 border-black 
                   shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                   hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                   active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                   active:translate-x-[2px] active:translate-y-[2px] 
                   transition-all duration-200 flex items-center justify-center"
				>
					×
				</button>
			</div>
		</div>
	);
};

export default ContactSlideOver;