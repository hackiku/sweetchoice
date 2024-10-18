// app/components/ui/StatBlurbs.tsx

import React from 'react';
import { Link } from '@remix-run/react';

interface StatBlurbProps {
	stat: string;
	description: string;
	link?: string;
	bgColor: string;
}

const StatBlurb: React.FC<StatBlurbProps> = ({ stat, description, link, bgColor }) => {
	const content = (
		<div className={`p-6 border-4 border-black ${bgColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
						hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
						transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1`}>
			<h3 className="text-6xl font-black mb-2">{stat}</h3>
			<h4 className="text-xl font-bold">{description}</h4>
		</div>
	);

	return link ? (
		<Link to={link} className="block cursor-pointer">
			{content}
		</Link>
	) : (
		content
	);
};

const StatBlurbs: React.FC = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			<StatBlurb
				stat="2013"
				description="Year founded"
				bgColor="bg-[#FFD700]"
			/>
			<StatBlurb
				stat="16+"
				description="Partner countries"
				link="/about#map"
				bgColor="bg-[#FF69B4]"
			/>
			<StatBlurb
				stat="2.1M+"
				description="Unique treats per year"
				link="/collections/all"
				bgColor="bg-[#00CED1]"
			/>
		</div>
	);
};

export default StatBlurbs;