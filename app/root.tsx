// root.tsx

import {useNonce, getShopAnalytics, Analytics} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
  useRouteLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
} from '@remix-run/react';
// tailwind
import type {LinksFunction} from '@remix-run/node';

import {ThemeModeScript} from 'flowbite-react';
import stylesheet from '~/styles/tailwind.css?url';

import favicon from '~/assets/favicon.png';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import businessSelectorStyles from '~/styles/business-selector.css?url';
// import collectionsStyles from '~/styles/collections.css?url';
// pages
import homeStyles from '~/styles/pages/home.css?url';
// import pagesStyles from '~/styles/pages.css?url';
import aboutStyles from '~/styles/pages/about.css?url';
import holidaysStyles from '~/styles/pages/holidays.css?url';
import holidayPageStyles from '~/styles/pages/holiday.css?url';
import contactStyles from '~/styles/pages/contact.css?url';
// ui
import logosStyles from '~/styles/ui/logos.css?url';
import buttonStyles from '~/styles/ui/button.css?url';
import blurbsStyles from '~/styles/ui/blurbs.css?url';
import sectionIntroStyles from '~/styles/ui/section-intro.css?url';
import galleryStyles from '~/styles/ui/gallery.css?url';
import breadcrumbsStyles from '~/styles/ui/breadcrumbs.css?url';

import {PageLayout} from '~/components/PageLayout';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export function links() {
  return [
    {rel: 'stylesheet', href: stylesheet},
    {rel: 'stylesheet', href: resetStyles},
    {rel: 'stylesheet', href: appStyles},
    // ui
    {rel: 'stylesheet', href: buttonStyles},
    {rel: 'stylesheet', href: logosStyles},
    {rel: 'stylesheet', href: blurbsStyles},
    {rel: 'stylesheet', href: businessSelectorStyles},
    {rel: 'stylesheet', href: sectionIntroStyles},
    {rel: 'stylesheet', href: galleryStyles},
    {rel: 'stylesheet', href: breadcrumbsStyles},
    // pages
    {rel: 'stylesheet', href: homeStyles},
    {rel: 'stylesheet', href: holidayPageStyles},
    // { rel: 'stylesheet', href: pagesStyles },
    {rel: 'stylesheet', href: aboutStyles},
    {rel: 'stylesheet', href: holidaysStyles},
    {rel: 'stylesheet', href: contactStyles},

    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return defer(
    {
      ...deferredData,
      ...criticalData,
      publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
      shop: getShopAnalytics({
        storefront,
        publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
      }),
      consent: {
        checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      },
    },
    {
      headers: {
        'Set-Cookie': await args.context.session.commit(),
      },
    },
  );
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    header,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {storefront, customerAccount, cart} = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ThemeModeScript />
      </head>
      <body>
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout {...data}>{children}</PageLayout>
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Layout>
      <div className="route-error">
        <h1>Oops</h1>
        <h2>{errorStatus}</h2>
        {errorMessage && (
          <fieldset>
            <pre>{errorMessage}</pre>
          </fieldset>
        )}
      </div>
    </Layout>
  );
}
