// app/components/seasons/SeasonsWheel.tsx

import React from 'react';
import { Link } from '@remix-run/react';

const SeasonsWheel = () => {
	return (
		<div className="seasons-wheel-container">
			<div className="seasons-wheel">
				<Link to="#spring" className="season spring">Spring</Link>
				<Link to="#summer" className="season summer">Summer</Link>
				<Link to="#autumn" className="season autumn">Autumn</Link>
				<Link to="#winter" className="season winter">Winter</Link>
			</div>
		</div>
	);
};

export default SeasonsWheel;
