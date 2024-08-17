// AddToCart.tsx

import React from 'react';
import { CartForm, type OptimisticCartLine, type CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import type { FetcherWithComponents } from '@remix-run/react';

interface AddToCartProps {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLine>;
  onClick?: () => void;
  route?: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ analytics, children, disabled, buttonBgColor, lines, onClick, route = '/cart' }) => {
  const { publish, cart, prevCart, shop } = useAnalytics();

  return (
    <CartForm route={route} inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
          <button
            type="submit"
            style={{
              backgroundColor: buttonBgColor,
            }}
            className={`w-full border-2 border-black py-2 px-4 font-bold 
              hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
              transition-all`}
            onClick={() => {
              if (onClick) onClick();
              publish('cart_viewed', {
                cart,
                prevCart,
                shop,
                url: window.location.href || '',
              } as CartViewPayload);
            }}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
};

export default AddToCart;
