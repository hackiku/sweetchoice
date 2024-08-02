// app/routes/($locale).collections.$handle.tsx

import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables, Image, Money, Analytics } from '@shopify/hydrogen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
// ui
import Gallery from '~/components/ui/Gallery';
import Breadcrumbs from '~/components/ui/Breadcrumbs';
import Logos from '../components/ui/Logos';
import Button from '../components/ui/Button';

// ecom (flowbite)
import Breadcrumb from '~/components/ecom/Breadcrumb';
import StoreNav from '~/components/ecom/StoreNav';
import ProductCard from "~/components/ecom/ProductCard";
// import DropdownFilter from "~/components/ecom/DropdownFilter";


const logos = [
	{ src: "/assets/logos/maxi-logo.svg", alt: "Maxi logo" },
	{ src: "/assets/logos/dis-logo.png", alt: "DIS logo", style: { height: '20px' } },
	{ src: "/assets/logos/idea-logo.svg", alt: "Idea logo" },
	{ src: "/assets/logos/univerexport-logo.svg", alt: "Univerexport logo" },
	{ src: "/assets/logos/tempo-logo.svg", alt: "Tempo logo" },
	{ src: "/assets/logos/aroma-logo.svg", alt: "Aroma logo" },
];


export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `SweetChoice | ${data?.collection.title ?? ''} Collection` }];
};

export async function loader(args: LoaderFunctionArgs) {
	// Start fetching non-critical data without blocking time to first byte
	const deferredData = loadDeferredData(args);

	// Await the critical data required to render initial state of the page
	const criticalData = await loadCriticalData(args);

	return defer({ ...deferredData, ...criticalData });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, params, request }: LoaderFunctionArgs) {
	const { handle } = params;
	const { storefront } = context;
	const paginationVariables = getPaginationVariables(request, {
		pageBy: 8,
	});

	if (!handle) {
		throw redirect('/collections');
	}

	const [{ collection }] = await Promise.all([
		storefront.query(COLLECTION_QUERY, {
			variables: { handle, ...paginationVariables },
			// Add other queries here, so that they are loaded in parallel
		}),
	]);

	if (!collection) {
		throw new Response(`Collection ${handle} not found`, {
			status: 404,
		});
	}

	return {
		collection,
	};
}


export const handle = {
	breadcrumb: 'Collections',
};


/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
	return {};
}

// ---------------------------------------------------

export default function Collection() {
	const { collection } = useLoaderData<typeof loader>();

	return (
		<div >
			<section className="flex flex-col md:flex-row justify-between mt-2 md:mt-4 gap-2 md:gap-44 lg:gap-72">
				<div>
					<StoreNav />
					<a href="/catalog/catalog-sample.pdf" target="_blank" rel="noopener noreferrer">Get Catalog →</a>
					{/* <Button type="primary" onClick={() => window.location.href = "/contact"}>Talk Business</Button> */}
				</div>
				<p className="md:pt-10">{collection.description}</p>

			</section>

			<hr />

			{/* <DropdownFilter /> */}

			<Pagination connection={collection.products}>
				{({ nodes, isLoading, PreviousLink, NextLink }) => (
					<>
						<PreviousLink>
							{isLoading ? 'Loading...' : <span>↑ Load previous</span>}
						</PreviousLink>
						<ProductsGrid products={nodes} />
						<br />
						<NextLink>
							{isLoading ? 'Loading...' : <span>Load more ↓</span>}
						</NextLink>
					</>
				)}
			</Pagination>
			<Analytics.CollectionView
				data={{
					collection: {
						id: collection.id,
						handle: collection.handle,
					},
				}}
			/>
			
			<hr />

			<section>
				<h3>Trusted by leading supermarkets</h3>
				<Logos logos={logos} />

			</section>

		</div>
	);
}



//---------------------------------------------------


function ProductsGrid({ products }: { products: ProductItemFragment[] }) {
	return (
		<div className="my-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product, index) => (
				<ProductCardComponent key={product.id} product={product} loading={index < 8 ? 'eager' : undefined} />
			))}
		</div>
	);
}


function ProductCardComponent({ product, loading }: { product: ProductItemFragment; loading?: 'eager' | 'lazy' }) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
	const productLink = variantUrl;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;
	const rating = 4.5;
	const reviewCount = 100;
	const features = ['Fast Delivery', 'Best Price'];

	return (
		<ProductCard
			productName={product.title}
			productLink={productLink}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			discountLabel="Up to 35% off"
			price={price}
			rating={rating}
			reviewCount={reviewCount}
			features={features}
			darkImageUrl={imageUrl} // Using the same image URL for both light and dark
		/>
	);
}

function ProductItem({ product, loading }: { product: ProductItemFragment; loading?: 'eager' | 'lazy' }) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
	return (
		<Link className="holiday-product-item" key={product.id} prefetch="intent" to={variantUrl}>
			{product.featuredImage && (
				<Image
					className="holiday-product-image"
					alt={product.featuredImage.altText || product.title}
					aspectRatio="1/1"
					data={product.featuredImage}
					loading={loading}
					sizes="(min-width: 45em) 400px, 100vw"
				/>
			)}
			<h4 className="holiday-product-title">{product.title}</h4>
			<small className="holiday-product-price">
				<Money data={product.priceRange.minVariantPrice} />
			</small>
		</Link>

	);
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        altText
        url
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;




