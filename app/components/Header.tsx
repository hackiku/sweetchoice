// app/components/Header.tsx

import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Dropdown } from 'flowbite-react';

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
		<header className="flex items-center justify-between py-4 px-8 bg-white shadow-md">
			<NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
				<img className='w-16' src="/assets/logos/sc-logo.svg" alt="Logo" />
			</NavLink>
			<HeaderMenu header={header} viewport="desktop" />
			<HeaderMenuMobileToggle />
			<HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
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
	const className = `flex items-center space-x-4`;

	// Extract "Shop All" and "New Year" links from Shopify menu
	const retailLink = header?.menu?.items?.find((item) => item.title === 'Gifts');
	const newYearLink = header?.menu?.items?.find((item) => item.title === 'New Year');
	const christmasLink = header?.menu?.items?.find((item) => item.title === 'Christmas');

	return (
		<nav className={className} role="navigation">
			{viewport === 'mobile' && (
				<NavLink
					end
					prefetch="intent"
					style={activeLinkStyle}
					to="/"
				>
					Home
				</NavLink>
			)}
			{viewport === 'desktop' && (
				<>
					{retailLink && (
						<NavLink
							className="text-gray-700 hover:text-primary-600"
							end
							prefetch="intent"
							style={activeLinkStyle}
							to={new URL(retailLink.url).pathname}
						>
							Gifts
						</NavLink>
					)}
					<Dropdown label="Holidays" inline>
						<Dropdown.Item href="/collections/christmas">Christmas</Dropdown.Item>
						<Dropdown.Item href="/collections/valentines">Valentine's Day</Dropdown.Item>
						<Dropdown.Item href="/collections/easter">Easter</Dropdown.Item>
						<Dropdown.Item href="/collections/halloween">Halloween</Dropdown.Item>
					</Dropdown>
					<Dropdown label="All Year" inline>
						<Dropdown.Item href="/collections/pick-mix">Pick & mix</Dropdown.Item>
						<Dropdown.Item href="/collections/confectionery">Confectionery</Dropdown.Item>
						<Dropdown.Item href="/collections/corporate-gifts">Corporate Gifts</Dropdown.Item>
					</Dropdown>
					<Dropdown label="More" inline>
						<Dropdown.Item href="/about">About</Dropdown.Item>
						<Dropdown.Item href="/blogs">Blogs</Dropdown.Item>
						<Dropdown.Item href="/dash">Dash</Dropdown.Item>
						<Dropdown.Item href="/collections">Collections</Dropdown.Item>
					</Dropdown>
				</>
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
			<NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
				<Suspense fallback="Sign in">
					<Await resolve={isLoggedIn} errorElement="Sign in">
						{(isLoggedIn) => (isLoggedIn ? <UserIcon className="w-6 h-6 text-gray-700" /> : 'Sign in')}
					</Await>
				</Suspense>
			</NavLink>
			<SearchToggle />
			<CartToggle cart={cart} />
		</nav>
	);
}

function HeaderMenuMobileToggle() {
	const { open } = useAside();
	return (
		<button
			className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
			onClick={() => open('mobile')}
		>
			<h3>☰</h3>
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
			<ShoppingCartIcon className="w-6 h-6 text-gray-700" />
			{count > 0 && (
				<span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
					{count}
				</span>
			)}
		</a>
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
