// app/routes/($locale).products.$handle.tsx
import { Suspense } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link } from '@remix-run/react';
import { getSelectedProductOptions, Image } from '@shopify/hydrogen';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

import { ProductGallery } from '~/components/ecom/product/ProductGallery';
import { ProductInfo } from '~/components/ecom/product/ProductInfo';
import { useContact } from '~/components/cta/contact/ContactContext';
import { PackagingTable, extractPackagingInfo } from '~/components/ecom/product/PackagingTable';

export const meta = ({ data }) => {
	return [{ title: `Sweetchoice | ${data?.product?.title ?? ''}` }];
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
	const { handle } = params;
	const { storefront } = context;
	const selectedOptions = getSelectedProductOptions(request);

	if (!handle) {
		throw new Error('Missing product handle');
	}

	const [{ product }, recommendedProducts] = await Promise.all([
		storefront.query(PRODUCT_QUERY, {
			variables: { handle, selectedOptions },
		}),
		storefront.query(RECOMMENDED_PRODUCTS_QUERY),
	]);

	if (!product?.id) {
		throw new Response(null, { status: 404 });
	}

	return defer({
		product,
		recommendedProducts,
		analytics: {
			pageType: 'product',
			handle,
			products: [product],
		},
		selectedOptions,
	});
}

export default function Product() {
	const { product, recommendedProducts } = useLoaderData<typeof loader>();
	const { toggleProduct, isProductSelected, selectedProducts, openContact } = useContact();

	if (!product) {
		return <div>Product not found</div>;
	}

	const handleAddToCatalog = () => {
		toggleProduct({
			id: product.id,
			title: product.title,
			handle: product.handle,
			featuredImage: product.images.nodes[0],
		});
	};

	// Placeholder description - remove when real descriptions are available
	const placeholderDescription = `
		<p><strong>Premium Quality Seasonal Treats</strong></p>
		<p>Our ${product.title.toLowerCase()} represents the perfect blend of traditional confectionery craftsmanship and modern production standards. Each piece is carefully crafted to deliver exceptional taste and visual appeal that delights customers season after season.</p>
		<p><strong>Key Features:</strong></p>
		<ul>
			<li>Premium ingredients sourced from trusted suppliers</li>
			<li>Vibrant colors and engaging packaging</li>
			<li>Perfect for retail displays and seasonal promotions</li>
			<li>Long shelf life for optimal inventory management</li>
		</ul>
		<p>Ideal for supermarkets, specialty stores, and seasonal retail displays. Contact us for bulk pricing and custom packaging options.</p>
	`;

	return (
		<div className="pt-12 border-y-4 border-black bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
			<div className="mx-auto px-4 md:px-28">
				<div className="md:grid md:grid-cols-2 md:gap-12 md:gap-28">
					{/* LEFT COLUMN - Product Info (was right column) */}
					<div className="flex flex-col gap-6 md:order-1">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
							{product.title}
						</h1>

						{/* Simplified Product Info - Just 2 Brutalist Cards */}
						<ProductInfo
							product={product}
							selectedVariant={product.selectedVariant}
						/>

						{/* Packaging Table */}
						<PackagingTable metafields={extractPackagingInfo(product)} />

						{/* Enhanced Add to Catalog & Contact Buttons */}
						<div className="flex flex-col gap-4">
							<button
								onClick={handleAddToCatalog}
								className={`flex items-center justify-center gap-3 py-4 px-6 text-xl font-bold rounded-xl
                         border-4 border-black transition-all duration-200
                         ${isProductSelected(product.id)
										? 'bg-black text-white shadow-[4px_4px_0px_rgba(0,255,0,1)]'
										: 'bg-[#FF6B6B] hover:bg-[#FF8787] shadow-[4px_4px_0px_rgba(0,0,0,1)]'}
                         hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]
                         active:shadow-[2px_2px_0px_rgba(0,0,0,1)]
                         active:translate-x-[2px] active:translate-y-[2px]`}
							>
								{isProductSelected(product.id) ? (
									<>
										<CheckIcon className="w-6 h-6" />
										Added to Catalog
									</>
								) : (
									<>
										<PlusIcon className="w-6 h-6" />
										Add to Catalog
									</>
								)}
								{selectedProducts.length > 0 && (
									<span className="ml-2 px-3 py-1 bg-white border-2 border-black text-black rounded-full text-sm font-black">
										{selectedProducts.length}
									</span>
								)}
							</button>

							<button
								onClick={openContact}
								className="text-xl font-bold py-3 px-6 text-black bg-[#39FF14] rounded-xl 
                       border-2 border-black hover:bg-[#00FF00] transition-all duration-200
                       shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]
                       flex items-center justify-center gap-2"
							>
								Get Full Catalog →
							</button>
						</div>

						<hr />
						{/* Enhanced Description Section */}
						{/* <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-black p-6
                          shadow-[4px_4px_0px_rgba(0,0,0,1)]"> */}
							<div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
								<div dangerouslySetInnerHTML={{
									__html: product.descriptionHtml || placeholderDescription
								}} />
							</div>
						{/* </div> */}
					</div>

					{/* RIGHT COLUMN - Gallery (was left column) */}
					<div className="mb-8 md:mb-0 md:order-2">
						<h1 className="text-5xl font-bold md:hidden mb-10 text-gray-900">{product.title}</h1>
						<div className="sticky top-8">
							<ProductGallery
								images={product.images.nodes}
								title={product.title}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Recommended Products */}
			<div className="mt-16 px-4 pb-12 md:px-28">
				<div className="border-t-4 border-black my-8"></div>
				<h2 className="text-4xl font-semibold mb-8 text-gray-900">You Might Also Like</h2>
				<Suspense fallback={<div className="text-center py-8">Loading recommendations...</div>}>
					<Await resolve={recommendedProducts}>
						{(data) => <RecommendedProducts products={data.products.nodes} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

function RecommendedProducts({ products }) {
	if (!products?.length) return null;

	return (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
			{products.map((product) => (
				<Link
					key={product.id}
					to={`/products/${product.handle}`}
					className="group block border-4 border-black p-4 bg-white rounded-xl
                     hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                     transition-all duration-200 hover:bg-[#FFF9E5]"
				>
					<div className="aspect-square w-full overflow-hidden border-2 border-black mb-4 rounded-lg">
						<Image
							data={product.images.nodes[0]}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
							sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
						/>
					</div>
					<h4 className="text-lg font-bold truncate text-gray-900">{product.title}</h4>
				</Link>
			))}
		</div>
	);
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
      }
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 100) {
        nodes {
          id
          selectedOptions {
            name
            value
          }
          availableForSale
        }
      }
      jmpal: metafield(namespace: "custom", key: "jm_pal") {
        value
        type
      }
      tppal: metafield(namespace: "custom", key: "tp_pal") {
        value
        type
      }
      jmtp: metafield(namespace: "custom", key: "jm_tp") {
        value
        type
      }
      jmkp: metafield(namespace: "custom", key: "jm_kp") {
        value
        type
      }
      rok_trajanja: metafield(namespace: "custom", key: "shelf_life") {
        value
        type
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query recommendedProducts($count: Int = 5) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        images(first: 1) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;