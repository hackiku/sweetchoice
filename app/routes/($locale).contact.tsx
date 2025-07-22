// app/routes/($locale).contact.tsx

import React, { useState, useEffect } from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useFetcher } from '@remix-run/react';
import { MdPerson, MdMail, MdClose } from 'react-icons/md';
import { Link } from '@remix-run/react';

import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from '~/components/cta/contact/ContactContext';
import { ContactDetails } from '~/components/cta/contact/ContactDetails';

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
		lastname: '',
		email: '',
		message: '',
	});
	const [showSuccess, setShowSuccess] = useState(false);

	// Handle form submission success
	useEffect(() => {
		if (fetcher.data?.success) {
			setShowSuccess(true);
			setFormData({ name: '', lastname: '', email: '', message: '' });
			setTimeout(() => {
				setShowSuccess(false);
			}, 5000);
		}
	}, [fetcher.data]);

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.email.trim()) return;

		const form = new FormData();
		form.append('_action', 'SUBMIT_CATALOG');
		form.append('name', formData.name || '');
		form.append('lastname', formData.lastname || '');
		form.append('email', formData.email);
		form.append('message', formData.message);

		fetcher.submit(form, {
			method: 'post',
			action: '/api/contact',
		});
	};

	const isFormValid = formData.email.trim();

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

				<div className="lg:hidden border-t-4 border-black mt-16 mb-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Main Contact & Catalog Section */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							{/* Left Column - Title, Description */}
							<div className="flex flex-col justify-center">
								<h2 className="text-5xl font-bold mb-6 text-black uppercase">
									Get Our Catalog
								</h2>

								<div className="space-y-4 mb-8">
									<p className="text-xl font-semibold leading-relaxed">
										Get a personalized catalog tailored to your business needs. Select products you're interested in and we'll create a custom offering just for you.
									</p>
								</div>
							</div>

							{/* Right Column - Contact Form */}
							<div className="flex flex-col">
								<div className="bg-white border-4 border-black rounded-xl p-8 h-full flex flex-col
                         shadow-[8px_8px_0px_rgba(0,0,0,1)]">
									<form onSubmit={handleFormSubmit} className="flex-1 flex flex-col">
										<div className="space-y-6 flex-1">
											{/* Email Field - Primary/Required */}
											<div className="relative">
												<MdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl" />
												<input
													type="email"
													name="email"
													placeholder="your.email@business.com"
													value={formData.email}
													onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
													className="w-full border-black border-2 p-4 pl-12 rounded-xl 
                                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#39FF14] 
                                     transition-all duration-200 font-semibold text-gray-800 text-lg
                                     bg-[#E8F5E8] focus:border-4"
													required
												/>
											</div>

											{/* Optional Fields Separator */}
											<div className="text-center">
												<span className="text-gray-600 font-medium">Want to tell us more? (optional)</span>
											</div>

											{/* Name Fields - Side by Side */}
											<div className="grid grid-cols-2 gap-4">
												<div className="relative">
													<MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														type="text"
														name="name"
														placeholder="First name (optional)"
														value={formData.name}
														onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
														className="w-full border-gray-400 border-2 p-4 pl-12 rounded-xl 
                                         focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,0.3)] 
                                         focus:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] focus:bg-[#F0F0F0]
                                         focus:border-black transition-all duration-200 font-medium text-gray-700 text-base
                                         bg-gray-50"
													/>
												</div>
												<div className="relative">
													<input
														type="text"
														name="lastname"
														placeholder="Last name (optional)"
														value={formData.lastname || ''}
														onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
														className="w-full border-gray-400 border-2 p-4 rounded-xl 
                                         focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,0.3)] 
                                         focus:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] focus:bg-[#F0F0F0]
                                         focus:border-black transition-all duration-200 font-medium text-gray-700 text-base
                                         bg-gray-50"
													/>
												</div>
											</div>

											{/* Message Field */}
											<textarea
												name="message"
												placeholder="Tell us about your business and what you're looking for... (optional)"
												value={formData.message}
												onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
												className="w-full flex-1 border-gray-400 border-2 p-4 rounded-xl 
                                 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,0.3)] 
                                 focus:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] focus:bg-[#F0F0F0]
                                 focus:border-black transition-all duration-200 font-medium text-gray-700 text-base
                                 resize-none min-h-[100px] bg-gray-50"
											/>
										</div>

										{fetcher.data?.error && (
											<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
												{fetcher.data.error}
											</div>
										)}

										{showSuccess && (
											<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
												Thanks! We'll send you a personalized catalog soon.
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
												? 'Sending...'
												: 'Get My Personalized Catalog →'}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Full Width Selected Products Section */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<div className="max-w-6xl mx-auto">
						<div className="flex justify-between items-center mb-8">
							<h2 className="text-4xl font-bold text-black">
								Your Selected Products
							</h2>
							{selectedProducts.length > 0 && (
								<button
									onClick={clearCatalog}
									className="px-6 py-3 bg-red-400 text-black font-bold 
                           border-2 border-black rounded-xl 
                           hover:bg-red-500 transition-colors
                           shadow-[2px_2px_0px_rgba(0,0,0,1)]
                           hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]
                           text-lg"
								>
									Clear All ({selectedProducts.length})
								</button>
							)}
						</div>

						{/* Products Grid */}
						<div className="bg-[#FFF59F] border-4 border-black rounded-xl p-8 min-h-[300px] flex flex-col
                     shadow-[8px_8px_0px_rgba(0,0,0,1)]">
							{selectedProducts.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
									{selectedProducts.map((product) => (
										<div
											key={product.id}
											className="bg-white rounded-xl border-2 border-black p-4
                               shadow-[4px_4px_0px_rgba(0,0,0,1)]
                               hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]
                               transition-all duration-200 relative"
										>
											{product.featuredImage && (
												<img
													src={product.featuredImage.url}
													alt={product.title}
													className="w-full h-32 object-cover rounded-lg border border-black mb-3"
												/>
											)}
											<h3 className="font-bold text-lg mb-2 pr-8">{product.title}</h3>
											<button
												onClick={() => removeProduct(product.id)}
												className="absolute top-2 right-2 p-2 bg-red-400 text-black rounded-lg 
                                 border-2 border-black hover:bg-red-500 
                                 transition-colors font-bold
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
									<div className="max-w-md">
										<h3 className="text-3xl font-bold mb-4 text-black">No Products Selected Yet</h3>
										<p className="text-xl text-black mb-6 leading-relaxed">
											Browse our catalog and click "Add to Catalog" on products you're interested in. We'll use your selections to personalize your offering!
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
											Start Browsing Products →
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}