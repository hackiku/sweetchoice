// app/routes/($locale).contact.tsx

import React, { useState, useEffect } from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useFetcher } from '@remix-run/react';
import { MdPerson, MdMail, MdClose } from 'react-icons/md';
import { Link } from '@remix-run/react';

import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from '~/components/contact/ContactContext';
import { ContactDetails } from '~/components/contact/ContactDetails';

export const meta: MetaFunction = () => {
	const { t } = useTranslation();
	return [{ title: t('contactPage.meta.title') }];
};

export async function loader({ context }: LoaderFunctionArgs) {
	return json({});
}

export default function Contact() {
	const { t } = useTranslation();
	const fetcher = useFetcher();
	const { selectedProducts, clearCatalog, removeProduct } = useContact();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [showSuccess, setShowSuccess] = useState(false);

	// Handle form submission success
	useEffect(() => {
		if (fetcher.data?.success) {
			setShowSuccess(true);
			setFormData({ name: '', email: '', message: '' });
			setTimeout(() => {
				setShowSuccess(false);
			}, 5000);
		}
	}, [fetcher.data]);

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim() || !formData.email.trim()) return;

		const form = new FormData();
		form.append('_action', 'SUBMIT_CATALOG');
		form.append('name', formData.name);
		form.append('email', formData.email);
		form.append('message', formData.message);

		fetcher.submit(form, {
			method: 'post',
			action: '/api/contact',
		});
	};

	const isFormValid = formData.name.trim() && formData.email.trim();

	return (
		<div className="flex flex-col items-center relative min-h-screen">
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
				<section className="w-full flex flex-col justify-center px-6 sm:px-8 md:px-12 mb-12 mt-16 relative isolate">
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
				<section className="md:w-2/3 px-6 sm:px-8 md:px-12 mb-16">
					<p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base mt-4">
						{t('contactPage.page.intro.description')}
					</p>
					{/* <p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base mt-4">
						{t('contactPage.page.intro.secondary')}
					</p> */}
				</section>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Contact Details Card - Mobile Video Style */}
				<div className="relative mx-auto w-full lg:absolute lg:w-1/3 lg:right-12 lg:top-52 px-6 sm:px-8 md:px-0 ssmt-8 md:mt-0">
					<div className="relative w-full max-w-sm mx-auto md:mx-0 transform rotate-3">
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

				<div className="lg:hidden border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Main Contact Section */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<div className="max-w-6xl mx-auto">
						{/* Desktop: Form Left, Products Right */}
						<div className="hidden md:grid md:grid-cols-2 md:gap-8">
							{/* Left Column - Contact Form */}
							<div className="md:col-span-1">
								<h2 className="text-4xl font-bold mb-6 text-black">
									{t('contact.form.title')}
								</h2>

								<div className="bg-white border-4 border-black rounded-xl p-6 h-96 flex flex-col
                         shadow-[8px_8px_0px_rgba(0,0,0,1)]">
									<form onSubmit={handleFormSubmit} className="flex-1 flex flex-col">
										<div className="space-y-4 flex-1">
											<div className="relative">
												<MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
												<input
													type="text"
													name="name"
													placeholder={t('contact.form.name.placeholder')}
													value={formData.name}
													onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
													className="w-full border-black border-2 p-4 pl-12 rounded-xl 
                                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                                     transition-all duration-200 font-semibold text-gray-800 text-lg"
													required
												/>
											</div>

											<div className="relative">
												<MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
												<input
													type="email"
													name="email"
													placeholder={t('contact.form.email.placeholder')}
													value={formData.email}
													onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
													className="w-full border-black border-2 p-4 pl-12 rounded-xl 
                                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                                     transition-all duration-200 font-semibold text-gray-800 text-lg"
													required
												/>
											</div>

											<textarea
												name="message"
												placeholder={t('contact.form.message.placeholder')}
												value={formData.message}
												onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
												className="w-full flex-1 border-black border-2 p-4 rounded-xl 
                                 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                 focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                                 transition-all duration-200 font-semibold text-gray-800 text-lg 
                                 resize-none min-h-[120px]"
											/>
										</div>

										{fetcher.data?.error && (
											<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
												{fetcher.data.error}
											</div>
										)}

										{showSuccess && (
											<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
												{selectedProducts.length > 0
													? t('contact.form.success.withProducts')
													: t('contact.form.success.noProducts')}
											</div>
										)}

										<button
											type="submit"
											disabled={!isFormValid || fetcher.state === 'submitting'}
											className="w-full bg-[#FF6B6B] text-black font-bold py-4 px-6 
                               border-2 border-black rounded-xl 
                               shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                               active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                               active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all duration-200 text-xl mt-6
                               disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{fetcher.state === 'submitting'
												? t('contact.buttons.submitting')
												: t('contact.buttons.getCatalog')}
										</button>
									</form>
								</div>
							</div>

							{/* Right Column - Selected Products */}
							<div className="md:col-span-1">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-4xl font-bold text-black">
										{t('contact.catalog.title')}
									</h2>
									{selectedProducts.length > 0 && (
										<button
											onClick={clearCatalog}
											className="px-3 py-2 bg-red-400 text-black font-bold 
                               border-2 border-black rounded-xl 
                               hover:bg-red-500 transition-colors
                               shadow-[2px_2px_0px_rgba(0,0,0,1)]
                               hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
										>
											{t('contact.buttons.removeAll')}
										</button>
									)}
								</div>

								{/* Products Container */}
								<div className="bg-[#FFF59F] border-4 border-black rounded-xl p-6 h-96 flex flex-col
                         shadow-[8px_8px_0px_rgba(0,0,0,1)]">
									{selectedProducts.length > 0 ? (
										<div className="space-y-3 overflow-y-auto scrollbar-hide flex-1">
											{selectedProducts.map((product) => (
												<div
													key={product.id}
													className="flex items-center gap-3 bg-white 
                                     rounded-xl border-2 border-black p-3
                                     shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                     hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                     transition-all duration-200"
												>
													{product.featuredImage && (
														<img
															src={product.featuredImage.url}
															alt={product.title}
															className="w-16 h-16 object-cover rounded-lg border border-black"
														/>
													)}
													<span className="flex-1 font-bold text-lg">{product.title}</span>
													<button
														onClick={() => removeProduct(product.id)}
														className="p-2 bg-red-400 text-black rounded-lg 
                                       border-2 border-black hover:bg-red-500 
                                       transition-colors font-bold text-lg
                                       shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                       hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
													>
														<MdClose size={18} />
													</button>
												</div>
											))}
										</div>
									) : (
										<div className="flex-1 flex flex-col items-center justify-center text-center">
											<p className="text-black font-bold mb-4 text-2xl">{t('contact.catalog.empty')}</p>
											<p className="text-black mb-6 text-lg leading-relaxed">
												{t('contact.catalog.emptyDesc')}
											</p>
											<Link
												to="/collections/all"
												className="bg-[#FF6B6B] text-black font-bold py-4 px-8 
                                 border-2 border-black rounded-xl 
                                 hover:bg-[#FF5A1F] transition-colors
                                 shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]
                                 text-xl"
											>
												{t('nav.menu.allYear')}
											</Link>
										</div>
									)}
								</div>

								{/* Action Buttons */}
								<div className="grid grid-cols-1 gap-4 mt-6">
									<Link
										to="/collections/all"
										className="w-full bg-white text-black font-bold py-4 px-6 
                               border-2 border-black rounded-xl 
                               shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                               active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                               active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all duration-200 text-xl text-center
                               hover:bg-[#FFF59F] flex items-center justify-center"
									>
										{t('nav.menu.allYear')}
									</Link>
								</div>
							</div>
						</div>

						{/* Mobile: Products First, Then Form */}
						<div className="md:hidden space-y-8">
							{/* Mobile - Selected Products First */}
							<div>
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-3xl font-bold text-black">
										{t('contact.catalog.title')}
									</h2>
									{selectedProducts.length > 0 && (
										<button
											onClick={clearCatalog}
											className="px-3 py-2 bg-red-400 text-black font-bold 
                               border-2 border-black rounded-xl 
                               hover:bg-red-500 transition-colors
                               shadow-[2px_2px_0px_rgba(0,0,0,1)]
                               hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
										>
											{t('contact.buttons.removeAll')}
										</button>
									)}
								</div>

								{/* Mobile Products Container */}
								<div className="bg-[#FFF59F] border-4 border-black rounded-xl p-6 h-64 flex flex-col
                         shadow-[8px_8px_0px_rgba(0,0,0,1)]">
									{selectedProducts.length > 0 ? (
										<div className="space-y-3 overflow-y-auto scrollbar-hide flex-1">
											{selectedProducts.map((product) => (
												<div
													key={product.id}
													className="flex items-center gap-3 bg-white 
                                     rounded-xl border-2 border-black p-3
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
													<span className="flex-1 font-bold">{product.title}</span>
													<button
														onClick={() => removeProduct(product.id)}
														className="p-2 bg-red-400 text-black rounded-lg 
                                       border-2 border-black hover:bg-red-500 
                                       transition-colors font-bold
                                       shadow-[2px_2px_0px_rgba(0,0,0,1)]
                                       hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
													>
														<MdClose size={16} />
													</button>
												</div>
											))}
										</div>
									) : (
										<div className="flex-1 flex flex-col items-center justify-center text-center">
											<p className="text-black font-bold mb-3 text-xl">{t('contact.catalog.empty')}</p>
											<p className="text-black mb-4 leading-relaxed">
												{t('contact.catalog.emptyDesc')}
											</p>
											<Link
												to="/collections/all"
												className="bg-[#FF6B6B] text-black font-bold py-3 px-6 
                                 border-2 border-black rounded-xl 
                                 hover:bg-[#FF5A1F] transition-colors
                                 shadow-[4px_4px_0px_rgba(0,0,0,1)]
                                 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
											>
												{t('nav.menu.allYear')}
											</Link>
										</div>
									)}
								</div>

								{/* Mobile Action Buttons */}
								<div className="grid grid-cols-1 gap-4 mt-6">
									<Link
										to="/collections/all"
										className="w-full bg-white text-black font-bold py-4 px-6 
                               border-2 border-black rounded-xl 
                               shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                               active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                               active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all duration-200 text-xl text-center
                               hover:bg-[#FFF59F] flex items-center justify-center"
									>
										{t('nav.menu.allYear')}
									</Link>
								</div>
							</div>

							{/* Mobile - Contact Form Second */}
							<div>
								<h2 className="text-3xl font-bold mb-6 text-black">
									{t('contact.form.title')}
								</h2>

								<div className="bg-white border-4 border-black rounded-xl p-6 flex flex-col
                         shadow-[8px_8px_0px_rgba(0,0,0,1)]">
									<form onSubmit={handleFormSubmit} className="flex flex-col">
										<div className="space-y-4">
											<div className="relative">
												<MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
												<input
													type="text"
													name="name"
													placeholder={t('contact.form.name.placeholder')}
													value={formData.name}
													onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
													className="w-full border-black border-2 p-4 pl-12 rounded-xl 
                                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                                     transition-all duration-200 font-semibold text-gray-800 text-lg"
													required
												/>
											</div>

											<div className="relative">
												<MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
												<input
													type="email"
													name="email"
													placeholder={t('contact.form.email.placeholder')}
													value={formData.email}
													onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
													className="w-full border-black border-2 p-4 pl-12 rounded-xl 
                                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                                     transition-all duration-200 font-semibold text-gray-800 text-lg"
													required
												/>
											</div>

											<textarea
												name="message"
												placeholder={t('contact.form.message.placeholder')}
												value={formData.message}
												onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
												className="w-full h-32 border-black border-2 p-4 rounded-xl 
                                 focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                 focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                                 transition-all duration-200 font-semibold text-gray-800 text-lg 
                                 resize-none"
											/>
										</div>

										{fetcher.data?.error && (
											<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
												{fetcher.data.error}
											</div>
										)}

										{showSuccess && (
											<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
												{selectedProducts.length > 0
													? t('contact.form.success.withProducts')
													: t('contact.form.success.noProducts')}
											</div>
										)}

										<button
											type="submit"
											disabled={!isFormValid || fetcher.state === 'submitting'}
											className="w-full bg-[#FF6B6B] text-black font-bold py-4 px-6 
                               border-2 border-black rounded-xl 
                               shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                               active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                               active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all duration-200 text-xl mt-6
                               disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{fetcher.state === 'submitting'
												? t('contact.buttons.submitting')
												: t('contact.buttons.getCatalog')}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
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
}