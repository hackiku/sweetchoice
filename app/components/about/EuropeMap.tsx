// app/components/about/EuropeMap.tsx

import React from 'react';

const EuropeMap: React.FC = () => {
	return (
		<svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M500 100 L700 300 L600 500 L400 500 L300 300 Z" fill="#FFD700" stroke="black" strokeWidth="4" />
			<path d="M450 250 L500 300 L450 350 L400 300 Z" fill="#FF0000" stroke="black" strokeWidth="4" />
			<circle cx="450" cy="300" r="5" fill="black" />
			<text x="460" y="320" fontSize="20" fontWeight="bold">Belgrade</text>
			<path d="M200 200 L300 250 L250 350 L150 300 Z" fill="#00CED1" stroke="black" strokeWidth="4" />
			<path d="M700 400 L800 450 L750 550 L650 500 Z" fill="#FF69B4" stroke="black" strokeWidth="4" />
			<path d="M350 600 L450 650 L400 750 L300 700 Z" fill="#90EE90" stroke="black" strokeWidth="4" />
		</svg>
	);
};

export default EuropeMap;