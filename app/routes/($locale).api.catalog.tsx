// app/routes/($locale).api.catalog.tsx

import { json, type ActionFunctionArgs } from '@shopify/remix-oxygen';

interface CatalogProduct {
	id: string;
	title: string;
	handle: string;
	featuredImage?: {
		url: string;
		altText?: string;
	};
}

interface CatalogSession {
	selectedProducts: CatalogProduct[];
	lastUpdated: string;
	locale: string;
}

export async function action({ request, context }: ActionFunctionArgs) {
	const { session, storefront } = context;
	const formData = await request.formData();
	const action = formData.get('_action');

	// Get existing catalog from session
	let catalog: CatalogSession = await session.get('catalog') || {
		selectedProducts: [],
		lastUpdated: new Date().toISOString(),
		locale: 'en' // Default locale
	};

	try {
		switch (action) {
			case 'addProduct': {
				const product = JSON.parse(formData.get('product') as string);
				catalog.selectedProducts = [
					...catalog.selectedProducts.filter(p => p.id !== product.id),
					product
				];
				break;
			}

			case 'removeProduct': {
				const productId = formData.get('productId') as string;
				catalog.selectedProducts = catalog.selectedProducts.filter(
					p => p.id !== productId
				);
				break;
			}

			case 'submitCatalog': {
				const email = formData.get('email') as string;
				const name = formData.get('name') as string;

				// Optional: Add customer to Shopify
				const customer = await storefront.mutate(
					/* Your Shopify customer creation mutation */
				);

				// Clear catalog after submission
				catalog.selectedProducts = [];

				// You could trigger Shopify email here

				break;
			}

			case 'clearCatalog': {
				catalog.selectedProducts = [];
				break;
			}

			default:
				throw new Error('Unknown action');
		}

		// Update session
		catalog.lastUpdated = new Date().toISOString();
		await session.set('catalog', catalog);

		return json({
			ok: true,
			catalog,
			message: 'Catalog updated successfully'
		});

	} catch (error) {
		console.error('Catalog action error:', error);
		return json({
			ok: false,
			error: 'Failed to update catalog',
			details: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 400 });
	}
}

// Optional loader if you want to fetch catalog state
export async function loader({ context }: ActionFunctionArgs) {
	const catalog = await context.session.get('catalog');
	return json({ catalog });
}