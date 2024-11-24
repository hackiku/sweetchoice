// app/routes/($locale).api.newsletter.tsx

import { ActionFunctionArgs, json } from '@shopify/remix-oxygen';
import { z } from 'zod';

const emailSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	_action: z.literal('SUBSCRIBE')
});

export async function action({ request, context }: ActionFunctionArgs) {
	if (request.method !== 'POST') {
		return json({ error: 'Method not allowed' }, { status: 405 });
	}

	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		const { email } = emailSchema.parse(data);

		// Create a customer with the email address using Shopify Admin API
		const response = await context.admin.graphql(`
      mutation customerCreate($input: CustomerInput!) {
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
      }
    `, {
			variables: {
				input: {
					email,
					acceptsMarketing: true,
				},
			},
		});

		const { customerCreate } = await response.json();

		if (customerCreate.userErrors?.length > 0) {
			return json({
				error: customerCreate.userErrors[0].message,
				success: false
			}, { status: 400 });
		}

		// Subscribe the customer to your newsletter 
		// You can also use Shopify's Customer Segments or integrate with email providers like Klaviyo here

		return json({
			success: true,
			message: "Successfully subscribed to newsletter"
		});

	} catch (error) {
		if (error instanceof z.ZodError) {
			return json({
				error: error.errors[0].message,
				success: false
			}, { status: 400 });
		}

		console.error('Newsletter subscription error:', error);
		return json({
			error: 'An error occurred while subscribing. Please try again.',
			success: false
		}, { status: 500 });
	}
}