// Footer.tsx
//
// This component represents the footer of the Sweetchoice e-commerce website.
// It includes a CTA with ContactButton, four columns of content (logo, holidays, shop, newsletter),
// and follows the neo-brutalist style to match the brand aesthetic.
//
// Props:
// - footer: Promise<FooterQuery | null> - Data for the footer content
// - header: HeaderQuery - Header data (unused in this component, consider removing)
// - publicStoreDomain: string - The public domain of the store

import React, { useState } from 'react';
import { Suspense } from 'react';
import { Await, NavLink } from '@remix-run/react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

interface FooterProps {
	footer: Promise<FooterQuery | null>;
	header: HeaderQuery;
	publicStoreDomain: string;
}

export function Footer({
	footer: footerPromise,
	header,
	publicStoreDomain,
}: FooterProps) {
	return (
		<Suspense fallback={<FooterSkeleton />}>
			<Await resolve={footerPromise}>
				{(footer) => <FooterContent footer={footer} publicStoreDomain={publicStoreDomain} />}
			</Await>
		</Suspense>
	);
}

function FooterContent({ footer, publicStoreDomain }: { footer: FooterQuery | null, publicStoreDomain: string }) {
	const [email, setEmail] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement newsletter signup logic
		console.log('Newsletter signup:', email);
		setEmail('');
	};

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	const holidays = [
		{ name: 'Christmas', path: '/collections/christmas' },
		{ name: "Valentine's Day", path: '/collections/valentines' },
		{ name: 'Easter', path: '/collections/easter' },
		{ name: 'Halloween', path: '/collections/halloween' },
	];

	const shopItems = [
		{ name: 'Gifts', path: '/gifts' },
		{ name: 'All Year', path: '/collections/all' },
		{ name: 'About', path: '/about' },
	];

	return (
		<footer className="w-full bg-[#fff8ee] pt-14 pb-10 px-6 md:px-12 border-t-4 border-black"
			style={{
				backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
				backgroundSize: '20px 20px'
			}}>
			<div className="container mx-auto max-w-7xl">
				<div className="mb-10 bg-[#FFA500] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
					<h2 className="text-4xl font-black mb-6 text-center">SWEETEN UP YOUR SHELVES</h2>
					<div className="flex justify-center">
						<ContactButton
							onClick={handleContactClick}
							text="Talk Biz →"
							bgColor="#ff0000"
							hoverBgColor="#AE7AFF"
							textColor="white"
							hoverTextColor="black"
							className="text-xl"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
					<div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
						<img src="/assets/logos/sc-logo.svg" alt="Sweetchoice Logo" className="w-16 md:w-20 mb-4" />
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl font-black text-black uppercase">Holidays</h4>
						<nav className="space-y-2">
							{holidays.map((item) => (
								<NavLink
									key={item.name}
									to={item.path}
									className="block text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors"
								>
									{item.name}
								</NavLink>
							))}
						</nav>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl font-black text-black uppercase">Shop</h4>
						<nav className="space-y-2">
							{shopItems.map((item) => (
								<NavLink
									key={item.name}
									to={item.path}
									className="block text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors"
								>
									{item.name}
								</NavLink>
							))}
						</nav>
					</div>

					<div className="col-span-2 md:col-span-1 space-y-4">
						<h4 className="text-2xl font-black text-black uppercase">Newsletter</h4>
						<form onSubmit={handleSubmit} className="space-y-4">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="w-full px-4 py-2 text-lg border-4 border-black bg-transparent text-black placeholder-black focus:outline-none focus:ring-4 focus:ring-[#ED1C24]"
								required
							/>
							<button
								type="submit"
								className="w-full md:w-auto text-xl font-black px-8 py-2 border-4 border-black 
                           bg-[#ED1C24] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] 
                           transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)]
                           active:shadow-[2px_2px_0px_0px_rgba(0,0,0)] active:translate-x-[2px] active:translate-y-[2px]"
							>
								SUBSCRIBE
							</button>
						</form>
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center border-t-4 border-black pt-6">
					<div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-0">
						<span className="text-lg font-semibold text-black">© Sweetchoice 2024.</span>
						<NavLink to="/terms" className="text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors">
							Terms
						</NavLink>
						<span className="text-black">|</span>
						<NavLink to="/privacy" className="text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors">
							Privacy
						</NavLink>
					</div>
					<ul className="flex items-center space-x-6">
						{['LinkedIn', 'Infostud', 'Instagram'].map((social) => (
							<li key={social} className="text-lg font-black text-black hover:text-[#ED1C24] transition-colors">
								<a href={`https://${social.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer">
									{social.toUpperCase()}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</footer>
	);
}

function FooterSkeleton() {
	return (
		<footer className="w-full bg-[#fff8ee] pt-14 pb-10 px-6 md:px-12 border-t-4 border-black animate-pulse">
			{/* Skeleton content */}
		</footer>
	);
}