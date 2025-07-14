import { useNonce, getShopAnalytics, Analytics } from '@shopify/hydrogen';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { redirect } from '@shopify/remix-oxygen';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	useRouteError,
	useLoaderData,
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
import { ContactProvider } from '~/components/cta/contact/ContactContext';
import { MenuProvider } from '~/components/navigation/MenuContext';
import { PageLayout } from '~/components/PageLayout';

import { createCookie } from "@shopify/remix-oxygen";

// Components
import ContactSlideOver from '~/components/cta/contact/ContactSlideOver';

// Styles
import stylesheet from '~/styles/tailwind.css?url';
import favicon from '~/assets/favicon.png';
import appStyles from '~/styles/app.css?url';
import homeStyles from '~/styles/pages/home.css?url';
import logosStyles from '~/styles/ui/logos.css?url';

// Queries and Utils
import { FOOTER_QUERY, HEADER_QUERY } from '~/lib/fragments';
import { createTransformStream } from '~/lib/translations/serverTransform';
import { Footer } from '~/components/navigation/Footer';

export type RootLoader = typeof loader;

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

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'stylesheet', href: appStyles },
	{ rel: 'stylesheet', href: logosStyles },
	{ rel: 'stylesheet', href: homeStyles },
	{ rel: 'preconnect', href: 'https://cdn.shopify.com' },
	{ rel: 'preconnect', href: 'https://shop.app' },
	{ rel: 'icon', type: 'image/svg+xml', href: favicon },
];

function getPreferredLanguage(request: Request): 'sr' | 'en' {
	const cookieHeader = request.headers.get('Cookie');
	const localeCookie = cookieHeader?.match(/locale=([^;]+)/)?.[1];
	if (localeCookie === 'sr' || localeCookie === 'en') {
		return localeCookie;
	}
	const acceptLanguage = request.headers.get('Accept-Language');
	if (acceptLanguage && (acceptLanguage.includes('sr') || acceptLanguage.includes('sr-RS'))) {
		return 'sr';
	}
	return 'sr';
}

export async function loader(args: LoaderFunctionArgs) {
	const { context, request } = args;
	const url = new URL(request.url);

	const urlLocale = url.searchParams.get('locale');
	const detectedLocale = getPreferredLanguage(request);
	const locale = (urlLocale === 'sr' || urlLocale === 'en') ? urlLocale : detectedLocale;

	let headers = new Headers();
	headers.append('Set-Cookie', `locale=${locale}; Path=/; Max-Age=31536000`);

	const { storefront, env, cart, customerAccount } = context;

	const [header, footer] = await Promise.all([
		storefront.query(HEADER_QUERY, {
			cache: storefront.CacheLong(),
			variables: { headerMenuHandle: 'main-menu' },
		}),
		storefront.query(FOOTER_QUERY, {
			cache: storefront.CacheLong(),
			variables: { footerMenuHandle: 'footer' },
		}),
	]);

	return defer(
		{
			locale,
			header,
			footer,
			cart: await cart.get(),
			isLoggedIn: await customerAccount.isLoggedIn(),
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
				...Object.fromEntries(headers),
				'Set-Cookie': await context.session.commit(),
			},
		},
	);
}

function Layout({ children }: { children?: React.ReactNode }) {
	const nonce = useNonce();
	const data = useLoaderData<RootLoader>();
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
				<Analytics.Provider
					cart={data.cart}
					shop={data.shop}
					consent={data.consent}
				>
					<ContactProvider slideOver={ContactSlideOver}>
						<MenuProvider>
							<PageLayout {...data}>{children}</PageLayout>
							<Footer
								footer={data.footer}
								header={data.header}
								publicStoreDomain={data.publicStoreDomain}
							/>
						</MenuProvider>
					</ContactProvider>
				</Analytics.Provider>
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

