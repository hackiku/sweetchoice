import React from 'react';
import { useTranslation } from '~/lib/i18n/useTranslation';
import EmailSignup from '~/components/cta/email/EmailSignup';

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

	return (
		<div className="border-t-4 border-black py-12 min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#00A86B] to-transparent">
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

				<EmailSignup
					variant="stacked"
					buttonText={t('comingsoon.submitButton')}
					placeholder={t('comingsoon.emailPlaceholder')}
					successMessage={t('comingsoon.successMessage')}
				/>
			</div>
		</div>
	);
};

export default ComingSoon;