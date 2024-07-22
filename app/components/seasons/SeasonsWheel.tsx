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
			<div className="scroll-depth">
				Scroll Depth: {scrollDepth.pixels}px ({scrollDepth.percentage}%)
			</div>
			<div className="seasons-wheel-container">
				<div className="seasons-wheel">
					<Link to="#spring" className="season spring">Spring</Link>
					<Link to="#summer" className="season summer">Summer</Link>
					<Link to="#autumn" className="season autumn">Autumn</Link>
					<Link to="#winter" className="season winter">Winter</Link>
				</div>
			</div>
		</>
	);
};

export default SeasonsWheel;
