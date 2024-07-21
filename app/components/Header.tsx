// app/components/Header.tsx

import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import { type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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
		<header className="header">
			<NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
				<img className='nav-logo' src="/assets/logos/sc-logo.svg" alt="" />
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
	const className = `header-menu-${viewport}`;

	function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
		if (viewport === 'mobile') {
			event.preventDefault();
			window.location.href = event.currentTarget.href;
		}
	}

	// Extract "Shop All" and "New Year" links from Shopify menu
	const shopAllLink = header?.menu?.items?.find((item) => item.title === 'Shop All');
	const newYearLink = header?.menu?.items?.find((item) => item.title === 'New Year');
	const christmasLink = header?.menu?.items?.find((item) => item.title === 'Christmas');

	return (
		<nav className={className} role="navigation">
			{viewport === 'mobile' && (
				<NavLink
					end
					onClick={closeAside}
					prefetch="intent"
					style={activeLinkStyle}
					to="/"
				>
					Home
				</NavLink>
			)}
			{viewport === 'desktop' && (
				<>
					<div>|</div>
					{shopAllLink && (
						<NavLink
							className="header-menu-item"
							end
							onClick={closeAside}
							prefetch="intent"
							style={activeLinkStyle}
							to={new URL(shopAllLink.url).pathname}
						>
							Gifts
						</NavLink>
					)}
					<div className="dropdown-container">
						<span className="dropdown-trigger">
							Seasons <ChevronDownIcon className="icon-small" />
						</span>
						<div className="dropdown">
							<NavLink className="dropdown-item" to="/collections/christmas">
								Christmas
							</NavLink>
							<NavLink className="dropdown-item" to="/collections/easter">
								Easter
							</NavLink>
							{newYearLink && (
								<NavLink
									className="dropdown-item"
									to={new URL(newYearLink.url).pathname}
								>
									New Year
								</NavLink>
							)}
							<NavLink className="dropdown-item" to="/collections/valentines">
								Valentine's Day
							</NavLink>
						</div>
					</div>
					<div className="dropdown-container">
						<span className="dropdown-trigger">
							More <ChevronDownIcon className="icon-small" />
						</span>
						<div className="dropdown">
							<NavLink className="dropdown-item" to="/blogs">
								Blogs
							</NavLink>
							<NavLink className="dropdown-item" to="/dash">
								Dash
							</NavLink>
							<NavLink className="dropdown-item" to="/policies">
								Policies
							</NavLink>
							<NavLink className="dropdown-item" to="/collections">
								Collections
							</NavLink>
							<NavLink className="dropdown-item" to="/gifts">
								Gifts
							</NavLink>
						</div>
					</div>
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
		<nav className="header-ctas" role="navigation">
			<NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
				<Suspense fallback="Sign in">
					<Await resolve={isLoggedIn} errorElement="Sign in">
						{(isLoggedIn) => (isLoggedIn ? <UserIcon className="icon" /> : 'Sign in')}
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
			className="header-menu-mobile-toggle reset"
			onClick={() => open('mobile')}
		>
			<h3>☰</h3>
		</button>
	);
}

function SearchToggle() {
	const { open } = useAside();
	return (
		<button className="reset" onClick={() => open('search')}>
			<MagnifyingGlassIcon className="icon" />
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
		>
			<ShoppingCartIcon className="icon" /> {count}
		</a>
	);
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
	return (
		<Suspense fallback={<CartBadge count={0} />}>
			<Await resolve={cart}>
				{(cart) => {
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
