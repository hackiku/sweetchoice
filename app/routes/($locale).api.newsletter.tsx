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

		// Use Shopify's Email Marketing API
		const response = await context.storefront.mutate(
			`mutation emailMarketingSubscribe($email: String!) {
        emailMarketingSubscribe(email: $email) {
          emailMarketing {
            id
            subscribedAt
            subscriberStatus
          }
          userErrors {
            field
            message
          }
        }
      }`,
			{
				variables: {
					email,
				},
			}
		);

		const { emailMarketingSubscribe } = await response.json();

		if (emailMarketingSubscribe.userErrors?.length) {
			return json({
				error: emailMarketingSubscribe.userErrors[0].message,
				success: false
			}, { status: 400 });
		}

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