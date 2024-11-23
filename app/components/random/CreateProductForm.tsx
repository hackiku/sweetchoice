// app/components/CreateProductForm.tsx

import { useState } from 'react';
import { useFetcher } from '@remix-run/react';
// import { PRODUCT_CREATE_MUTATION } from '~/graphql/ProductCreateMutation';
import { PRODUCT_CREATE_MUTATION, UPDATE_PRODUCT_VARIANT_MUTATION, ADD_PRODUCT_TAGS_MUTATION } from '~/graphql/AddProduct';


const CreateProductForm = () => {
	const fetcher = useFetcher();
	const [title, setTitle] = useState('');
	const [imageURL, setImageURL] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		fetcher.submit(
			{
				query: PRODUCT_CREATE_MUTATION,
				variables: JSON.stringify({
					input: {
						title,
						productType: 'Figura',
						vendor: 'Sweet Choice',
						bodyHtml: '<strong>Delicious milk chocolate Santa Claus figure</strong>',
						tags: ['Holiday', 'Chocolate', 'Sweet Choice'],
						published: true,
					},
					media: [
						{
							originalSource: imageURL,
							alt: 'Drunk Santa Claus Hat Festive',
							mediaContentType: 'IMAGE',
						},
					],
				}),
			},
			{ method: 'post', action: '/graphql' }
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Title</label>
				<input value={title} onChange={(e) => setTitle(e.target.value)} required />
			</div>
			<div>
				<label>Image URL</label>
				<input value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
			</div>
			<button type="submit" disabled={fetcher.state === 'submitting'}>Create Product</button>
			{fetcher.data?.errors && <p>Error: {fetcher.data.errors[0].message}</p>}
			{fetcher.data?.data?.productCreate?.product && <p>Product created successfully: {fetcher.data.data.productCreate.product.title}</p>}
		</form>
	);
};

export default CreateProductForm;
