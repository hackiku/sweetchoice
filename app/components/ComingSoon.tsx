import React, { useState } from 'react';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface ComingSoonProps {
	eyebrow?: string;
	title?: string;
	description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
	eyebrow,
	title,
	description
}) => {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Handle email submission
		setIsSubmitted(true);
	};

	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#00A86B] to-transparent">
			<div className="max-w-3xl w-full space-y-8 text-center">
				<div className="mb-4">
					<span className="inline-block bg-black text-white text-2xl font-bold py-2 px-4 transform -rotate-2 uppercase"
						style={{
							boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
						}}>
						{eyebrow || t('comingsoon.eyebrow')}
					</span>
				</div>

				<h1 className="text-[12vw] sm:text-[10vw] md:text-[7vw] font-bold leading-tight mb-4 uppercase text-orange-400"
					style={{
						WebkitTextStroke: '3px black',
						textStroke: '3px black',
						textShadow: '-0.1em 0.12em 0 #000',
						filter: 'drop-shadow(0 0 1px black)'
					}}>
					{title || t('comingsoon.headline')}
				</h1>

				<p className="text-2xl font-bold leading-tight sm-max:text-base mt-4 mb-8">
					{description || t('comingsoon.meta.description')}
				</p>

				<div className="flex justify-center">
					{!isSubmitted ? (
						<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder={t('comingsoon.emailPlaceholder')}
								className="flex-1 px-6 py-4 border-4 border-black bg-white text-xl
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  focus:outline-none focus:bg-[#FFA6F6] 
                  transition-all duration-200"
								required
							/>
							<button
								type="submit"
								className="px-8 py-4 text-xl border-4 border-black bg-orange-400
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-[2px] active:translate-y-[2px]
                  transition-all duration-200 font-bold whitespace-nowrap"
							>
								{t('comingsoon.submitButton')} →
							</button>
						</form>
					) : (
						<div className="text-xl font-bold p-6 border-4 border-black bg-[#90EE90]
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
							{t('comingsoon.successMessage')}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;