// app/routes/($locale).api.contact.tsx

import { json, type ActionFunctionArgs } from '@shopify/remix-oxygen';

// Define the shape of a product from the frontend
interface SelectedProduct {
	id: string;
	title: string;
	handle: string;
}

export async function action({ request, context }: ActionFunctionArgs) {
	const { storefront, env } = context;
	const formData = await request.formData();

	const action = formData.get('_action');
	if (action !== 'SUBMIT_CATALOG') {
		return json({ ok: false, error: 'Invalid action' }, { status: 400 });
	}

	try {
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const message = formData.get('message') as string;
		const productsJSON = formData.get('products') as string;

		if (!email || !name) {
			return json({ ok: false, error: 'Name and email are required.' }, { status: 400 });
		}

		const selectedProducts: SelectedProduct[] = productsJSON ? JSON.parse(productsJSON) : [];

		// --- GOAL #1: Create customer with marketing consent ---
		const customerResponse = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
			variables: {
				input: {
					email: email,
					firstName: name,
					acceptsMarketing: true,
				},
			},
		});

		console.log('Customer creation response:', customerResponse);

		// --- GOAL #2: Send contact form submission ---
		const productsList = selectedProducts.length > 0
			? selectedProducts
				.map(p => `- ${p.title} (https://${env.PUBLIC_STORE_DOMAIN}/products/${p.handle})`)
				.join('\n')
			: 'No specific products were selected. The customer is requesting the general catalog.';

		const contactMessage = `
B2B Catalog Request from: ${name}
Email: ${email}
${message ? `\nMessage:\n${message}\n` : ''}
---
Selected Products:
${productsList}
---
		`;

		// Submit contact form - this logs in Shopify admin
		const contactResponse = await storefront.mutate(CUSTOMER_CONTACT_MUTATION, {
			variables: {
				input: {
					email: email,
					message: contactMessage,
				},
			},
		});

		console.log('Contact form response:', contactResponse);

		// Check for errors in both operations
		const customerErrors = customerResponse.customerCreate?.customerUserErrors || [];
		const contactErrors = contactResponse.customerContact?.userErrors || [];

		// Log any errors but don't fail the request unless critical
		if (customerErrors.length > 0) {
			console.log('Customer creation had errors (might be existing customer):', customerErrors);
		}

		if (contactErrors.length > 0) {
			console.error('Contact form had errors:', contactErrors);
			return json({
				ok: false,
				error: `Contact form failed: ${contactErrors[0].message}`
			}, { status: 500 });
		}

		return json({
			ok: true,
			success: true,
			message: 'Catalog request sent! Our team will contact you soon.'
		});

	} catch (error) {
		console.error('Contact API Error:', error);
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
		return json({
			ok: false,
			error: `Failed to process request: ${errorMessage}`
		}, { status: 500 });
	}
}

// Create customer with marketing consent
const CUSTOMER_CREATE_MUTATION = `#graphql
	mutation customerCreate($input: CustomerCreateInput!) {
		customerCreate(input: $input) {
			customer {
				id
				email
				firstName
				acceptsMarketing
			}
			customerUserErrors {
				field
				message
			}
		}
	}
`;

// Submit contact form - logs in Shopify admin
const CUSTOMER_CONTACT_MUTATION = `#graphql
	mutation customerContact($input: CustomerContactInput!) {
		customerContact(input: $input) {
			userErrors {
				field
				message
			}
		}
	}
`;