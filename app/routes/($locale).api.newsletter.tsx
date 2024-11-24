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

		// Use the Customer Account API
		const response = await context.customerAccount.mutate(
			`mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }`,
			{
				variables: {
					input: {
						email,
						emailMarketingConsent: {
							marketingState: "SUBSCRIBED",
							marketingOptInLevel: "SINGLE_OPT_IN"
						}
					}
				},
			}
		);

		console.log('API Response:', response);

		if (response.error) {
			// Check if it's because customer already exists
			if (response.error.message?.includes('already exists')) {
				return json({
					success: true,
					message: "Thanks for subscribing!"
				});
			}

			console.error('API Error:', response.error);
			return json({
				error: response.error.message || 'Something went wrong',
				success: false
			}, { status: 400 });
		}

		const { data, errors } = response;

		if (errors?.length) {
			console.error('GraphQL Errors:', errors);
			return json({ error: errors[0].message }, { status: 400 });
		}

		const userErrors = data?.customerCreate?.userErrors;
		if (userErrors?.length) {
			console.error('User Errors:', userErrors);
			return json({ error: userErrors[0].message }, { status: 400 });
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