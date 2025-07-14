// app/components/ui/Eyebrow.tsx

import React from 'react';

interface EyebrowProps {
	text: string;
	className?: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ text, className = '' }) => {
	return (
		<div className={`flex justify-center mb-4 ${className} text-white font-semibold px-3 py-1.5 rounded-full shadow` }>
			{text}
		</div>
	);
};

export default Eyebrow;
