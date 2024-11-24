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

		// Mutation to add customer to marketing list
		const response = await context.storefront.mutate(
			`mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            field
            message
          }
        }
      }`,
			{
				variables: {
					input: {
						email,
						acceptsMarketing: true,
					},
				},
			}
		);

		const { data } = await response.json();

		// Check for errors but don't worry if customer already exists
		const errors = data?.customerCreate?.customerUserErrors;
		if (errors?.length && !errors[0].message.includes('already exists')) {
			return json({ error: errors[0].message }, { status: 400 });
		}

		return json({
			success: true,
			message: "Thanks for subscribing!"
		});

	} catch (error) {
		console.error('Newsletter error:', error);
		return json({
			error: 'Something went wrong. Please try again.',
			success: false
		}, { status: 500 });
	}
}
