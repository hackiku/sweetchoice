// app/components/dash/AddProduct.tsx

import { useState } from 'react';
import { useFetcher } from '@remix-run/react';

const AddProduct = ({ initialData }) => {
	const fetcher = useFetcher();
	const [productData, setProductData] = useState(initialData);

	const formFields = [
		{ name: 'title', label: 'Title', type: 'text' },
		{ name: 'productType', label: 'Product Type', type: 'text' },
		{ name: 'vendor', label: 'Vendor', type: 'text' },
		{ name: 'bodyHtml', label: 'Body HTML', type: 'text' },
		{ name: 'tags', label: 'Tags (comma separated)', type: 'text' },
		{ name: 'published', label: 'Published', type: 'checkbox' },
		{ name: 'price', label: 'Price', type: 'text' },
		{ name: 'sku', label: 'SKU', type: 'text' },
		{ name: 'barcode', label: 'Barcode', type: 'text' },
		{ name: 'inventoryPolicy', label: 'Inventory Policy', type: 'text' },
		{ name: 'fulfillmentService', label: 'Fulfillment Service', type: 'text' },
		{ name: 'inventoryManagement', label: 'Inventory Management', type: 'text' },
		{ name: 'inventoryQuantity', label: 'Inventory Quantity', type: 'text' },
		{ name: 'weight', label: 'Weight', type: 'text' },
		{ name: 'weightUnit', label: 'Weight Unit', type: 'text' },
		{ name: 'imageURL', label: 'Image URL', type: 'text' },
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setProductData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		fetcher.submit(
			productData,
			{ method: 'post', action: '/api/add-product' }
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			{formFields.map(({ name, label, type }) => (
				<div key={name}>
					<label>{label}</label>
					<input
						name={name}
						type={type}
						value={type === 'checkbox' ? undefined : productData[name]}
						checked={type === 'checkbox' ? productData[name] : undefined}
						onChange={handleChange}
						required
					/>
				</div>
			))}
			<button type="submit" disabled={fetcher.state === 'submitting'}>Create Product</button>
			{fetcher.data?.error && <p>Error: {fetcher.data.error}</p>}
			{fetcher.data?.product && <p>Product created successfully: {fetcher.data.product.title}</p>}
		</form>
	);
};

export default AddProduct;
