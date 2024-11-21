// root.tsx

import { useNonce, getShopAnalytics, Analytics } from '@shopify/hydrogen';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
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
	RemixServer,
} from '@remix-run/react';
import type { EntryContext } from '@remix-run/server-runtime';
import { renderToReadableStream } from 'react-dom/server';
import type { LinksFunction } from '@remix-run/node';
import { ThemeModeScript } from 'flowbite-react';

// Contexts and Providers
import { ContactProvider } from '~/components/contact/ContactContext';
import { PageLayout } from '~/components/PageLayout';

// Components
import ContactSlideOver from '~/components/contact/ContactSlideOver';

// Styles
import stylesheet from '~/styles/tailwind.css?url';
import favicon from '~/assets/favicon.png';
// import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
// import businessSelectorStyles from '~/styles/business-selector.css?url';
import homeStyles from '~/styles/pages/home.css?url';
import logosStyles from '~/styles/ui/logos.css?url';

// Queries and Utils
import { FOOTER_QUERY, HEADER_QUERY } from '~/lib/fragments';
import { createTransformStream } from '~/lib/translations/serverTransform';

export type RootLoader = typeof loader;

// Prevent unnecessary revalidation
export const shouldRevalidate: ShouldRevalidateFunction = ({
	formMethod,
	currentUrl,
	nextUrl,
}) => {
	if (formMethod && formMethod !== 'GET') {
		return true;
	}
	if (currentUrl.toString() === nextUrl.toString()) {
		return true;
	}
	return false;
};

// Define links for styles
export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	// { rel: 'stylesheet', href: resetStyles },
	{ rel: 'stylesheet', href: appStyles },
	{ rel: 'stylesheet', href: logosStyles },
	{ rel: 'stylesheet', href: homeStyles },
	{ rel: 'preconnect', href: 'https://cdn.shopify.com' },
	{ rel: 'preconnect', href: 'https://shop.app' },
	{ rel: 'icon', type: 'image/svg+xml', href: favicon },
];

// Loader function
export async function loader(args: LoaderFunctionArgs) {
	const url = new URL(args.request.url);
	const locale = url.searchParams.get('locale') || 'sr';

	const deferredData = loadDeferredData(args);
	const criticalData = await loadCriticalData(args);

	const { storefront, env } = args.context;

	return defer(
		{
			...deferredData,
			...criticalData,
			locale,
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

// Load critical data
async function loadCriticalData({ context }: LoaderFunctionArgs) {
	const { storefront } = context;

	const [header] = await Promise.all([
		storefront.query(HEADER_QUERY, {
			cache: storefront.CacheLong(),
			variables: {
				headerMenuHandle: 'main-menu',
			},
		}),
	]);

	return {
		header,
	};
}

// Load deferred data
async function loadDeferredData({ context }: LoaderFunctionArgs) {
	const { storefront, customerAccount, cart } = context;

	const footer = await storefront
		.query(FOOTER_QUERY, {
			cache: storefront.CacheLong(),
			variables: {
				footerMenuHandle: 'footer',
			},
		})
		.catch((error) => {
			console.error('Footer query error:', error);
			return null;
		});

	return {
		cart: await cart.get(),
		isLoggedIn: customerAccount.isLoggedIn(),
		footer,
	};
}

// Layout component
function Layout({ children }: { children?: React.ReactNode }) {
	const nonce = useNonce();
	const data = useRouteLoaderData<RootLoader>('root');
	const locale = data?.locale || 'sr';

	return (
		<html lang={locale}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeModeScript />
				{data ? (
					<Analytics.Provider
						cart={data.cart}
						shop={data.shop}
						consent={data.consent}
					>
						<ContactProvider slideOver={ContactSlideOver}>
							<PageLayout {...data}>{children}</PageLayout>
						</ContactProvider>
					</Analytics.Provider>
				) : (
					<ContactProvider slideOver={ContactSlideOver}>
						{children}
					</ContactProvider>
				)}
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	);
}

// Main App component
export default function App() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

// Error Boundary
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

// Document handler for server-side rendering
export async function handleDocument(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	const url = new URL(request.url);
	const locale = url.searchParams.get('locale') || 'sr';

	const transformer = createTransformStream(locale);

	const body = await renderToReadableStream(
		<RemixServer context={remixContext} url={request.url} />,
		{
			signal: request.signal,
			onError(error: unknown) {
				console.error(error);
				responseStatusCode = 500;
			},
		}
	);

	responseHeaders.set('Content-Type', 'text/html');

	return new Response(body.pipeThrough(transformer), {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}