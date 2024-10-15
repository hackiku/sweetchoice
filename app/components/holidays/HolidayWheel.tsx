// app/components/holidays/HolidayWheel.tsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';

const holidays = [
	{ name: 'Christmas', emoji: '🎅', id: 'christmas' },
	{ name: 'Valentines', emoji: '💖', id: 'valentines' },
	{ name: 'Easter', emoji: '🐰', id: 'easter' },
	{ name: 'Halloween', emoji: '🎃', id: 'halloween' },
];

const HolidayWheel = () => {
	const [activeHoliday, setActiveHoliday] = useState('');
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			const sections = holidays.map(holiday =>
				document.getElementById(holiday.id)
			);

			const activeSection = sections.find(section => {
				if (section) {
					const rect = section.getBoundingClientRect();
					return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
				}
				return false;
			});

			if (activeSection) {
				setActiveHoliday(activeSection.id);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
			<div className="flex justify-center items-end gap-2">
				{holidays.map((holiday) => (
					<Link
						key={holiday.id}
						to={`#${holiday.id}`}
						className={`flex justify-center items-center rounded-full 
                        border-4 border-black transition-all duration-300
                        ${activeHoliday === holiday.id
								? 'w-16 h-16 text-2xl bg-black text-white shadow-[4px_4px_0px_0px_#FFFFFF]'
								: 'w-12 h-12 text-xl bg-white text-black shadow-[4px_4px_0px_0px_#000000] hover:scale-110'
							}`}
						onClick={() => setActiveHoliday(holiday.id)}
					>
						{holiday.emoji}
					</Link>
				))}
			</div>
		</div>
	);
};

export default HolidayWheel;