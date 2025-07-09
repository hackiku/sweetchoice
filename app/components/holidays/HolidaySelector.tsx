// app/components/holidays/HolidaySelector.tsx

import React from 'react';
import { Link, useParams } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';

const HOLIDAY_ITEMS = [
	{ id: 'all', emoji: '🏠', handle: 'all' },
	{ id: 'christmas', emoji: '🎅', handle: 'christmas' },
	{ id: 'valentines', emoji: '💝', handle: 'valentines' },
	{ id: 'easter', emoji: '🐰', handle: 'easter' },
	{ id: 'halloween', emoji: '🎃', handle: 'halloween' }
] as const;

interface HolidaySelectorProps {
	className?: string;
}

const HolidaySelector: React.FC<HolidaySelectorProps> = ({ className = '' }) => {
	const { t } = useTranslation();
	const params = useParams();
	const currentHandle = params.handle || 'all';

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{HOLIDAY_ITEMS.map(({ id, emoji, handle }) => {
				const isActive = currentHandle === handle;
				const isAllProducts = id === 'all';

				return (
					<div key={id} className="flex items-center">
						{/* Left arrow for All Products */}
						{isAllProducts && (
							<div className="w-6 h-12 flex items-center justify-end mr-1">
								<div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[16px] border-r-black"></div>
							</div>
						)}

						<Link
							to={handle === 'all' ? '/collections/all' : `/collections/${handle}`}
							className={`flex justify-center items-center rounded-full 
								border-4 border-black transition-all duration-200
								w-12 h-12 text-xl font-bold
								${isActive
									? 'bg-black text-white shadow-[4px_4px_0px_0px_#ED1C24]'
									: isAllProducts
										? 'bg-[#FFE135] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-105'
										: 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-105'
								}
								active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
								active:translate-x-[2px] active:translate-y-[2px]`}
							title={t(`holidays.${id === 'all' ? 'allProducts' : id}.title`)}
							aria-label={t(`holidays.${id === 'all' ? 'allProducts' : id}.title`)}
						>
							{emoji}
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default HolidaySelector;