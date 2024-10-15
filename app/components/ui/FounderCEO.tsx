// app/components/ui/FounderCEO.tsx

import React from 'react';

const FounderCEO = () => {
	return (
		<div className="w-full bg-gray-200 flex items-center justify-center text-2xl font-bold border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
			<div className="flex flex-col md:flex-row p-12 ">
				<div className="w-44 h-44 bg-gray-600 flex items-center justify-center text-2xl font-bold border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
					<p className="font-light text-xl">pic</p>
				</div>
			</div>
		
			<div className="flex flex-col">
				<h2>
					Meet Stan
				</h2>
				<p>
					Info in 30 words
				</p>
				<div>
					[contact]
				</div>
			
			</div>			
		</div>
	);
};

export default FounderCEO;