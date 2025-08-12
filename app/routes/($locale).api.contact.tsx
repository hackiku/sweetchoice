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

		console.log('📦 RAW PRODUCTS JSON:', productsJSON);

		if (!email || !name) {
			return json({ ok: false, error: 'Name and email are required.' }, { status: 400 });
		}

		const selectedProducts: SelectedProduct[] = productsJSON ? JSON.parse(productsJSON) : [];
		console.log('🎯 PARSED SELECTED PRODUCTS:', selectedProducts);

		// --- STEP 1: Create customer with basic contact info ---
		// Handle name splitting - ensure we always have both firstName and lastName
		const nameParts = name.trim().split(' ');
		const firstName = nameParts[0] || 'Customer'; // Fallback if somehow empty
		const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Request'; // Use "Request" as fallback

		console.log('🔧 Name handling:', { originalName: name, firstName, lastName });

		const customerResponse = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
			variables: {
				input: {
					email: email,
					firstName: firstName,
					lastName: lastName,
					password: "SweetChoice2025!", // Dummy password for B2B
					acceptsMarketing: true,
					phone: formData.get('phone') as string || undefined,
				},
			},
		});

		console.log('Customer creation response:', customerResponse);

		// --- STEP 2: Raw data dump from React context ---  
		console.log('🥷 RAW SELECTED PRODUCTS:', selectedProducts);
		console.log('🔥 RAW FORM DATA:', { name, email, message });
		console.log('💰 CUSTOMER ID:', customerResponse.customerCreate?.customer?.id);

		// --- GOAL #2: Store catalog details for team ---  
		const productsList = selectedProducts.length > 0
			? selectedProducts
				.map(p => `- ${p.title} (${env.PUBLIC_STORE_DOMAIN}/products/${p.handle})`)
				.join('\n')
			: 'No specific products selected - general catalog request.';

		const catalogDetails = {
			customerEmail: email,
			customerName: name,
			message: message || 'No additional message',
			productsRequested: selectedProducts.length,
			productsList: productsList,
			requestDate: new Date().toISOString(),
		};

		console.log('Catalog request details:', catalogDetails);

		// Store this info in customer tags/notes for your team to see in Shopify admin

		// Check for errors in customer creation
		const customerErrors = customerResponse.customerCreate?.customerUserErrors || [];

		if (customerErrors.length > 0) {
			// Check if customer already exists
			const existsError = customerErrors.find(error =>
				error.message?.includes('already exists') ||
				error.message?.includes('taken') ||
				error.code === 'TAKEN'
			);

			if (existsError) {
				console.log('✅ Customer already exists - that means they\'re a returning lead!');
				// This is actually good for B2B - they're showing continued interest
			} else {
				console.error('❌ Customer creation failed:', customerErrors);
				return json({
					ok: false,
					error: `Customer creation failed: ${customerErrors[0].message}`
				}, { status: 500 });
			}
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

// Create customer with basic contact info (official fields only)
const CUSTOMER_CREATE_MUTATION = `#graphql
	mutation customerCreate($input: CustomerCreateInput!) {
		customerCreate(input: $input) {
			customer {
				id
				email
				firstName
				lastName
				acceptsMarketing
			}
			customerUserErrors {
				field
				message
				code
			}
		}
	}
`;