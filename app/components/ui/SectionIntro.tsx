// app/components/ui/SectionIntro.tsx

import React from 'react';

interface SectionIntroProps {
	headline: string;
	description: string;
	icon: '🎉' | '🎂' | '🍬' | '🍭';
	children?: React.ReactNode;
	onClick?: () => void;
}

const SectionIntro: React.FC<SectionIntroProps> = ({ headline, description, icon, children, onClick }) => {
	return (
		<div className="section-intro" onClick={onClick}>
			<div className="section-intro-icon">{icon}</div>
			<div className="section-intro-content">
				<h2>{headline}</h2>
				<p>{description}</p>
				{children}
			</div>
		</div>
	);
};

export default SectionIntro;
