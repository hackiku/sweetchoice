// app/components/cta/contact/ContactSlideOver.tsx

import React, { useRef, useState, useEffect } from 'react';
import { MdClose, MdArrowForward } from 'react-icons/md';
import { Link } from '@remix-run/react';
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
					className="bg-[#AE7AFF] w-full max-w-md md:max-w-5xl md:h-auto h-full md:mt-4 md:mr-4
                   border-4 border-black md:border-l-4 md:border-r-4 md:border-t-4 md:border-b-4
                   shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
				>
					{/* Desktop Layout */}
					<div className="hidden md:flex md:flex-col md:h-full md:p-6">
						{/* Full Width Header */}
						<div className="mb-6">
							<h2
								className="text-5xl font-black text-orange-400 uppercase italic text-center"
								style={{
									WebkitTextStroke: '3px black',
									textStroke: '3px black',
									textShadow: '-0.1em 0.12em 0 #000',
									filter: 'drop-shadow(0 0 1px black)'
								}}
							>
								{t('contact.form.title')}
							</h2>
						</div>

						{/* Two Column Layout - Full Height */}
						<div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
							{/* Left Column - Selected Products */}
							<div className="flex flex-col h-full min-h-0">
								<div className="flex justify-between items-center mb-4 flex-shrink-0">
									<h3 className="text-3xl font-bold text-black">
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

								{/* Products List - Scrollable with clipped bottom */}
								<div className="flex-1 bg-[#FFF59F] border-2 border-black rounded-xl p-4 flex flex-col min-h-0">
									{selectedProducts.length > 0 ? (
										<div className="space-y-2 overflow-y-auto flex-1 min-h-0" style={{
											scrollbarWidth: 'none',
											msOverflowStyle: 'none'
										}}>
											<style jsx>{`
												div::-webkit-scrollbar {
													display: none;
												}
											`}</style>
											{selectedProducts.map((product) => (
												<div
													key={product.id}
													className="flex items-center gap-2 bg-white 
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
													<div className="flex gap-2">
														{/* Green arrow button to product */}
														<Link
															to={`/products/${product.handle}`}
															onClick={onClose}
															className="p-1 bg-[#39FF14] text-black rounded-lg 
                                       border-2 border-black hover:bg-[#00FF00] 
                                       transition-colors flex items-center justify-center
                                       shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                       hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
															disabled={isSubmitting}
														>
															<MdArrowForward size={20} />
														</Link>
														{/* Red X button */}
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
												</div>
											))}
										</div>
									) : (
										<div className="flex-1 flex flex-col items-center justify-center text-center min-h-0">
											<p className="text-black font-bold mb-2 text-xl">{t('contact.catalog.empty')}</p>
											<p className="text-black mb-4 text-lg">
												{t('contact.catalog.emptyDesc')}
											</p>
											<Link
												to="/collections/all"
												onClick={onClose}
												className="bg-[#FF6B6B] text-black font-bold py-3 px-6 
                                 border-2 border-black rounded-xl 
                                 hover:bg-[#FF5A1F] transition-colors
                                 shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                 text-lg"
											>
												{t('nav.menu.allYear')}
											</Link>
										</div>
									)}
								</div>

								{/* Desktop Action Buttons - Fixed Position */}
								<div className="grid grid-cols-2 gap-3 mt-4 flex-shrink-0">
									<Link
										to="/collections/all"
										onClick={onClose}
										className="bg-white text-black font-bold py-3 px-4 
                               border-2 border-black rounded-xl 
                               shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                               active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                               active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all duration-200 text-lg text-center
                               hover:bg-[#FFF59F] flex items-center justify-center"
									>
										{t('nav.menu.allYear')}
									</Link>

									<Link
										to="/contact"
										onClick={onClose}
										className="bg-[#90EE90] text-black font-bold py-3 px-4 
                               border-2 border-black rounded-xl 
                               shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                               active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                               active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all duration-200 text-lg text-center
                               hover:bg-[#7FDD7F] flex items-center justify-center"
									>
										{t('contact.buttons.contactPage')}
									</Link>
								</div>
							</div>

							{/* Right Column - Contact Details & Form */}
							<div className="flex flex-col h-full">
								<ContactDetails />
								<div className="flex-1 mt-4">
									<ContactForm
										isExpanded={true}
										onExpandToggle={() => { }}
										onSuccess={onClose}
										showGetCatalogButton={false}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile Layout - Simplified */}
					<div className="md:hidden flex flex-col h-full">
						{/* Scrollable Content Area */}
						<div className="flex-grow overflow-y-auto relative">
							{/* Dotted pattern overlay */}
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

									<div className="space-y-2 max-h-32 overflow-y-auto" style={{
										scrollbarWidth: 'none',
										msOverflowStyle: 'none'
									}}>
										<style jsx>{`
											div::-webkit-scrollbar {
												display: none;
											}
										`}</style>
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
													<div className="flex gap-1">
														{/* Green arrow button to product */} 
														<Link
															to={`/products/${product.handle}`}
															onClick={onClose}
															className="p-1 bg-[#39FF14] text-black rounded-lg 
                                       border-2 border-black hover:bg-[#00FF00] 
                                       transition-colors flex items-center justify-center
                                       shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                       hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
															disabled={isSubmitting}
														>
															<MdArrowForward size={20} />
														</Link>
														{/* Red X button */}
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
												</div>
											))
										) : (
											<div className="text-center p-4 bg-[#FFF59F] border-2 border-black rounded-xl">
												<p className="text-black font-bold mb-2">{t('contact.catalog.empty')}</p>
												<p className="text-sm text-black mb-3">
													{t('contact.catalog.emptyDesc')}
												</p>
												<Link
													to="/collections/all"
													onClick={onClose}
													className="inline-block bg-[#FF6B6B] text-black font-bold py-2 px-4 
                                     border-2 border-black rounded-xl 
                                     hover:bg-[#FF5A1F] transition-colors
                                     shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                     hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
												>
													{t('nav.menu.allYear')}
												</Link>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Contact Form - Mobile - Simplified */}
						<div className="sticky bottom-0 w-full">
							<ContactForm
								isExpanded={isFormExpanded}
								onExpandToggle={() => setIsFormExpanded(!isFormExpanded)}
								onSuccess={onClose}
								showGetCatalogButton={true}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Hide scrollbar globally */}
			<style jsx global>{`
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
};

export default ContactSlideOver;