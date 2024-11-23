// app/components/LocalizedRoutes.tsx

import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from '@remix-run/react';

export function LocalizedRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const locale = searchParams.get('locale');

	useEffect(() => {
		// Only run this effect when the path changes
		const currentUrl = new URL(window.location.href);
		const shouldHaveLocale = !currentUrl.searchParams.has('locale') && locale === 'sr';
		const shouldNotHaveLocale = currentUrl.searchParams.has('locale') && locale !== 'sr';

		if (shouldHaveLocale) {
			currentUrl.searchParams.set('locale', 'sr');
			navigate(currentUrl.pathname + currentUrl.search, { replace: true });
		} else if (shouldNotHaveLocale) {
			currentUrl.searchParams.delete('locale');
			navigate(currentUrl.pathname + currentUrl.search, { replace: true });
		}
	}, [location.pathname, locale, navigate]);

	return null;
}