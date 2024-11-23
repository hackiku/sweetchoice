import React, { useState, useEffect } from 'react';
import { MdPerson, MdMail, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useFetcher } from '@remix-run/react';
import { useContact } from './ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface ContactFormProps {
	isExpanded: boolean;
	onExpandToggle: () => void;
	onSuccess?: () => void;
}

const ContactForm = ({ isExpanded, onExpandToggle, onSuccess }: ContactFormProps) => {
	const { t } = useTranslation();
	const fetcher = useFetcher();
	const { selectedProducts } = useContact();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [showSuccess, setShowSuccess] = useState(false);

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

	useEffect(() => {
		if (fetcher.data?.success) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
				onSuccess?.();
			}, 3000);
		}
	}, [fetcher.data, onSuccess]);

	return (
		<div className="relative bg-[#AE7AFF] border-t-4 border-black">
			{/* Toggle Knob */}
			<button
				onClick={onExpandToggle}
				className="absolute -top-3 left-1/2 -translate-x-1/2 
                 w-12 h-6 bg-[#FF6B6B] rounded-t-lg 
                 border-2 border-black flex items-center justify-center
                 cursor-pointer z-20 hover:-translate-y-0.5 
                 active:translate-y-0 transition-transform"
			>
				{isExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
			</button>

			{/* Form Container with Flex Layout */}
			<div
				className={`relative transition-all duration-300 ease-in-out overflow-hidden 
                   flex flex-col gap-2
                   ${isExpanded ? 'h-52' : 'h-24'}`}
				onClick={() => !isExpanded && onExpandToggle()}
			>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
					<div className="relative">
						<MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
						<input
							type="text"
							name="name"
							placeholder={t('contact.form.name.placeholder')}
							value={formData.name}
							onChange={handleInputChange}
							className="w-full border-black border-2 p-2 pl-10 rounded-xl 
                       focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                       transition-all duration-200 font-semibold text-gray-800"
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
							onChange={handleInputChange}
							className="w-full border-black border-2 p-2 pl-10 rounded-xl 
                       focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                       transition-all duration-200 font-semibold text-gray-800"
							required
						/>
					</div>

					{isExpanded && (
						<textarea
							name="message"
							placeholder={t('contact.form.message.placeholder')}
							value={formData.message}
							onChange={handleInputChange}
							className="w-full flex-1 min-h-[4rem] max-h-24 border-black border-2 p-2 rounded-xl 
                       focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                       transition-all duration-200 font-semibold text-gray-800 resize-y"
						/>
					)}
				</form>
			</div>

			{/* Fixed Bottom Button */}
			<div className="relative z-10 p-4 bg-[#AE7AFF] border-t-2 border-black">
				{fetcher.data?.error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
						{fetcher.data.error}
					</div>
				)}

				{showSuccess && (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
						{selectedProducts.length > 0
							? t('contact.form.success.withProducts')
							: t('contact.form.success.noProducts')}
					</div>
				)}

				<button
					onClick={!isExpanded ? onExpandToggle : handleSubmit}
					disabled={isExpanded && (!isFormValid || fetcher.state === 'submitting')}
					className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 
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

				{selectedProducts.length === 0 && (
					<p className="text-sm text-center text-gray-700 mt-2">
						{t('contact.catalog.emptyDesc')}
					</p>
				)}
			</div>
		</div>
	);
};

export default ContactForm;