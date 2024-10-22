// app/components/Header.tsx

import React, { useState, Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { CartButton } from '~/components/CartButton';
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Dropdown } from "flowbite-react";

import ContactModal from '~/components/ui/ContactModal';
import IconToggleButton from '~/components/ui/IconToggleButton';


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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { open, close } = useAside();

	// Handle mobile menu toggle
	const handleMobileMenuToggle = () => {
		if (isMobileMenuOpen) {
			close();
			setIsMobileMenuOpen(false);
		} else {
			open('mobile');
			setIsMobileMenuOpen(true);
		}
	};

	return (
		<header className="relative py-4 px-6 sm:px-12" style={{ zIndex: 50 }}>
			
			
			<div className="container flex items-center justify-between">
				<NavLink prefetch="intent" to="/" className="relative group" end>
					<img className='w-20' src="/assets/logos/sc-logo.svg" alt="Logo"/>
				</NavLink>
				<HeaderMenu header={header} viewport="desktop" />
				<div className="flex items-center space-x-4">
					<HeaderCtas
						cart={cart}
						isContactOpen={isModalOpen}
						onContactClick={() => setIsModalOpen(!isModalOpen)}
					/>
					<IconToggleButton
						isOpen={isMobileMenuOpen}
						onClick={handleMobileMenuToggle}
						icon={
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						}
						variant="menu"
						label="Toggle mobile menu"
					/>
				</div>
			</div>


			
			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</header>
	);
}

function HeaderCtas({
	cart,
	isContactOpen,
	onContactClick,
}: Pick<HeaderProps, 'cart'> & {
	isContactOpen: boolean;
	onContactClick: () => void;
}) {
	return (
		<nav className="flex items-center space-x-4" style={{ zIndex: 51 }}>
			{!isContactOpen && (
				<button
					onClick={onContactClick}
					className="rounded-full w-12 h-12 flex items-center justify-center 
                   bg-blue-500 text-black text-2xl border-4 border-black 
                   hover:bg-black hover:text-white transition-all duration-200
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                   hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   active:translate-x-[2px] active:translate-y-[2px]"
				>
					👋
				</button>
			)}
		</nav>
	);
}
export function HeaderMenu({
	header,
	viewport,
}: {
	header: HeaderQuery;
	viewport: Viewport;
}) {
	const className = `flex items-center space-x-6 justify-center w-full max-w-max mx-auto`;

	return (
		<nav className={className} role="navigation" style={{ zIndex: 51 }}>
			{viewport === 'mobile' && (
				<div>
					<MobileMenu header={header} />
				</div>
			)}
			{viewport === 'desktop' && (
				<div className="hidden md:flex items-start space-x-6 text-xl font-bold">
					<Dropdown
						className="bg-transparent p-0"
						label={
							<span className="text-black hover:text-[#ED1C24] transition-colors duration-200 flex items-center">
								Holidays
							</span>
						}
						inline
					>
						<div className="absolute z-[60] mt-2 w-72 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
							{['Christmas', "Valentine's", 'Easter', 'Halloween'].map((holiday) => (
								<NavLink
									key={holiday}
									to={`/collections/${holiday.toLowerCase().replace("'s", 's').replace(' ', '')}`}
									className="block w-full p-3 text-black hover:bg-[#ED1C24] hover:text-white border-b-2 border-black last:border-b-0 font-bold transition-colors"
								>
									{holiday}
								</NavLink>
							))}
						</div>
					</Dropdown>

					{[
						{ to: "/collections/all", label: "All Year" },
						{ to: "/about", label: "About" }
					].map(({ to, label }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								`relative text-black hover:text-[#ED1C24] transition-colors duration-200
                ${isActive ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#ED1C24]' : ''}`
							}
						>
							{label}
						</NavLink>
					))}
				</div>
			)}
		</nav>
	);
}




function MobileMenu({ header }) {
	const { close } = useAside();
	return (
		<div className="fixed inset-0 bg-white" style={{ zIndex: 999 }}>
			<div className="relative min-h-screen border-4 border-black m-4 bg-[#fff8ee] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

				<nav className="p-8 pt-20">
					{[
						{ to: "/", label: "Home" },
						{ to: "/collections/all", label: "All Year" },
						{ to: "/about", label: "About" }
					].map(({ to, label }) => (
						<NavLink
							key={to}
							end={to === "/"}
							to={to}
							onClick={() => close()}
							className={({ isActive }) =>
								`block py-4 text-xl font-bold transition-all duration-200
                 ${isActive ? 'text-[#ED1C24] pl-4 border-l-4 border-[#ED1C24]' : 'text-black hover:text-[#ED1C24] hover:pl-4'}`
							}
						>
							{label}
						</NavLink>
					))}

					<div className="mt-6">
						<h3 className="text-xl font-bold mb-4 text-[#ED1C24]">Holidays</h3>
						<div className="grid grid-cols-1 gap-4">
							{['Christmas', "Valentine's", 'Easter', 'Halloween'].map((holiday) => (
								<NavLink
									key={holiday}
									to={`/collections/${holiday.toLowerCase().replace("'s", 's').replace(' ', '')}`}
									onClick={() => close()}
									className="block p-4 text-md font-bold text-black
                           border-4 border-black bg-white
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           hover:text-[#ED1C24]
                           active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                           active:translate-x-[2px] active:translate-y-[2px]
                           transition-all duration-200"
								>
									{holiday}
								</NavLink>
							))}
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}