// app/components/seasons/SeasonsWheel.tsx

import React, { useState } from 'react';
import { Link } from '@remix-run/react';

const SeasonsWheel = () => {
	const [isBusiness, setIsBusiness] = useState(false);

	const seasons = [
		{ name: 'Winter', color: '#00BFFF', angle: -90 },
		{ name: 'Spring', color: '#98FB98', angle: -45 },
		{ name: 'Summer', color: '#FFD700', angle: 45 },
		{ name: 'Autumn', color: '#FF8C00', angle: 90 },
	];

	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10">
			<div className="relative w-96 h-48">
				{seasons.map((season, index) => (
					<Link
						key={index}
						to={`#${season.name.toLowerCase()}`}
						className="absolute bottom-0 opacity-60 left-1/2 w-16 h-16 flex justify-center items-center text-center text-sm font-bold transition-transform duration-300 hover:scale-125"
						style={{
							backgroundColor: season.color,
							transform: `translateX(-50%) rotate(${season.angle}deg) translateY(-6em) rotate(${-season.angle}deg)`,
							borderRadius: '50%',
						}}
					>
						{season.name}
					</Link>
				))}
				<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
					<button
						onClick={() => setIsBusiness(!isBusiness)}
						className={`w-16 h-16 rounded-full text-sm font-bold transition-all duration-300 ${isBusiness ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
							}`}
					>
						{isBusiness ? 'B2B' : 'B2C'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SeasonsWheel;
