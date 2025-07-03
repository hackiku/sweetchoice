// app/components/navigation/MobileMenu.tsx

import React, { useRef, useEffect } from 'react';
import { NavLink } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const MENU_LINKS = [
	{ to: "/", label: "nav.menu.home", exact: true },
	{ to: "/collections/all", label: "nav.menu.allYear", exact: false },
	{ to: "/gifts", label: "nav.menu.gifts", exact: false },
	{ to: "/about", label: "nav.menu.about", exact: false }
];

const HOLIDAY_LINKS = [
	{ to: "/collections/christmas", label: "nav.holidays.christmas" },
	{ to: "/collections/valentines", label: "nav.holidays.valentines" },
	{ to: "/collections/easter", label: "nav.holidays.easter" },
	{ to: "/collections/halloween", label: "nav.holidays.halloween" }
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[49] bg-black bg-opacity-50 transition-opacity duration-300">
			<div
				ref={menuRef}
				className={`fixed inset-y-0 right-0 w-full max-w-md transform transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
			>
				{/* Full height drawer - no margins, no shadows */}
				<div
					className="h-full bg-[#fff8ee] border-l-4 border-black"
					style={{
						backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
						backgroundSize: '20px 20px'
					}}
				>
					{/* Menu content */}
					<nav className="h-full flex flex-col py-6 px-4">
						{/* Main menu items - more compact */}
						<div className="space-y-2 mt-14">
							{MENU_LINKS.map(({ to, label, exact }) => (
								<NavLink
									key={to}
									end={exact}
									to={to}
									onClick={onClose}
									className={({ isActive }) =>
										`block py-3 px-4 text-lg font-bold transition-all duration-200 border-2 border-black rounded-lg
                     ${isActive
											? 'bg-[#ED1C24] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
											: 'bg-white text-black hover:bg-[#ED1C24] hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
										}`
									}
								>
									{t(label)}
								</NavLink>
							))}
						</div>

						{/* Holiday section - more compact */}
						<div className="mt-6 flex-1">
							<h3 className="text-lg font-bold mb-3 text-[#ED1C24] px-4">
								{t('nav.holidays.title')}
							</h3>
							<div className="space-y-2">
								{HOLIDAY_LINKS.map(({ to, label }) => (
									<NavLink
										key={to}
										to={to}
										onClick={onClose}
										className={({ isActive }) =>
											`block py-2 px-4 text-base font-semibold transition-all duration-200 border-2 border-black rounded-lg
                         ${isActive
												? 'bg-[#ED1C24] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
												: 'bg-white text-black hover:bg-[#ED1C24] hover:text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
											}`
										}
									>
										{t(label)}
									</NavLink>
								))}
							</div>
						</div>

						{/* Bottom branding */}
						<div className="mt-auto pt-4 border-t-2 border-black">
							<div className="flex items-center justify-center">
								<img src="/assets/logos/sc-logo.svg" alt="SweetChoice Logo" className="w-12 h-12" />
								<span className="ml-2 text-lg font-bold text-black">SweetChoice</span>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;