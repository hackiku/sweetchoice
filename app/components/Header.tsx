// app/components/Header.tsx

import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { Searchform } from '~/components/PageLayout';


// flowbite
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dropdown, Badge } from "flowbite-react";
import HeaderNav from "~/components/ecom/HeaderNav";


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
		<header className="">
			<div className='container mx-auto'>
				<div className='main-header flex items-center justify-between py-4 px-8 sm-max:gap-2 sm-max:px-3 lg-max:px-3'>
				<NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
				<img className='w-20' src="/assets/logos/sc-logo.svg" alt="Logo" />
			</NavLink>
			{/* <HeaderNav /> */}
			<HeaderMenu header={header} viewport="desktop" />
			<HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
			<div className='ml-4'>
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
	const className = `flex items-center space-x-8 justify-center w-full max-w-max mx-auto`;

	

	return (
		<nav className={className} role="navigation">
			{viewport === 'mobile' && (
				<div>
					<MobileMenu />
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
				<div className="hidden md:flex container mx-auto items-center space-x-6">
					{retailLink && (
						<NavLink
							className="text-gray-700 hover:text-primary-600"
							end
							prefetch="intent"
							style={activeLinkStyle}
							to={new URL(retailLink.url).pathname}
						>
							Shop
						</NavLink>
					)}

					<Dropdown
						className="bg-[#fff8ee] p-0"
						label={
							<span className="flex items-center text-center">
								Holidays 
								{/* <Badge color="" className="border rounded-full text-[0.6em] ml-1">B2B</Badge> */}
							</span>
						}
						inline
					>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/christmas">Christmas</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/valentines">Valentine's Day</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/easter">Easter</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/halloween">Halloween</Dropdown.Item>
					</Dropdown>

					<Dropdown label="All Year" inline className="flex items-center bg-[#fff8ee]">
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/pick-mix">Pick & mix</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/confectionery">Confectionery</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections/corporate-gifts">Corporate Gifts</Dropdown.Item>
					</Dropdown>

					<Dropdown label="About" inline className="flex items-center bg-[#fff8ee]">
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/about">About</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/blogs">Blogs</Dropdown.Item>
						<Dropdown.Item className="inline-flex w-72 justify-center text-[#000] gap-x-1.5 bg-[#fff8ee] hover:bg-[#ED1C24] px-3 py-3 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" href="/collections">Collections</Dropdown.Item>
					</Dropdown>
				</div>
			)}
		</nav>
	);
}

function HeaderCtas({
	isLoggedIn,
	cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
	return (
		<nav className="flex items-center space-x-4">
			{/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
				<Suspense fallback="Sign in">
					<Await resolve={isLoggedIn} errorElement="Sign in">
						{(isLoggedIn) => (isLoggedIn ? <UserIcon className="w-6 h-6 text-gray-700" /> : 'Sign in')}
					</Await>
				</Suspense>
			</NavLink> */}
		<Searchform />
			<CartToggle cart={cart} />
		</nav>
	);
}

function HeaderMenuMobileToggle() {
	const { open } = useAside();
	return (
		<button
			className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
			onClick={() => open('mobile')}
		>
			<h3 className='m-0'>☰</h3>
		</button>
	);
}

function SearchToggle() {
	const { open } = useAside();
	return (
		<button className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" onClick={() => open('search')}>
			<MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
		</button>
	);
}

function CartBadge({ count }: { count: number }) {
	const { open } = useAside();
	const { publish, shop, cart, prevCart } = useAnalytics();

	return (
		<a
			href="/cart"
			onClick={(e) => {
				e.preventDefault();
				open('cart');
				publish('cart_viewed', {
					cart,
					prevCart,
					shop,
					url: window.location.href || '',
				} as CartViewPayload);
			}}
			className="relative"
		>
			
			<div className="w-6 h-6 text-gray-700">
			<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_165_191)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.4 22.4C6.86 22.4 5.6 23.66 5.6 25.2C5.6 26.74 6.86 28 8.4 28C9.94 28 11.2 26.74 11.2 25.2C11.2 23.66 9.94 22.4 8.4 22.4ZM0 0V2.8H2.8L7.84 13.44L5.88 16.8C5.74 17.22 5.6 17.78 5.6 18.2C5.6 19.74 6.86 21 8.4 21H25.2V18.2H8.96C8.82 18.2 8.68 18.06 8.68 17.92V17.78L9.94 15.4H20.3C21.42 15.4 22.26 14.84 22.68 14L27.72 4.9C28 4.62 28 4.48 28 4.2C28 3.36 27.44 2.8 26.6 2.8H5.88L4.62 0H0ZM22.4 22.4C20.86 22.4 19.6 23.66 19.6 25.2C19.6 26.74 20.86 28 22.4 28C23.94 28 25.2 26.74 25.2 25.2C25.2 23.66 23.94 22.4 22.4 22.4Z" fill="#19063D"/>
</g>
<defs>
<clipPath id="clip0_165_191">
<rect width="28" height="28" fill="white"/>
</clipPath>
</defs>
</svg></div>

			{count > 0 && (
				<span className="ljslkjdslklks absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
					{count}
				</span>
			)}
		</a>
	);
}

