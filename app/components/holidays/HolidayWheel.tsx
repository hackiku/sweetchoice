// app/components/seasons/HolidayWheel.tsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';

const holidays = [
	{ name: 'Christmas', color: '#E6F3FF', emoji: '🎅' },
	{ name: 'Valentines', color: '#FFE6E6', emoji: '💖' },
	{ name: 'Easter', color: '#F0FFF0', emoji: '🐰' },
	{ name: 'Halloween', color: '#FFF5E6', emoji: '🎃' },
];

const HolidayWheel = () => {
	const [activeHoliday, setActiveHoliday] = useState('');
	const location = useLocation();

	useEffect(() => {
		const hash = location.hash.slice(1);
		setActiveHoliday(hash);
	}, [location]);

	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10">
			<div className="relative w-96 h-48 overflow-hidden">
				<div className="absolute bottom-0 left-0 w-full h-full flex">
					{holidays.map((holiday, index) => (
						<Link
							key={index}
							to={`#${holiday.name.toLowerCase()}`}
							className={`w-1/4 h-full flex justify-center items-end pb-4
                                        text-center text-sm font-bold transition-all duration-300
                                        border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:h-[110%] hover:z-20
                                        ${activeHoliday === holiday.name.toLowerCase() ? 'h-[110%] z-20' : 'z-10'}`}
							style={{
								backgroundColor: holiday.color,
								clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
							}}
						>
							<span>{holiday.name}</span>
						</Link>
					))}
				</div>
				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                                w-16 h-16 bg-white border-4 border-black rounded-full 
                                flex justify-center items-center text-2xl font-bold
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30">
					🍭
				</div>
			</div>
		</div>
	);
};

export default HolidayWheel;