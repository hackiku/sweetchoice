// app/components/MobileMenu.tsx

import React, { useRef, useEffect } from 'react';
import { NavLink } from '@remix-run/react';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

// const { t } = useTranslation();

const MENU_LINKS = [
	// { to: "/", label: "nav.menu.home", exact: true },
	{ to: "/", label: "nav.menu.home", exact: true },
	{ to: "/collections/all", label: "nav.menu.allYear", exact: false },
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
		<div
			className="fixed inset-0 z-[49] bg-black bg-opacity-50 transition-opacity duration-300"
			style={{ opacity: isOpen ? 1 : 0 }}
		>
			<div
				ref={menuRef}
				className={`fixed inset-y-0 left-0 w-full max-w-md transform transition-transform duration-300 ease-in-out
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div className="relative h-full">
					{/* Background pattern and main container */}
					<div
						className="absolute inset-0 m-4 bg-[#fff8ee] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
						style={{
							backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
							backgroundSize: '20px 20px'
						}}
					>
						{/* Menu content */}
						<nav className="p-8 pt-20">
							{MENU_LINKS.map(({ to, label, exact }) => (
								<NavLink
									key={to}
									end={exact}
									to={to}
									onClick={onClose}
									className={({ isActive }) =>
										`block py-4 text-xl font-bold transition-all duration-200
                     ${isActive
											? 'text-[#ED1C24] pl-4 border-l-4 border-[#ED1C24]'
											: 'text-black hover:text-[#ED1C24] hover:pl-4'}`
									}
								>
									{t(label)}
								</NavLink>
							))}

							<div className="mt-8">
								<h3 className="text-xl font-bold mb-4 text-[#ED1C24]">
									{t('nav.holidays.title')}
								</h3>
								<div className="grid grid-cols-1 gap-4">
									{HOLIDAY_LINKS.map(({ to, label }) => (
										<NavLink
											key={to}
											to={to}
											onClick={onClose}
											className={({ isActive }) =>
												`block p-4 text-md font-bold
                         ${isActive
													? 'bg-[#ED1C24] text-white'
													: 'bg-white text-black hover:text-[#ED1C24]'}
                         border-4 border-black
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                         active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                         active:translate-x-[2px] active:translate-y-[2px]
                         transition-all duration-200`
											}
										>
											{t(label)}
										</NavLink>
									))}
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;