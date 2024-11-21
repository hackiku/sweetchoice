// app/components/contact/ContactForm.tsx
import React, { useState, useEffect } from 'react';
import { MdPerson, MdMail, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useFetcher } from '@remix-run/react';
import { useContact } from './ContactContext';

interface ContactFormProps {
	isExpanded: boolean;
	onExpandToggle: () => void;
	onSuccess?: () => void;
}

const ContactForm = ({ isExpanded, onExpandToggle, onSuccess }: ContactFormProps) => {
	const fetcher = useFetcher();
	const { selectedProducts } = useContact();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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

	// Call onSuccess when submission is complete
	useEffect(() => {
		if (fetcher.data?.success && onSuccess) {
			onSuccess();
		}
	}, [fetcher.data, onSuccess]);

	// Auto-expand when no products are selected
	useEffect(() => {
		if (selectedProducts.length === 0 && !isExpanded) {
			onExpandToggle();
		}
	}, [selectedProducts.length, isExpanded, onExpandToggle]);

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

			{/* Form Container with Fixed Height and Overflow Clip */}
			
			{/* ${isExpanded ? 'h-[320px]' : 'h-[120px]'}`}> */}
			<div className={`relative transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? 'h-44' : 'h-1/5'}`}>
				<form
					onSubmit={handleSubmit}
					className="absolute inset-0 p-4 flex flex-col"
					onClick={() => !isExpanded && onExpandToggle()}
				>
					{/* Name Field - Always Visible */}
					<div className="relative mb-3">
						<MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
						<input
							type="text"
							name="name"
							placeholder="Willie Wonka"
							value={formData.name}
							onChange={handleInputChange}
							className="w-full border-black border-2 p-2 pl-10 rounded-xl 
                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                     transition-all duration-200 font-semibold text-gray-800"
							required
						/>
					</div>

					{/* Email Field - Half Visible When Collapsed */}
					<div className="relative mb-3">
						<MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
						<input
							type="email"
							name="email"
							placeholder="willie@disney.com"
							value={formData.email}
							onChange={handleInputChange}
							className="w-full border-black border-2 p-2 pl-10 rounded-xl 
                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                     transition-all duration-200 font-semibold text-gray-800"
							required
						/>
					</div>

					{/* Message Field - Only Visible When Expanded */}
					<div className={`flex-grow transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
						<textarea
							name="message"
							placeholder="What's on your mind?"
							value={formData.message}
							onChange={handleInputChange}
							className="w-full h-full border-black border-2 p-2 rounded-xl 
                     focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                     focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                     transition-all duration-200 font-semibold text-gray-800 resize-none"
						/>
					</div>
				</form>
			</div>

			{/* Fixed Bottom Button */}
			<div className="relative z-10 p-4 bg-[#AE7AFF] border-t-2 border-black">
				{fetcher.data?.error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
						{fetcher.data.error}
					</div>
				)}

				<button
					onClick={handleSubmit}
					disabled={fetcher.state === 'submitting' || selectedProducts.length === 0}
					className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 
                   border-2 border-black rounded-xl 
                   shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                   hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                   active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                   active:translate-x-[2px] active:translate-y-[2px] 
                   transition-all duration-200 text-xl
                   disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{fetcher.state === 'submitting' ? 'Sending...' : 'Get Catalog →'}
				</button>

				{selectedProducts.length === 0 && (
					<p className="text-sm text-center text-gray-700 mt-2">
						Add some products to your catalog first!
					</p>
				)}
			</div>
		</div>
	);
};

export default ContactForm;