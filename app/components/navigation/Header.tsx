// app/components/navigation/Header.tsx

import React from 'react';
import { Await, NavLink, useLocation } from '@remix-run/react';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
// import { CartButton } from '~/components/CartButton';
import { Dropdown } from "flowbite-react";
import { useMenu } from './MenuContext';
import { useTranslation } from '~/lib/i18n/useTranslation';

interface HeaderProps {
	header: HeaderQuery;
	cart: Promise<CartApiQueryFragment | null>;
	isLoggedIn: Promise<boolean>;
	publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
	header,
	isLoggedIn,
	cart,
	publicStoreDomain,
}: HeaderProps) {
	return (
		<header className="relative py-4 px-6 sm:px-12" style={{ zIndex: 50 }}>
			<div className="container flex items-center justify-between w-3/5">
				<NavLink prefetch="intent" to="/" className="relative group" end>
					<img className='w-20' src="/assets/logos/sc-logo.svg" alt="Logo" />
				</NavLink>
				<HeaderMenu header={header} viewport="desktop" />
				{/* <div className="flex items-center space-x-2">
					<HeaderCtas cart={cart} />
				</div> */}
			</div>
		</header>
	);
}

function HeaderCtas({
	cart,
}: Pick<HeaderProps, 'cart'>) {
	return (
		<nav className="flex items-center space-x-4" style={{ zIndex: 51 }}>
			{/* <CartButton /> */}
		</nav>
	);
}

const MENU_ITEMS = [
	{ to: "/collections/all", label: "nav.menu.allYear" },
	{ to: "/about", label: "nav.menu.about" },
	// { to: "/contact", label: "nav.menu.contact" }
];

const HOLIDAY_ITEMS = [
	{ to: "/collections/christmas", label: "nav.holidays.christmas" },
	{ to: "/collections/valentines", label: "nav.holidays.valentines" },
	{ to: "/collections/easter", label: "nav.holidays.easter" },
	{ to: "/collections/halloween", label: "nav.holidays.halloween" }
];

export function HeaderMenu({
	header,
	viewport,
}: {
	header: HeaderQuery;
	viewport: Viewport;
}) {
	const { isOpen: isMobileMenuOpen } = useMenu();
	const { t } = useTranslation();
	const location = useLocation();

	// Check if current path is a holiday collection
	const isHolidayPageActive = HOLIDAY_ITEMS.some(item =>
		location.pathname === item.to ||
		location.pathname.startsWith(item.to)
	);

	// Don't render desktop menu when mobile menu is open
	if (viewport === 'desktop' && isMobileMenuOpen) {
		return null;
	}

	// Only render desktop menu
	if (viewport === 'mobile') {
		return null;
	}

	return (
		<nav
			className="flex items-center space-x-6 justify-center w-full max-w-max mx-auto"
			role="navigation"
			style={{ zIndex: 51 }}
		>
			<div className="hidden md:flex items-start space-x-6 text-xl font-bold">
				<Dropdown
					className="bg-transparent p-0"
					label={
						<span className={`transition-colors duration-200 flex items-center relative
							${isHolidayPageActive
								? '__text-[#ED1C24] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#ED1C24]'
								: 'text-black hover:text-[#ED1C24]'
							}`}>
							{t('nav.holidays.title')}
						</span>
					}
					inline
				>
					<div className="absolute z-[60] -ml-10 w-72 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						{HOLIDAY_ITEMS.map(({ to, label }) => (
							<NavLink
								key={to}
								to={to}
								className={({ isActive }) =>
									`block w-full p-3 border-b-2 border-black last:border-b-0 font-bold transition-colors
									${isActive
										? 'bg-[#ED1C24] __text-white'
										: 'text-black hover:bg-[#ED1C24] __hover:text-white'
									}`
								}
							>
								{t(label)}
							</NavLink>
						))}
					</div>
				</Dropdown>

				{MENU_ITEMS.map(({ to, label }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`relative text-black hover:text-[#ED1C24] transition-colors duration-200
               ${isActive ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#ED1C24]' : ''}`
						}
					>
						{t(label)}
					</NavLink>
				))}
			</div>
		</nav>
	);
}