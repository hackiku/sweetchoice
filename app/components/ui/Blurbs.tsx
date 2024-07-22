// app/components/ui/Blurbs.tsx

import React from 'react';

interface Blurb {
	imgSrc: string;
	altText: string;
	text: string;
	highlight: string;
}

interface BlurbsProps {
	blurbs: Blurb[];
}

const Blurbs: React.FC<BlurbsProps> = ({ blurbs }) => {
	return (
		<div className="blurbs">
			{blurbs.map((blurb, index) => (
				<div className="blurb" key={index}>
					<img src={blurb.imgSrc} alt={blurb.altText} />
					<h3>
						<span className="highlight">{blurb.highlight}</span> {blurb.text.replace(blurb.highlight, '')}
					</h3>
				</div>
			))}
		</div>
	);
};

export default Blurbs;
