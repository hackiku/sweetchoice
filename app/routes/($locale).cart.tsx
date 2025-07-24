// app/routes/($locale).cart.tsx

import {Await, type MetaFunction, useRouteLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/Cart';
import type {RootLoader} from '~/root';

// tests
import SmartphoneWrapper from '~/components/ui/media/SmartphoneWrapper';
import PolaroidPicture from '~/components/ui/media/PolaroidPicture';
import ImageStripedCutout from '~/components/ui/media/ImageStripedCutout';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Cart`}];
};

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

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
  const {cart: cartResult, errors} = result;

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
    {status, headers},
  );
}

export default function Cart() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

	// const picNumber = 4; // polaroid
	const picNumber = 11;
	// const picNumber = Math.floor(Math.random() * 13) + 1; // 1-13


  return (
    <div className="cart">
			
			<div className="flex gap-12 px-20 border-2 border-black py-12">
				<ImageStripedCutout />
			</div>
			
			
			<div className="flex gap-12 px-20 border-2 border-black py-12">

				<div className="w-1/7">
					<PolaroidPicture
						imageSrc={`/assets/images/palette-${picNumber}.jpeg`}
						caption="Sweet Choice 2024"
						rotation="-rotate-12"
						size="medium"
					/>
				</div>
				
				<div className="w-1/7">
					<PolaroidPicture
						imageSrc="/assets/images/palette-14.png"
						caption="Sweets 2025"
						rotation="-rotate-12"
						size="medium"
					/>
				</div>
				
				<div className="w-1/3">
					<SmartphoneWrapper
						imageSrc="/assets/images/palette-11.jpeg"
						// imageSrc="/assets/images/palette-5.jpeg"
						rotation="rotate-6"
						size="medium"
					/>
				</div>
				
				<div className="__w-1/3">
					<SmartphoneWrapper
						imageSrc="/assets/images/palette-5.jpeg"
						rotation="rotate-6"
						size="medium"
					/>
				</div>
				
			</div>


			<div className='text-lg font-bold border-t-4 border-black p-2'>
				<h1>Cart</h1>
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
  );
}
