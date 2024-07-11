// app/routes/api.create-product.tsx

// import { json, type ActionFunction } from '@shopify/remix-oxygen';
// // import fetch from 'node-fetch';

// export const action: ActionFunction = async ({ request }) => {
// 	const { title, productType, vendor, bodyHtml, tags, published, price, sku, barcode, inventoryPolicy, fulfillmentService, inventoryManagement, inventoryQuantity, weight, weightUnit, imageURL } = await request.json();

// 	const productInput = {
// 		title,
// 		product_type: productType,
// 		vendor,
// 		body_html: bodyHtml,
// 		tags,
// 		published,
// 		variants: [
// 			{
// 				price,
// 				sku,
// 				barcode,
// 				inventory_policy: inventoryPolicy,
// 				fulfillment_service: fulfillmentService,
// 				inventory_management: inventoryManagement,
// 				inventory_quantity: inventoryQuantity,
// 				weight,
// 				weight_unit: weightUnit,
// 			},
// 		],
// 		images: [
// 			{
// 				src: imageURL,
// 			},
// 		],
// 	};

// 	const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-04/products.json`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
// 		},
// 		body: JSON.stringify({ product: productInput }),
// 	});

// 	const data = await response.json();

// 	if (!response.ok) {
// 		return json({ error: data.errors }, { status: response.status });
// 	}

// 	return json(data);
// };
