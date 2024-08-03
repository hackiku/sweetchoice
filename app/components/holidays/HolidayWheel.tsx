// app/components/seasons/HolidayWheel.tsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';

const holidays = [
	{ name: 'Christmas', emoji: '🎅' },
	{ name: 'Valentines', emoji: '💖' },
	{ name: 'Easter', emoji: '🐰' },
	{ name: 'Halloween', emoji: '🎃' },
];

const HolidayWheel = () => {
	const [activeHoliday, setActiveHoliday] = useState('');
	const location = useLocation();

	useEffect(() => {
		const hash = location.hash.slice(1);
		setActiveHoliday(hash);
	}, [location]);

	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
			<div className="flex justify-center items-center gap-4">
				{holidays.map((holiday, index) => (
					<Link
						key={index}
						to={`#${holiday.name.toLowerCase()}`}
						className={`flex justify-center items-center rounded-full 
                                    border-4 border-black transition-all duration-300 
                                    hover:scale-110
                                    ${activeHoliday === holiday.name.toLowerCase()
								? 'w-[64px] h-[64px] text-2xl bg-black text-white shadow-[4px_4px_0px_0px_#FFFFFF]'
								: 'w-[48px] h-[48px] text-xl bg-white text-black shadow-[4px_4px_0px_0px_#000000]'}`}
					>
						{holiday.emoji}
					</Link>
				))}
			</div>
		</div>
	);
};

export default HolidayWheel;