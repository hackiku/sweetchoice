// app/components/contact/ContactForm.tsx

import React, { useState } from 'react';
import { MdPerson, MdMail, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
	isExpanded: boolean;
	onExpandToggle: () => void;
	onSubmit: (formData: FormData) => Promise<void>;
}

const ContactForm = ({ isExpanded, onExpandToggle, onSubmit }: ContactFormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const data = new FormData(e.currentTarget as HTMLFormElement);
			await onSubmit(data);
		} catch (error) {
			console.error('Form submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	return (
		<motion.div
			layout
			className="relative border-t-4 border-black bg-[#AE7AFF]"
			animate={{
				height: isExpanded ? '400px' : '200px',
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30
			}}
		>
			{/* Toggle Knob */}
			<motion.button
				className="absolute -top-6 left-1/2 -translate-x-1/2 
                   w-16 h-12 bg-[#FF6B6B] rounded-t-xl 
                   border-2 border-black flex items-center justify-center
                   cursor-pointer z-10"
				onClick={onExpandToggle}
				whileHover={{ y: -2 }}
				whileTap={{ y: 0 }}
			>
				{isExpanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
			</motion.button>

			{/* Form Content */}
			<motion.form
				onSubmit={handleSubmit}
				className="p-4 space-y-2 flex flex-col h-full"
				layout
			>
				<motion.div layout className="relative">
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
				</motion.div>

				<motion.div layout className="relative">
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
				</motion.div>

				<AnimatePresence>
					{isExpanded && (
						<motion.textarea
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							name="message"
							placeholder="What's on your mind?"
							value={formData.message}
							onChange={handleInputChange}
							className="flex-grow w-full border-black border-2 p-2 rounded-xl 
                       focus:outline-none shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                       focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] focus:bg-[#90EE90] 
                       transition-all duration-200 font-semibold text-gray-800"
						/>
					)}
				</AnimatePresence>

				<motion.button
					layout
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-[#FF6B6B] text-black font-bold py-3 px-4 
                   border-2 border-black rounded-xl 
                   shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                   hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                   active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                   active:translate-x-[2px] active:translate-y-[2px] 
                   transition-all duration-200 text-xl"
				>
					{isSubmitting ? 'Sending...' : 'Get Catalog →'}
				</motion.button>
			</motion.form>
		</motion.div>
	);
};

export default ContactForm;