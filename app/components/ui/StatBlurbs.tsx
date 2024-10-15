// app/components/ui/StatBlurbs.tsx

import React from 'react';

interface StatBlurbsPropsProps {
	headline: string;
	description: string;
	icon: '🎉' | '🎂' | '🍬' | '🍭';
	children?: React.ReactNode;
	onClick?: () => void;
}

const StatBlurbs = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div className="p-6 border-4 border-black bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
							hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
							transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
				<h3 className="text-6xl font-black mb-2">2013</h3>
				<h4 className="text-xl font-bold">Year Sweetchoice was founded</h4>
			</div>
			<div className="p-6 border-4 border-black bg-[#FF69B4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
							hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
							transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
				<h3 className="text-6xl font-black mb-2">15+</h3>
				<h4 className="text-xl font-bold">Countries we distribute to</h4>
			</div>
			<div className="p-6 border-4 border-black bg-[#00CED1] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
							hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
							transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
				<h3 className="text-6xl font-black mb-2">200+</h3>
				<h4 className="text-xl font-bold">Unique seasonal products</h4>
			</div>
		</div>
	);
};

export default StatBlurbs;
