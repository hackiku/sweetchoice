// app/components/contact/ContactForm.tsx

import React, { useState, useEffect } from 'react';
import { MdPerson, MdMail } from 'react-icons/md';
import { useFetcher } from '@remix-run/react';
import { useContact } from './ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface ContactFormProps {
	isExpanded: boolean;
	onExpandToggle: () => void;
	onSuccess?: () => void;
	showGetCatalogButton?: boolean;
}

const ContactForm = ({ isExpanded, onExpandToggle, onSuccess, showGetCatalogButton = true }: ContactFormProps) => {
	const { t } = useTranslation();
	const fetcher = useFetcher();
	const { selectedProducts } = useContact();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [showSuccess, setShowSuccess] = useState(false);
	const [isFormExpanded, setIsFormExpanded] = useState(isExpanded);

	const isFormValid = formData.name.trim() && formData.email.trim();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isFormValid) return;

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleInputFocus = () => {
		if (showGetCatalogButton && !isFormExpanded) {
			setIsFormExpanded(true);
			onExpandToggle();
		}
	};

	useEffect(() => {
		if (fetcher.data?.success) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
				onSuccess?.();
			}, 3000);
		}
	}, [fetcher.data, onSuccess]);

	// Sync with prop
	useEffect(() => {
		setIsFormExpanded(isExpanded);
	}, [isExpanded]);

	return (
		<div className="relative">
			{/* Single thin border wrapper like contact details */}
			<div className="bg-[#AE7AFF] mx-2 rounded-xl border-2 border-black transition-all duration-200 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] __hover:bg-white">
				<div className="p-4">
					<form onSubmit={handleSubmit} className="space-y-3">
						{/* Name Field - Original Styling */}
						<div className="relative">
							<MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
							<input
								type="text"
								name="name"
								placeholder={t('contact.form.name.placeholder')}
								value={formData.name}
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								className="w-full border-black border-2 p-2 pl-10 rounded-xl 
                           focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                           focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                           transition-all duration-200 font-semibold text-gray-800"
								required
							/>
						</div>

						{/* Email Field - Original Styling */}
						<div className="relative">
							<MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
							<input
								type="email"
								name="email"
								placeholder={t('contact.form.email.placeholder')}
								value={formData.email}
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								className="w-full border-black border-2 p-2 pl-10 rounded-xl 
                           focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                           focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                           transition-all duration-200 font-semibold text-gray-800"
								required
							/>
						</div>

						{/* Message Field - Original Styling, appears when expanded */}
						{(isFormExpanded || !showGetCatalogButton) && (
							<textarea
								name="message"
								placeholder={t('contact.form.message.placeholder')}
								value={formData.message}
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								className="w-full border-black border-2 p-2 rounded-xl 
                           focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                           focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                           transition-all duration-200 font-semibold text-gray-800 resize-none min-h-[80px]"
							/>
						)}
					</form>

					{/* Error Messages */}
					{fetcher.data?.error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
							{fetcher.data.error}
						</div>
					)}

					{/* Success Messages */}
					{showSuccess && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
							{selectedProducts.length > 0
								? t('contact.form.success.withProducts')
								: t('contact.form.success.noProducts')}
						</div>
					)}

					{/* Get Catalog Button */}
					<button
						onClick={handleSubmit}
						disabled={!isFormValid || fetcher.state === 'submitting'}
						className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 mt-4
                       border-2 border-black rounded-xl 
                       shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                       active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                       active:translate-x-[2px] active:translate-y-[2px] 
                       transition-all duration-200 text-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{fetcher.state === 'submitting'
							? t('contact.buttons.submitting')
							: t('contact.buttons.getCatalog')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;