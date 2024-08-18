// app/components/Header.tsx

import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { CartButton, SearchForm } from '~/components/CartButton';

import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dropdown } from "flowbite-react";

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
		<header className="py-4 px-6">
			<div className="container mx-auto flex items-center justify-between">
				<NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
					<img className='w-20' src="/assets/logos/sc-logo.svg" alt="Logo" />
				</NavLink>
				<HeaderMenu header={header} viewport="desktop" />
				<div className="flex items-center space-x-4">
					<HeaderCtas cart={cart} />
					<div className='md:hidden'>
						<HeaderMenuMobileToggle />
					</div>
				</div>
			</div>
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
	const retailLink = header?.menu?.items?.find((item) => item.title === 'Gifts');
	const className = `flex items-center space-x-6 justify-center w-full max-w-max mx-auto`;

	return (
		<nav className={className} role="navigation">
			{viewport === 'mobile' && (
				<div>
					<MobileMenu header={header} />
					<NavLink
						end
						prefetch="intent"
						style={activeLinkStyle}
						to="/"
					>
						Home
					</NavLink>
				</div>
			)}
			{viewport === 'desktop' && (
				<div className="hidden md:flex items-center space-x-6 text-xl font-bold">
					{retailLink && (
						<NavLink
							className="hover:text-red-600"
							end
							prefetch="intent"
							style={activeLinkStyle}
							to={new URL(retailLink.url).pathname}
						>
							Gifts
						</NavLink>
					)}

					<Dropdown
						className="bg-transparent p-0"
						label={
							<span className="flex items-center text-center hover:text-red-600">
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

					<NavLink to="/all-year" className="hover:text-red-600">All Year</NavLink>
					<NavLink to="/about" className="hover:text-red-600">About</NavLink>
				</div>
			)}
		</nav>
	);
}

function HeaderCtas({
	cart,
}: Pick<HeaderProps, 'cart'>) {
	return (
		<nav className="flex items-center space-x-4">
			<SearchForm />
			<CartToggle cart={cart} />
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
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto">
			<div className="flex justify-end p-4">
				<button
					onClick={() => close()}
					className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
				>
					<XMarkIcon className="w-6 h-6 text-gray-700" />
				</button>
			</div>
			<nav className="px-4 py-2 pl-10">
				<NavLink
					end
					prefetch="intent"
					style={activeLinkStyle}
					to="/"
					onClick={() => close()}
					className="block py-2"
				>
					Home
				</NavLink>
				<NavLink
					to="/gifts"
					onClick={() => close()}
					className="block py-2"
				>
					Gifts
				</NavLink>
				<div className="py-2">
					<h3 className="font-bold">Holidays</h3>
					<NavLink to="/collections/christmas" onClick={() => close()} className="block py-1 pl-4">Christmas</NavLink>
					<NavLink to="/collections/valentines" onClick={() => close()} className="block py-1 pl-4">Valentine's Day</NavLink>
					<NavLink to="/collections/easter" onClick={() => close()} className="block py-1 pl-4">Easter</NavLink>
					<NavLink to="/collections/halloween" onClick={() => close()} className="block py-1 pl-4">Halloween</NavLink>
				</div>
				<NavLink to="/all-year" onClick={() => close()} className="block py-2">All Year</NavLink>
				<NavLink to="/about" onClick={() => close()} className="block py-2">About</NavLink>
			</nav>
		</div>
	);
}

function activeLinkStyle({
	isActive,
	isPending,
}: {
	isActive: boolean;
	isPending: boolean;
}) {
	return {
		fontWeight: 'bold',
		color: isActive ? '#ED1C24' : isPending ? 'grey' : 'black',
	};
}