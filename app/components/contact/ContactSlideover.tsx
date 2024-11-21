// app/components/contact/ContactSlideOver.tsx
import React, { useRef, useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useFetcher } from '@remix-run/react';
import { useContact } from './ContactContext';
import { ContactDetails } from './ContactDetails';
import ContactForm from './ContactForm';

interface ContactSlideOverProps {
	onClose: () => void;
}

const ContactSlideOver: React.FC<ContactSlideOverProps> = ({ onClose }) => {
	const { selectedProducts } = useContact();
	const fetcher = useFetcher();
	const [isFormExpanded, setIsFormExpanded] = useState(false);
	const slideOverRef = useRef<HTMLDivElement>(null);

	// Prevent body scroll when slide-over is open
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = 'unset'; };
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

	// Catalog management functions
	const handleClearCatalog = () => {
		fetcher.submit(
			{ _action: 'CLEAR_CATALOG' },
			{ method: 'post', action: '/api/contact' }
		);
	};

	const handleRemoveProduct = (productId: string) => {
		fetcher.submit(
			{ _action: 'REMOVE_PRODUCT', productId },
			{ method: 'post', action: '/api/contact' }
		);
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

							{/* Contact Details Section */}
							<ContactDetails />

							<hr className="my-4 border-black border-2" />

							{/* Selected Products Section */}
							<div className="mb-4">
								<div className="flex justify-between items-center mb-2">
									<h3 className="text-2xl font-bold text-black">Selected Products</h3>
									{selectedProducts.length > 0 && (
										<button
											onClick={handleClearCatalog}
											className="px-3 py-2 bg-red-400 text-black font-bold 
                               border-2 border-black rounded-xl 
                               hover:bg-red-500 transition-colors
                               shadow-[2px_2px_0px_rgba(0,0,0,1)]
                               hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
											disabled={fetcher.state === 'submitting'}
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
												className="flex items-center gap-2 bg-[#FFF59F] 
                                 rounded-xl border-2 border-black p-2
                                 shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                 transition-all duration-200"
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
													className="p-1 bg-red-400 text-black rounded-lg 
                                   border-2 border-black hover:bg-red-500 
                                   transition-colors
                                   shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                   hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
													disabled={fetcher.state === 'submitting'}
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

					{/* Contact Form */}
					<div className="sticky bottom-0 w-full">
						<ContactForm
							isExpanded={isFormExpanded}
							onExpandToggle={() => setIsFormExpanded(!isFormExpanded)}
							onSuccess={onClose}
						/>
					</div>
				</div>

				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 w-16 h-16 bg-[#FF6B6B] 
                   text-black font-bold text-2xl rounded-full 
                   border-4 border-black
                   shadow-[4px_4px_0px_rgba(0,0,0,1)]
                   hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]
                   transition-all duration-200
                   flex items-center justify-center"
				>
					×
				</button>
			</div>
		</div>
	);
};

export default ContactSlideOver;