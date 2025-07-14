// app/components/ui/Logos.tsx

import React from 'react';



interface LogosProps {
	logos: Array<{ src: string; alt: string }>;
}

const Logos: React.FC<LogosProps> = ({ logos }) => {
	return (
		<div className="logos-grid">
			{logos.map((logo, index) => (
				<img key={index} src={logo.src} alt={logo.alt} />
			))}
		</div>
	);
};

export default Logos;
