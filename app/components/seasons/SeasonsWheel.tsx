// app/components/seasons/SeasonsWheel.tsx

import React, { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

const SeasonsWheel = () => {
	const [scrollDepth, setScrollDepth] = useState({ pixels: 0, percentage: 0 });

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrolled = (scrollTop / docHeight) * 100;

			setScrollDepth({
				pixels: scrollTop,
				percentage: scrolled.toFixed(2),
			});
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<div className="fixed bottom-1 left-2 bg-black bg-opacity-50 text-white p-2 rounded z-30">
				Scroll Depth: {scrollDepth.pixels}px ({scrollDepth.percentage}%)
			</div>
			<div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-10">
				<div className="bg-gray-200 bg-opacity-30 rounded-full shadow-lg p-4 flex justify-center items-center">
					<Link to="#winter" className="flex justify-center items-center text-center w-28 h-12 mx-2 transition-transform duration-300 hover:scale-110 bg-[#00BFFF] rounded-full">Winter</Link>
					<Link to="#spring" className="flex justify-center items-center text-center w-28 h-12 mx-2 transition-transform duration-300 hover:scale-110 bg-[#98FB98] rounded-full">Spring</Link>
					<Link to="#summer" className="flex justify-center items-center text-center w-28 h-12 mx-2 transition-transform duration-300 hover:scale-110 bg-[#FFD700] rounded-full">Summer</Link>
					<Link to="#autumn" className="flex justify-center items-center text-center w-28 h-12 mx-2 transition-transform duration-300 hover:scale-110 bg-[#FF8C00] rounded-full">Autumn</Link>
				</div>
			</div>
		</>
	);
};

export default SeasonsWheel;
