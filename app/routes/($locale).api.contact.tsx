// app/routes/($locale).api.contact.tsx
import { ActionFunction, json } from '@shopify/remix-oxygen';

interface CatalogProduct {
	id: string;
	title: string;
	handle: string;
	featuredImage?: {
		url: string;
		altText?: string;
	};
}

interface CatalogState {
	products: CatalogProduct[];
	lastUpdated: string;
}

export const action: ActionFunction = async ({ request, context }) => {
	const { storefront, session } = context;
	const formData = await request.formData();
	const action = formData.get('_action');

	// Get existing catalog state
	let catalogState: CatalogState = await session.get('catalog') || {
		products: [],
		lastUpdated: new Date().toISOString()
	};

	try {
		switch (action) {
			case 'ADD_PRODUCT': {
				const product = JSON.parse(formData.get('product') as string);
				// Only add if not already in the catalog
				if (!catalogState.products.some(p => p.id === product.id)) {
					catalogState.products = [...catalogState.products, product];
					await session.set('catalog', catalogState);
				}
				return json({ success: true, catalog: catalogState });
			}

			case 'REMOVE_PRODUCT': {
				const productId = formData.get('productId') as string;
				catalogState.products = catalogState.products.filter(p => p.id !== productId);
				await session.set('catalog', catalogState);
				return json({ success: true, catalog: catalogState });
			}

			case 'SUBMIT_CATALOG': {
				const email = formData.get('email') as string;
				const name = formData.get('name') as string;
				const message = formData.get('message') as string;

				// Subscribe to newsletter
				await storefront.mutate(NEWSLETTER_SUBSCRIBE_MUTATION, {
					variables: {
						email,
						acceptsMarketing: true
					}
				});

				// Format selected products for email
				const productsList = catalogState.products
					.map(p => `- ${p.title} (https://${context.env.PUBLIC_STORE_DOMAIN}/products/${p.handle})`)
					.join('\n');

				// Prepare email content based on whether products were selected
				const emailContent = catalogState.products.length > 0
					? `
Hello ${name},

Thank you for your interest in our wholesale catalog! Here are the products you've selected:

${productsList}

You can view our complete catalog at: https://${context.env.PUBLIC_STORE_DOMAIN}/collections/all

${message ? `\nYour message:\n${message}` : ''}

Best regards,
The Sweetchoice Team
          `
					: `
Hello ${name},

Thank you for your interest in our wholesale catalog! You can view our complete collection at:
https://${context.env.PUBLIC_STORE_DOMAIN}/collections/all

${message ? `\nYour message:\n${message}` : ''}

Best regards,
The Sweetchoice Team
          `;

				// Send email via Shopify's customer contact API
				await storefront.mutate(CUSTOMER_CONTACT_MUTATION, {
					variables: {
						input: {
							email,
							message: emailContent,
							phone: "",
							subject: "Your Sweetchoice Wholesale Catalog"
						}
					}
				});

				// Clear catalog after successful submission
				catalogState.products = [];
				await session.set('catalog', catalogState);

				return json({ success: true, catalog: catalogState });
			}

			case 'CLEAR_CATALOG': {
				catalogState.products = [];
				await session.set('catalog', catalogState);
				return json({ success: true, catalog: catalogState });
			}

			default:
				throw new Error('Unknown action');
		}
	} catch (error) {
		console.error('Contact Error:', error);
		return json(
			{
				error: 'Failed to process request',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 400 }
		);
	}
};

// Loader to get catalog state
export async function loader({ context }) {
	const catalog = await context.session.get('catalog');
	return json({ catalog });
}

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

const NEWSLETTER_SUBSCRIBE_MUTATION = `#graphql
  mutation NewsletterSubscribe($email: String!, $acceptsMarketing: Boolean!) {
    customerUpdate(input: {
      email: $email,
      acceptsMarketing: $acceptsMarketing
    }) {
      customer {
        id
        acceptsMarketing
      }
      userErrors {
        field
        message
      }
    }
  }
`;