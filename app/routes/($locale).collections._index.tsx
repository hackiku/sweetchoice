// app/routes/($locale).collections._index.tsx

import { redirect } from '@shopify/remix-oxygen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export async function loader({ context }: LoaderFunctionArgs) {
	return redirect('/collections/all');
}

export default function Index() {
	return null;
}