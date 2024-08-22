// Footer.tsx
//
// This component represents the footer of the Sweetchoice e-commerce website.
// It includes a CTA with ContactButton, four columns of content (logo, holidays, shop, newsletter),
// and follows the neo-brutalist style to match the brand aesthetic.
//
// The layout is adjusted to make the logo column narrower and the newsletter column wider.
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
import EmailOptin from '~/components/contact/EmailOptin';

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
	const [isModalOpen, setIsModalOpen] = useState(false);

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
		<footer className="w-full mt-12 bg-[#fff8ee] pt-14 pb-10 px-6 md:px-12 border-t-4 border-black"
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
							text="Business Inquiries →"
							bgColor="#ff0000"
							hoverBgColor="#AE7AFF"
							textColor="white"
							hoverTextColor="black"
							className="text-xl"
						/>
					</div>
				</div>

				<div className="grid grid-cols-8 gap-10 mb-12">
					<div className="col-span-1 flex flex-col items-center md:items-start">
						<img src="/assets/logos/sc-logo.svg" alt="Sweetchoice Logo" className="w-16 md:w-20 mb-4" />
					</div>

					<div className="col-span-2 space-y-4">
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

					<div className="col-span-2 space-y-4">
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

					<div className="col-span-3">
						<EmailOptin />
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center border-t-4 border-black pt-6">
					<div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-0">
						<span className="text-lg font-semibold text-black">© Sweetchoice 2024.</span>
						<NavLink to="/policies/terms-of-service" className="text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors">
							Terms
						</NavLink>
						<span className="text-black">|</span>
						<NavLink to="/policies/privacy" className="text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors">
							Privacy
						</NavLink>
					</div>
					<ul className="flex items-center space-x-6">
						{['LinkedIn', 'Instagram'].map((social) => (
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