// app/routes/($locale).dash.tsx

import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { CreateProductForm } from '~/components/dash/CreateProductForm';

export const meta: MetaFunction = () => {
	return [{ title: `Dashboard | Sweetchoice` }];
};

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<CreateProductForm />
		</div>
	);
}
