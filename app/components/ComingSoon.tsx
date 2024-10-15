// app/components/ComingSoon.tsx

import React, { useState } from 'react';
import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

interface ComingSoonProps {
	eyebrow?: string;
	title?: string;
	description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
	eyebrow = "Coming Soon",
	title = "Coming Soon",
	description = "We're working hard to bring you something amazing. Stay tuned!"
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#00A86B] to-transparent">
			<div className="max-w-3xl w-full space-y-8 text-center">
				<div className="mb-4">
					<span className="inline-block bg-black text-white text-2xl font-bold py-2 px-4 transform -rotate-2 uppercase"
						style={{
							boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
						}}>
						{eyebrow}
					</span>
				</div>
				<h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-bold leading-tight mb-4 uppercase text-orange-400"
					style={{
						WebkitTextStroke: '3px black',
						textStroke: '3px black',
						textShadow: '-0.1em 0.12em 0 #000',
						filter: 'drop-shadow(0 0 1px black)'
					}}>
					{title}
				</h1>
				<p className="text-2xl font-bold leading-tight sm-max:text-base mt-4 mb-8">
					{description}
				</p>
				<div className="flex justify-center">
					<ContactButton
						onClick={handleContactClick}
						text="Get Notified →"
						bgColor="bg-orange-500"
						hoverBgColor="hover:bg-black"
						hoverTextColor="hover:text-white"
						className="text-xl"
					/>
				</div>
			</div>
			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
};

export default ComingSoon;