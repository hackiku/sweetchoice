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

		// Use contact form approach for newsletter signups
		const response = await context.storefront.mutate(
			CUSTOMER_CONTACT_MUTATION,
			{
				variables: {
					input: {
						email,
						message: `Newsletter signup request from: ${email}\n\nThis customer wants to receive marketing emails about holiday confectionery products.`,
					}
				},
			}
		);

		console.log('Newsletter API Response:', response);

		const { customerContact } = response;
		const userErrors = customerContact?.userErrors || [];

		if (userErrors.length > 0) {
			console.error('Newsletter contact errors:', userErrors);
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