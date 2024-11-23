// app/components/Footer.tsx


import React from 'react';
import { Suspense } from 'react';
import { Await, NavLink, useNavigate, useSearchParams } from '@remix-run/react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import BrutalButton from '~/components/ui/BrutalButton';
import { useContact } from '~/components/contact/ContactContext';
import EmailOptin from '~/components/contact/EmailOptin';

import { useTranslation } from '~/lib/i18n/useTranslation';
import LanguageSelector from '~/components/ui/LanguageSelector';

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
				{(footer) => (
					<FooterContent
						footer={footer}
						publicStoreDomain={publicStoreDomain}
					/>
				)}
			</Await>
		</Suspense>
	);
}

function FooterContent({
	footer,
	publicStoreDomain,
}: {
	footer: FooterQuery | null;
	publicStoreDomain: string;
}) {
	const { t } = useTranslation();
	const { isOpen, openContact, closeContact } = useContact();

	const handleClick = () => {
		if (isOpen) {
			closeContact();
		} else {
			openContact();
		}
	};

	const holidays = [
		{ name: 'christmas', path: '/collections/christmas' },
		{ name: 'valentinesDay', path: '/collections/valentines' },
		{ name: 'easter', path: '/collections/easter' },
		{ name: 'halloween', path: '/collections/halloween' }
	];

	const shopItems = [
		{ name: t('footer.navigation.shop.items.gifts'), path: '/gifts' },
		{ name: t('footer.navigation.shop.items.allYear'), path: '/collections/all' },
		{ name: t('footer.navigation.shop.items.about'), path: '/about' },
	];


	return (
		<footer
			className="w-full mt-12 bg-[#fff8ee] pt-14 pb-10 px-6 md:px-12 border-t-4 border-black"
			style={{
				backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
				backgroundSize: '20px 20px',
			}}
		>
			<div className="container mx-auto max-w-7xl">
				<div className="mb-10 bg-[#FFA500] p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
				
					<div className="flex flex-col justify-between items-start md:items-center md:flex-row gap-6">
						<h2 className="text-4xl md:text-5xl font-semibold">
							{t('footer.cta.title')}
						</h2>
						<BrutalButton
							onClick={handleClick}
							text={t('footer.cta.button')}
							emoji="👋"
							isOpen={isOpen}
							className="text-xl"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
					<div className="col-span-2 md:col-span-1 flex md:flex-col justify-between md:justify-start md:max-w-1/5 gap-4">
					{/* <div className="flex flex-col justify-center md:justify-start"> */}
						<img src="/assets/logos/sc-logo.svg" alt="Sweetchoice Logo" className="w-20 md:w-20" />
						<LanguageSelector variant="footer" className="mb-4 max-h-12 w-32" />
					</div>

					<div className="col-span-1 md:col-span-1 space-y-4">
						<h4 className="text-2xl font-black text-black uppercase">
							{t('footer.navigation.holidays.title')}
						</h4>
						<nav className="space-y-2">
							{holidays.map((item) => (
								<NavLink
									key={item.name}
									to={item.path}
									className="block text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors"
								>
									{t(`footer.navigation.holidays.items.${item.name}`)}
								</NavLink>
							))}
						</nav>
					</div>

					<div className="col-span-1 md:col-span-1 space-y-4">
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

					<div className="col-span-2 md:col-span-2">
						<EmailOptin />
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-start border-t-4 border-black pt-6">
					<div className="flex-col items-start">
						<div className="flex flex-wrap justify-start md:justify-start gap-3 mb-2 md:mb-0">
							<span className="text-lg font-semibold">
								{t('footer.legal.copyright')}
							</span>
							<span className="text-black">|</span>
							<NavLink
								to="/policies/terms-of-service"
								className="text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors"
							>
								{t('footer.legal.terms')}
							</NavLink>
							<span className="text-black">|</span>
							<NavLink
								to="/policies/privacy"
								className="text-lg font-semibold text-black hover:text-[#ED1C24] hover:underline transition-colors"
							>
								{t('footer.legal.privacy')}
							</NavLink>
						</div>

						<a href="https://jzro.co/"
							target="_blank"
							rel="noopener noreferrer"
							className="ml-5 -pt-5 text-sm font-regular hover:text-[#ED1C24] transition-colors"
						>
							dev by <span className="font-semibold">🚁 jzro</span> 4A.
						</a>
					</div>

					<ul className="flex items-center space-x-6">
						<li className="text-xl font-bold text-black hover:text-[#ED1C24] transition-colors
   					absolute pb-6 right-12 md:relative md:right-0 md:top-0"
						>
							<a href="https://www.linkedin.com/company/sweet-choice/" target="_blank" rel="noopener noreferrer">
								LinkedIn
							</a>
						</li>
					</ul>
				</div>
			</div>
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