// app/routes/($locale).api.newsletter.tsx

import { ActionFunctionArgs, json } from '@shopify/remix-oxygen';

export async function action({ request, context }: ActionFunctionArgs) {
	if (request.method !== 'POST') {
		return json({ error: 'Method not allowed' }, { status: 405 });
	}

	try {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();

		if (!email) {
			return json({ error: 'Email is required' }, { status: 400 });
		}

		// Use customerCreate with dummy password (B2B newsletter signup)
		const response = await context.storefront.mutate(
			CUSTOMER_CREATE_MUTATION,
			{
				variables: {
					input: {
						email,
						password: "SweetChoice2025!", // Dummy password for B2B contacts
						acceptsMarketing: true,
					}
				},
			}
		);

		console.log('Newsletter API Response:', response);

		const { customerCreate } = response;
		const userErrors = customerCreate?.customerUserErrors || [];

		if (userErrors.length > 0) {
			// Check if it's because customer already exists
			const existsError = userErrors.find(error =>
				error.message?.includes('already exists') ||
				error.message?.includes('taken') ||
				error.code === 'TAKEN'
			);

			if (existsError) {
				return json({
					success: true,
					message: "Thanks for subscribing!"
				});
			}

			console.error('Customer creation errors:', userErrors);
			return json({
				error: userErrors[0].message || 'Something went wrong',
				success: false
			}, { status: 400 });
		}

		// Success case
		return json({
			success: true,
			message: "Thanks for subscribing!"
		});

	} catch (error) {
		console.error('Newsletter error:', error);
		return json({
			error: 'Something went wrong. Please try again.',
			success: false,
			details: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	}
}

const CUSTOMER_CREATE_MUTATION = `#graphql
	mutation customerCreate($input: CustomerCreateInput!) {
		customerCreate(input: $input) {
			customer {
				id
				email
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