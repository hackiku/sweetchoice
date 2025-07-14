// app/components/holidays/HolidayWheel.tsx

// app/components/holidays/HolidayWheel.tsx

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';

const HOLIDAY_ITEMS = [
	{ id: 'christmas', emoji: '🎅' },
	{ id: 'valentines', emoji: '💝' },
	{ id: 'easter', emoji: '🐰' },
	{ id: 'halloween', emoji: '🎃' }
] as const;

const HolidayWheel = () => {
	const [activeHoliday, setActiveHoliday] = useState('');
	const [searchParams] = useSearchParams();
	const currentLocale = searchParams.get('locale') || 'sr';
	const { t } = useTranslation();

	useEffect(() => {
		const handleScroll = () => {
			const sections = HOLIDAY_ITEMS.map(item =>
				document.getElementById(item.id)
			);

			const activeSection = sections.find(section => {
				if (!section) return false;
				const rect = section.getBoundingClientRect();
				return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
			});

			if (activeSection) {
				setActiveHoliday(activeSection.id);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const getLocalizedUrl = (holidayId: string) => {
		// Preserve the current locale when navigating to anchors
		return `?locale=${currentLocale}#${holidayId}`;
	};

	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
			<div className="flex justify-center items-end gap-2">
				{HOLIDAY_ITEMS.map(({ id, emoji }) => (
					<Link
						key={id}
						to={getLocalizedUrl(id)}
						className={`flex justify-center items-center rounded-full 
              border-4 border-black transition-all duration-300
              ${activeHoliday === id
								? 'w-16 h-16 text-2xl bg-black text-white shadow-[4px_4px_0px_0px_#FFFFFF]'
								: 'w-12 h-12 text-xl bg-white text-black shadow-[4px_4px_0px_0px_#000000] hover:scale-110'
							}`}
						onClick={() => setActiveHoliday(id)}
						title={t(`holidays.holidays.${id}.name`)}
						aria-label={t(`holidays.holidays.${id}.name`)}
					>
						{emoji}
					</Link>
				))}
			</div>
		</div>
	);
};

export default HolidayWheel;