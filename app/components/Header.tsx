// app/components/Header.tsx

import React, { useState, Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { CartButton } from '~/components/CartButton';
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { Dropdown } from "flowbite-react";
import ContactModal from '~/components/ui/ContactModal';

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

	return (
		<header className="relative isolate py-4 px-6 sm:px-12">
			<div className="container flex items-center justify-between">
				<NavLink prefetch="intent" to="/" className="relative group" end>
					<img className='w-20' src="/assets/logos/sc-logo.svg" alt="Logo" />
					<span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ED1C24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
				</NavLink>
				<HeaderMenu header={header} viewport="desktop" />
				<div className="flex items-center space-x-4">
					<HeaderCtas cart={cart} onContactClick={() => setIsModalOpen(true)} />
					<div className='md:hidden'>
						<HeaderMenuMobileToggle />
					</div>
				</div>
			</div>
			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</header>
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
		<nav className={className} role="navigation">
			{viewport === 'mobile' && (
				<div>
					<MobileMenu header={header} />
					<NavLink
						end
						prefetch="intent"
						to="/"
						className="header-link"
					>
						Home
					</NavLink>
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
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/christmas">Christmas</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/valentines">Valentine's Day</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/easter">Easter</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/halloween">Halloween</Dropdown.Item>
					</Dropdown>

					<NavLink
						to="/collections/all"
						className={({ isActive }) =>
							`relative text-black hover:text-[#ED1C24]  transition-colors duration-200
               ${isActive ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#ED1C24]' : ''}`
						}
					>
						All Year
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) =>
							`relative text-black hover:text-[#ED1C24] transition-colors duration-200
               ${isActive ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#ED1C24]' : ''}`
						}
					>
						About
					</NavLink>
				</div>
			)}
		</nav>
	);
}

function HeaderCtas({
	cart,
	onContactClick,
}: Pick<HeaderProps, 'cart'> & { onContactClick: () => void }) {
	return (
		<nav className="flex items-center space-x-4">
			{/* <button
				className="rounded-full w-12 h-12 flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
				// onClick=
			>				
				<MagnifyingGlassIcon className="w-6 h-6" />
			</button> */}

			<button
				className="rounded-full text-2xl w-12 h-12 flex items-center justify-center bg-orange-300 text-black border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
				onClick={onContactClick}
			>
				{/* 👋 */}
				<ShoppingCartIcon className="w-6 h-6"/>	
			</button>

			{/* <CartToggle cart={cart} /> */}
		</nav>
	);
}

function HeaderMenuMobileToggle() {
	const { open } = useAside();
	return (
		<button
			className="md:hidden rounded-full w-12 h-12 flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
			onClick={() => open('mobile')}
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
	return (
		<Suspense fallback={<CartButton type="cart" count={0} />}>
			<Await resolve={cart}>
				{cart => {
					if (!cart) return <CartButton type="cart" count={0} />;
					return <CartButton type="cart" count={cart.totalQuantity || 0} />;
				}}
			</Await>
		</Suspense>
	);
}

function MobileMenu({ header }) {
	const { close } = useAside();
	return (
		<div className="fixed inset-0 bg-white" style={{ zIndex: 1000 }}>
			<div className="relative min-h-screen border-4 border-black m-4 bg-[#fff8ee] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<button
					onClick={() => close()}
					className="absolute right-4 top-4 w-12 h-12 flex items-center justify-center
                     bg-[#ED1C24] text-white border-4 border-black rounded-full
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                     active:translate-x-[2px] active:translate-y-[2px]
                     transition-all duration-200"
				>
					<XMarkIcon className="w-6 h-6" />
				</button>

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
								`block py-4 text-2xl font-bold transition-all duration-200
                 ${isActive ? 'text-[#ED1C24] pl-4 border-l-4 border-[#ED1C24]' : 'text-black hover:text-[#ED1C24] hover:pl-4'}`
							}
						>
							{label}
						</NavLink>
					))}

					<div className="mt-8">
						<h3 className="text-2xl font-bold mb-4 text-[#ED1C24]">Holidays</h3>
						<div className="grid grid-cols-1 gap-4">
							{['Christmas', "Valentine's Day", 'Easter', 'Halloween'].map((holiday) => (
								<NavLink
									key={holiday}
									to={`/collections/${holiday.toLowerCase().replace("'s", '').replace(' ', '')}`}
									onClick={() => close()}
									className="block p-4 text-xl font-bold text-black
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
