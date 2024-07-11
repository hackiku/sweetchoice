// app/routes/($locale).dash.tsx

import { type MetaFunction } from '@remix-run/react';
import AddProduct from '~/components/dash/AddProduct';

export const meta: MetaFunction = () => {
	return [{ title: `Dashboard | Sweetchoice` }];
};

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<AddProduct />
		</div>
	);
}
