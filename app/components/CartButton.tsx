// app/components/CartButton.tsx

import React from 'react';
import { useAside } from '~/components/Aside';
import { type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface CartButtonProps {
	type: 'cart' | 'search';
	count?: number;
}

export function CartButton({ type, count = 0 }: CartButtonProps) {
	const { open } = useAside();
	const { publish, shop, cart, prevCart } = useAnalytics();

	const handleClick = () => {
		if (type === 'cart') {
			open('cart');
			publish('cart_viewed', {
				cart,
				prevCart,
				shop,
				url: window.location.href || '',
			} as CartViewPayload);
		} else {
			open('search');
		}
	};

	return (
		<button
			onClick={handleClick}
			className="relative rounded-full w-12 h-12 flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:bg-black focus:text-white"
		>
			{type === 'cart' ? (
				<>
					<ShoppingCartIcon className="w-6 h-6" />
					{count > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
							{count}
						</span>
					)}
				</>
			) : (
				<MagnifyingGlassIcon className="w-6 h-6" />
			)}
		</button>
	);
}

export function SearchForm() {
	return (
		<form className="hidden md:flex items-center">
			<input
				type="search"
				placeholder="Search"
				className="rounded-l-full py-2 px-4 border-2 border-r-0 border-black focus:outline-none focus:ring-2 focus:ring-red-500"
			/>
			<button
				type="submit"
				className="rounded-r-full bg-white text-black border-2 border-l-0 border-black hover:bg-black hover:text-white transition-colors py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
			>
				<MagnifyingGlassIcon className="w-5 h-5" />
			</button>
		</form>
	);
}