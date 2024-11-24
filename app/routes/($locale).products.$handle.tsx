// app/routes/($locale).products.$handle.tsx
import { Suspense } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link } from '@remix-run/react';
import { getSelectedProductOptions, Image } from '@shopify/hydrogen';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

import { ProductGallery } from '~/components/ecom/product/ProductGallery';
import { ProductInfo } from '~/components/ecom/product/ProductInfo';
import { useContact } from '~/components/contact/ContactContext';
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

	return (
		<div className="pt-12 border-y-4 border-black bg-indigo-200 bg-opacity-70">
			<div className="mx-auto px-4 md:px-28">
				<div className="md:grid md:grid-cols-2 md:gap-12 md:gap-28">
					{/* Left Column - Gallery */}
					<div className="mb-8 md:mb-0">
						<h1 className="text-5xl font-bold md:hidden mb-10">{product.title}</h1>
						<ProductGallery
							images={product.images.nodes}
							title={product.title}
						/>
					</div>

					{/* Right Column - Product Info */}
					<div className="flex flex-col gap-6">
						<h1 className="text-4xl md:text-5xl font-bold hidden md:block">
							{product.title}
						</h1>

						{/* Product Info Component */}
						<ProductInfo
							product={product}
							selectedVariant={product.selectedVariant}
						/>

						{/* Packaging Table */}
						<PackagingTable metafields={extractPackagingInfo(product)} />

						{/* Add to Catalog & Contact Buttons */}
						<div className="flex flex-col gap-4">
							<button
								onClick={handleAddToCatalog}
								className={`flex items-center justify-center gap-2 py-3 px-6 text-xl font-semibold 
                         border-4 border-black transition-all duration-200
                         ${isProductSelected(product.id)
										? 'bg-black text-white'
										: 'bg-[#FF6B6B] hover:bg-[#FF8787]'}
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                         active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
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
									<span className="ml-4 px-2.5 py-1 py-0.5 bg-black border-2 border-black text-black bg-white rounded-full text-sm">
										{selectedProducts.length}
									</span>
								)}
							</button>

							<button
								onClick={openContact}
								className="text-xl font-semibold py-2 text-black hover:underline 
                       transition-all duration-200 flex items-center justify-center"
							>
								Get Catalog →
							</button>
						</div>

						<div className="border-t-4 border-black my-4"></div>

						<div className="font-semibold prose prose-xl">
							<div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
						</div>
					</div>
				</div>
			</div>

			{/* Recommended Products */}
			<div className="mt-16 px-4 pb-12 md:px-28">
				<div className="border-t-4 border-black my-8"></div>
				<h2 className="text-4xl font-semibold mb-8">Recommended</h2>
				<Suspense fallback={<div>Loading...</div>}>
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
					className="group block border-4 border-black p-4 bg-white 
                     hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                     transition-all duration-200"
				>
					<div className="aspect-square w-full overflow-hidden border-2 border-black mb-4">
						<Image
							data={product.images.nodes[0]}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
							sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
						/>
					</div>
					<h4 className="text-lg font-bold truncate">{product.title}</h4>
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