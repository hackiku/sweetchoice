// app/routes/($locale).contact.tsx

import React, { useState, useEffect } from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { MdClose, MdArrowForward } from 'react-icons/md';
import { Link } from '@remix-run/react';

import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from '~/components/cta/contact/ContactContext';
import { ContactDetails } from '~/components/cta/contact/ContactDetails';
import ContactForm from '~/components/cta/contact/ContactForm';

export const meta: MetaFunction = () => {
	const { t } = useTranslation();
	return [{ title: t('contactPage.meta.title') }];
};

export async function loader({ context }: LoaderFunctionArgs) {
	return json({});
}

export default function Contact() {
	const { t } = useTranslation();
	const { selectedProducts, clearCatalog, removeProduct } = useContact();
	const [isFormExpanded, setIsFormExpanded] = useState(true); // Always expanded on contact page

	return (
		<div className="flex flex-col items-center relative min-h-screen overflow-y-hidden">
			{/* Background Pattern */}
			<div className="w-full border-t-4 border-black bg-gradient-to-b from-[#AE7AFF] to-transparent pt-14 pb-[75vh] absolute top-0 left-0 z-0"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px), linear-gradient(to bottom, #AE7AFF, transparent)',
					backgroundSize: '20px 20px, 100% 100%',
					backgroundPosition: '0 0, 0 0',
					maskImage: 'linear-gradient(to bottom, black, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
				}}>
			</div>

			<div className="w-full relative z-10">
				{/* Hero Section */}
				<section className="w-full flex flex-col justify-center px-6 sm:px-8 md:px-12 mb-6 mt-16 relative isolate">
					<span className="inline-block bg-black text-white text-2xl font-bold py-2 px-4 transform -rotate-2 uppercase whitespace-normal max-w-max relative z-[2] mb-4"
						style={{
							boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
						}}>
						{t('contactPage.page.label')}
					</span>

					<h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-bold leading-tight text-orange-400 relative z-[2]"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)',
						}}>
						{t('contactPage.page.heading')} <br></br> {t('contactPage.page.subheading')}
					</h1>
				</section>

				{/* Intro Text */}
				<section className="md:w-2/3 lg:w-3/5 px-6 sm:px-8 md:px-12 mb-12">
					<p className="text-2xl max-w-xl font-bold leading-tight sm-max:text-base mt-4">
						{t('contactPage.page.intro.description')}
					</p>
				</section>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Contact Details Card - Mobile Video Style */}
				<div className="relative _mx-auto w-full lg:absolute lg:w-2/5 lg:right-12 lg:top-52  __md:px-0 _mt-8 __md:mt-0">
					<div className="relative w-full max-w-xl mx-auto transform rotate-3">
						{/* Contact Details Container */}
						<div className="relative border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
							<div className="p-6">
								<h3 className="text-2xl font-bold mb-4 text-black text-center">
									{t('contactPage.details.title')}
								</h3>
								<ContactDetails />
							</div>
						</div>

						{/* Decorative background shape */}
						<div
							className="absolute -z-10 top-4 left-4 w-full h-full rounded-xl"
							style={{
								background: 'repeating-linear-gradient(45deg, #FF6B6B, #FF6B6B 10px, #FF8787 10px, #FF8787 20px)',
							}}
						></div>
					</div>
				</div>

				<div className="lg:hidden border-t-4 border-black mt-16 mb-8 mx-6 sm:px-8 md:px-12"></div>

				{/* Main Contact & Catalog Section */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							{/* Left Column - Selected Products */}
							<div className="flex flex-col">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-4xl font-bold text-black">
										{t('contact.catalog.title')}
									</h2>
									{selectedProducts.length > 0 && (
										<button
											onClick={clearCatalog}
											className="px-4 py-2 bg-red-400 text-black font-bold 
                               border-2 border-black rounded-xl 
                               hover:bg-red-500 transition-colors
                               shadow-[2px_2px_0px_rgba(0,0,0,1)]
                               hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
										>
											{t('contact.buttons.removeAll')}
										</button>
									)}
								</div>

								{/* Products List */}
								<div className="bg-[#FFF59F] border-4 border-black rounded-xl p-6 min-h-[400px] flex flex-col
                         shadow-[8px_8px_0px_rgba(0,0,0,1)]">
									{selectedProducts.length > 0 ? (
										<div className="space-y-4 overflow-y-auto flex-1">
											{selectedProducts.map((product) => (
												<div
													key={product.id}
													className="flex items-center gap-4 bg-white 
                                     rounded-xl border-2 border-black p-4
                                     shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                     hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                     transition-all duration-200"
												>
													{product.featuredImage && (
														<img
															src={product.featuredImage.url}
															alt={product.title}
															className="w-16 h-16 object-cover rounded-lg border border-black flex-shrink-0"
														/>
													)}
													<span className="flex-1 font-bold text-lg">{product.title}</span>
													<div className="flex gap-2 flex-shrink-0">
														{/* Green arrow button to product */}
														<Link
															to={`/products/${product.handle}`}
															className="p-2 bg-[#39FF14] text-black rounded-lg 
                                       border-2 border-black hover:bg-[#00FF00] 
                                       transition-colors flex items-center justify-center
                                       shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                       hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
														>
															<MdArrowForward size={20} />
														</Link>
														{/* Red X button */}
														<button
															onClick={() => removeProduct(product.id)}
															className="p-2 bg-red-400 text-black rounded-lg 
                                       border-2 border-black hover:bg-red-500 
                                       transition-colors
                                       shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                       hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
														>
															<MdClose size={20} />
														</button>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="flex-1 flex flex-col items-center justify-center text-center">
											<h3 className="text-2xl font-bold mb-4 text-black">{t('contact.catalog.empty')}</h3>
											<p className="text-lg text-black mb-6 leading-relaxed max-w-md">
												{t('contact.catalog.emptyDesc')}
											</p>
											<Link
												to="/collections/all"
												className="bg-[#FF6B6B] text-black font-bold py-3 px-6 
                                 border-2 border-black rounded-xl 
                                 hover:bg-[#FF5A1F] transition-colors
                                 shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]
                                 text-lg"
											>
												{t('nav.menu.allYear')}
											</Link>
										</div>
									)}
								</div>
							</div>

							{/* Right Column - Contact Form */}
							<div className="flex flex-col">
								<h2 className="text-4xl font-bold mb-6 text-black">
									{t('contact.form.title')}
								</h2>

								<div className="flex-1">
									<ContactForm
										isExpanded={isFormExpanded}
										onExpandToggle={() => setIsFormExpanded(!isFormExpanded)}
										onSuccess={() => {
											// Success handling can be done here if needed
											console.log('Contact form submitted successfully');
										}}
										showGetCatalogButton={false}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}