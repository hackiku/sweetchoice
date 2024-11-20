// app/routes/api.contact.tsx

import { ActionFunction, json } from '@shopify/remix-oxygen';

export const action: ActionFunction = async ({ request, context }) => {
	const { storefront, session } = context;
	const data = await request.formData();

	try {
		// Send to Shopify's customer contact API
		await storefront.mutate(CUSTOMER_CONTACT_MUTATION, {
			variables: {
				input: {
					email: data.get('email'),
					message: `Name: ${data.get('name')}\nCatalog Request`,
					phone: "",
					subject: "B2B Catalog Request"
				}
			}
		});

		return json({ success: true });
	} catch (error) {
		console.error('Contact Error:', error);
		return json({ error: 'Failed to send message' }, { status: 400 });
	}
};

const CUSTOMER_CONTACT_MUTATION = `#graphql
  mutation customerContact($input: CustomerContactInput!) {
    customerContact(input: $input) {
      success
      errors {
        field
        message
      }
    }
  }
`;