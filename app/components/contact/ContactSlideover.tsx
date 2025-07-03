// app/components/contact/ContactSlideOver.tsx

import React, { useRef, useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useContact } from './ContactContext';
import { ContactDetails } from './ContactDetails';
import ContactForm from './ContactForm';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface ContactSlideOverProps {
	onClose: () => void;
}

const ContactSlideOver: React.FC<ContactSlideOverProps> = ({ onClose }) => {
	const { t } = useTranslation();
	const { selectedProducts, clearCatalog, removeProduct, isSubmitting } = useContact();
	const [isFormExpanded, setIsFormExpanded] = useState(false);
	const slideOverRef = useRef<HTMLDivElement>(null);

	// Prevent body scroll when slide-over is open
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = 'unset'; };
	}, []);

	// Handle outside clicks and ESC key
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (slideOverRef.current && !slideOverRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [onClose]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 z-[100]">
			<div className="flex items-start justify-end h-full">
				<div
					ref={slideOverRef}
					className="bg-[#AE7AFF] w-full max-w-md h-full
                   border-l-4 border-black 
                   shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col"
				>
					{/* Scrollable Content Area */}
					<div className="flex-grow overflow-y-auto relative">
						{/* Dotted pattern overlay - fading from bottom to top, starting higher */}
						<div
							className="absolute inset-0 pointer-events-none z-10 -mb-12"
							style={{
								backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
								backgroundSize: '16px 16px',
								maskImage: 'linear-gradient(to top, black 60%, transparent 90%)',
								WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 90%)',
								opacity: 0.3
							}}
						/>

						<div className="p-6 relative z-20">
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
								{t('contact.form.title')}
							</h2>

							{/* Contact Details Section */}
							<ContactDetails />

							<hr className="my-4 border-black border-2" />

							{/* Selected Products Section */}
							<div className="mb-4">
								<div className="flex justify-between items-center mb-2">
									<h3 className="text-2xl font-bold text-black">
										{t('contact.catalog.title')}
									</h3>
									{selectedProducts.length > 0 && (
										<button
											onClick={clearCatalog}
											className="px-3 py-2 bg-red-400 text-black font-bold 
                               border-2 border-black rounded-xl 
                               hover:bg-red-500 transition-colors
                               shadow-[2px_2px_0px_rgba(0,0,0,1)]
                               hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
											disabled={isSubmitting}
										>
											{t('contact.buttons.removeAll')}
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
													onClick={() => removeProduct(product.id)}
													className="p-1 bg-red-400 text-black rounded-lg 
                                   border-2 border-black hover:bg-red-500 
                                   transition-colors
                                   shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                   hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
													disabled={isSubmitting}
												>
													<MdClose size={20} />
												</button>
											</div>
										))
									) : (
										<div className="text-center p-4 bg-[#FFF59F] border-2 border-black rounded-xl">
											<p className="text-black font-bold">{t('contact.catalog.empty')}</p>
											<p className="text-sm text-black mt-2">
												{t('contact.catalog.emptyDesc')}
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
			</div>
		</div>
	);
};

export default ContactSlideOver;