function MobileMenu({ header, setIsMobileMenuOpen }) {
	const { close } = useAside();
	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto">
			<div className="flex justify-end p-4">
				<button
					onClick={() => close()}
					className="1111 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
					onClick={() => setIsMobileMenuOpen(false)}
					className="block py-2"
				>
					Home
				</NavLink>
				<NavLink
					to="/collections"
					onClick={() => setIsMobileMenuOpen(false)}
					className="block py-2"
				>
					Shop
				</NavLink>
				<div className="py-2">
					<h3 className="font-bold">Holidays</h3>
					<NavLink to="/collections/christmas" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Christmas</NavLink>
					<NavLink to="/collections/valentines" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Valentine's Day</NavLink>
					<NavLink to="/collections/easter" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Easter</NavLink>
					<NavLink to="/collections/halloween" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Halloween</NavLink>
				</div>
				<div className="py-2">
					<h3 className="font-bold">All Year</h3>
					<NavLink to="/collections/pick-mix" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Pick & mix</NavLink>
					<NavLink to="/collections/confectionery" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Confectionery</NavLink>
					<NavLink to="/collections/corporate-gifts" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Corporate Gifts</NavLink>
				</div>
				<div className="py-2">
					<h3 className="font-bold">About</h3>
					<NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">About</NavLink>
					<NavLink to="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Blogs</NavLink>
					<NavLink to="/dash" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Dash</NavLink>
					<NavLink to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 pl-4">Collections</NavLink>
				</div>
			</nav>
		</div>
	);
}


function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
	return (
		<Suspense fallback={<CartBadge count={0} />}>
			<Await resolve={cart}>
				{cart => {
					if (!cart) return <CartBadge count={0} />;
					return <CartBadge count={cart.totalQuantity || 0} />;
				}}
			</Await>
		</Suspense>
	);
}

const FALLBACK_HEADER_MENU = {
	id: 'gid://shopify/Menu/199655587896',
	items: [
		{
			id: 'gid://shopify/MenuItem/461609500728',
			resourceId: null,
			tags: [],
			title: 'Catalog',
			type: 'HTTP',
			url: '/collections',
			items: [],
		},
		{
			id: 'gid://shopify/MenuItem/461609533496',
			resourceId: null,
			tags: [],
			title: 'Blog',
			type: 'HTTP',
			url: '/blogs/journal',
			items: [],
		},
		{
			id: 'gid://shopify/MenuItem/461609566264',
			resourceId: null,
			tags: [],
			title: 'Contact',
			type: 'HTTP',
			url: '/contact',
			items: [],
		},
	],
};

function activeLinkStyle({
	isActive,
	isPending,
}: {
	isActive: boolean;
	isPending: boolean;
}) {
	return {
		fontWeight: isActive ? 'bold' : undefined,
		color: isPending ? 'grey' : 'black',
	};
}
