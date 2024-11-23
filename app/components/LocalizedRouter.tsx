// app/components/LocalizedRouter.tsx

import React from 'react';
import {
	Router,
	createBrowserRouter,
	ScrollRestoration,
	useLocation,
	useNavigate,
	useSearchParams
} from '@remix-run/react';
import type { RemixBrowser } from '@remix-run/react';

function LocalizedRouterComponent() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const locale = searchParams.get('locale');

	React.useEffect(() => {
		// Only run this effect when the path changes
		const currentUrl = new URL(window.location.href);
		const shouldHaveLocale = !currentUrl.searchParams.has('locale') && locale === 'sr';
		const shouldNotHaveLocale = currentUrl.searchParams.has('locale') && locale !== 'sr';

		if (shouldHaveLocale) {
			currentUrl.searchParams.set('locale', 'sr');
			navigate(currentUrl.pathname + currentUrl.search);
		} else if (shouldNotHaveLocale) {
			currentUrl.searchParams.delete('locale');
			navigate(currentUrl.pathname + currentUrl.search);
		}
	}, [location.pathname, locale, navigate]);

	return null;
}

export function LocalizedRouter({ children }: { children: React.ReactNode }) {
	return (
		<>
			<LocalizedRouterComponent />
			{children}
		</>
	);
}