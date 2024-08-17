// app/routes/($locale).dash.tsx

import { type MetaFunction } from '@remix-run/react';
import AddProduct from '~/components/dash/AddProduct';

const preProcessedData = {
	title: 'Deda Mraz 40g',
	productType: 'Figura',
	vendor: 'Sweet Choice',
	bodyHtml: '<strong>Delicious milk chocolate Santa Claus figure</strong>',
	tags: ['Holiday', 'Chocolate', 'Sweet Choice'].join(','),
	published: true,
	price: '4.50',
	sku: 'R0757-130',
	barcode: '8606012121058',
	inventoryPolicy: 'DENY',
	fulfillmentService: 'manual',
	inventoryManagement: 'SHOPIFY',
	inventoryQuantity: 130,
	weight: 0.04,
	weightUnit: 'KILOGRAMS',
	imageURL: 'https://www.shutterstock.com/image-photo/drunk-santa-claus-hat-festive-600nw-2347402165.jpg',
};

export const meta: MetaFunction = () => {
	return [{ title: `Dashboard | Sweetchoice` }];
};

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<AddProduct initialData={preProcessedData} />
		</div>
	);
}
