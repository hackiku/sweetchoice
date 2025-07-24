// app/routes/($locale).cart.tsx

import { Await, type MetaFunction, useRouteLoaderData } from '@remix-run/react';
import { Suspense, useEffect, useState } from 'react';
import type { CartQueryDataReturn } from '@shopify/hydrogen';
import { CartForm } from '@shopify/hydrogen';
import { json, type ActionFunctionArgs } from '@shopify/remix-oxygen';
import { CartMain } from '~/components/Cart';
import type { RootLoader } from '~/root';

import SmartphoneWrapper from '~/components/ui/media/SmartphoneWrapper';
import ContactButton from '~/components/cta/contact/ContactButton';
import ShopButton from '~/components/cta/buy/ShopButton';

import { useContact } from '~/components/cta/contact/ContactContext';
import { useTranslation } from '~/lib/i18n/useTranslation';

export const meta: MetaFunction = () => {
	const { t } = useTranslation();
	return [{ title: t('cartPage.meta.title') }];
};

export async function action({ request, context }: ActionFunctionArgs) {
	const { cart } = context;

	const formData = await request.formData();

	const { action, inputs } = CartForm.getFormInput(formData);

	if (!action) {
		throw new Error('No action provided');
	}

	let status = 200;
	let result: CartQueryDataReturn;

	switch (action) {
		case CartForm.ACTIONS.LinesAdd:
			result = await cart.addLines(inputs.lines);
			break;
		case CartForm.ACTIONS.LinesUpdate:
			result = await cart.updateLines(inputs.lines);
			break;
		case CartForm.ACTIONS.LinesRemove:
			result = await cart.removeLines(inputs.lineIds);
			break;
		case CartForm.ACTIONS.DiscountCodesUpdate: {
			const formDiscountCode = inputs.discountCode;

			// User inputted discount code
			const discountCodes = (
				formDiscountCode ? [formDiscountCode] : []
			) as string[];

			// Combine discount codes already applied on cart
			discountCodes.push(...inputs.discountCodes);

			result = await cart.updateDiscountCodes(discountCodes);
			break;
		}
		case CartForm.ACTIONS.BuyerIdentityUpdate: {
			result = await cart.updateBuyerIdentity({
				...inputs.buyerIdentity,
			});
			break;
		}
		default:
			throw new Error(`${action} cart action is not defined`);
	}

	const cartId = result?.cart?.id;
	const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
	const { cart: cartResult, errors } = result;

	const redirectTo = formData.get('redirectTo') ?? null;
	if (typeof redirectTo === 'string') {
		status = 303;
		headers.set('Location', redirectTo);
	}

	headers.append('Set-Cookie', await context.session.commit());

	return json(
		{
			cart: cartResult,
			errors,
			analytics: {
				cartId,
			},
		},
		{ status, headers },
	);
}

export default function Cart() {
	const rootData = useRouteLoaderData<RootLoader>('root');
	const { t } = useTranslation();
	const { openContact } = useContact();

	if (!rootData) return null;

	// Random palette image 1-12
	const [paletteNumber, setPaletteNumber] = useState(Math.floor(Math.random() * 12) + 1);

	useEffect(() => {
		const interval = setInterval(() => {
			setPaletteNumber(Math.floor(Math.random() * 12) + 1);
		}, 3000); // Change every 3 seconds

		return () => clearInterval(interval);
	}, []);


	return (
		<>
			{/* Background with proper mask like about page */}
			<div className="w-full bg-gradient-to-b from-[#FFE135] to-transparent pt-14 pb-[75vh] absolute top-0 left-0 z-0 border-t-4 border-black"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px), linear-gradient(to bottom, #FFE135, transparent)',
					backgroundSize: '20px 20px, 100% 100%',
					backgroundPosition: '0 0, 0 0',
					maskImage: 'linear-gradient(to bottom, black, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
				}}>
			</div>

			<div className="min-h-[60vh] flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-0 relative z-10">
				<div className="max-w-4xl w-full">
					<div className="flex flex-col lg:flex-row items-center gap-12">

						{/* Content */}
						<div className="flex-1 text-center lg:text-left">
							<span className="inline-block bg-black text-white text-2xl font-bold py-2 px-4 transform -rotate-2 uppercase mb-6"
								style={{
									boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
								}}>
								{t('cartPage.hero.label')}
							</span>

							<h1 className="text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold leading-tight mb-6 uppercase text-orange-400"
								style={{
									WebkitTextStroke: '3px black',
									textStroke: '3px black',
									textShadow: '-0.1em 0.12em 0 #000',
									filter: 'drop-shadow(0 0 1px black)'
								}}>
								{t('cartPage.hero.heading')} <br />
								{t('cartPage.hero.subheading')}
							</h1>

							<p className="text-xl md:text-2xl font-bold leading-tight mb-8 max-w-lg mx-auto lg:mx-0">
								{t('cartPage.hero.description')}
							</p>

							<div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
								<ContactButton
									onClick={openContact}
									text={t('cartPage.hero.ctaText')}
									bgColor="bg-orange-500"
									hoverBgColor="hover:bg-black"
									hoverTextColor="hover:text-white"
									className="text-lg font-bold"
								/>
								
							</div>
						</div>

						{/* Smartphone Asset */}
						<div className="flex-shrink-0 ssmd:mr-36">
							<SmartphoneWrapper
								imageSrc={`/assets/images/palette-${paletteNumber}.jpeg`}
								rotation="rotate-6"
								size="large"
							/>
						</div>
					</div>
				</div>

				{/* Hidden actual cart for edge cases */}
				<div className="hidden">
					<Suspense fallback={<p>Loading cart ...</p>}>
						<Await
							resolve={rootData.cart}
							errorElement={<div>An error occurred</div>}
						>
							{(cart) => {
								return <CartMain layout="page" cart={cart} />;
							}}
						</Await>
					</Suspense>
				</div>
			</div>
		</>
	);
}