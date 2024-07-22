// app/routes/($locale).collections.$handle.tsx

import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables, Image, Money, Analytics } from '@shopify/hydrogen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Gallery from '~/components/ui/Gallery';

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


const mediaItems = [
	{ id: '1', url: 'https://via.placeholder.com/300', alt: 'Placeholder 1' },
	{ id: '2', url: 'https://via.placeholder.com/300', alt: 'Placeholder 2' },
	{ id: '3', url: 'https://via.placeholder.com/300', alt: 'Placeholder 3' },
	{ id: '4', url: 'https://via.placeholder.com/300', alt: 'Placeholder 4' },
	{ id: '5', url: 'https://via.placeholder.com/300', alt: 'Placeholder 5' },
	{ id: '6', url: 'https://via.placeholder.com/300', alt: 'Placeholder 6' },
	{ id: '7', url: 'https://via.placeholder.com/300', alt: 'Placeholder 7' },
	{ id: '8', url: 'https://via.placeholder.com/300', alt: 'Placeholder 8' },
	{ id: '9', url: 'https://via.placeholder.com/300', alt: 'Placeholder 9' },
	{ id: '10', url: 'https://via.placeholder.com/300', alt: 'Placeholder 10' },
	// Add more items as needed
];





/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
	return {};
}

export default function Collection() {
	const { collection } = useLoaderData<typeof loader>();

	return (
		<div className="collection">
			<div className="holiday-hero">
				<div className="holiday-hero-content">
					<h1 className="holiday-hero-title">{collection.title}</h1>
				</div>
				{collection.image && (
					<Image
						className="holiday-hero-image"
						data={collection.image}
						alt={collection.title}
						loading="lazy"
						// sizes="(min-width: 45em) 40vw, 100vw"
						sizes="(min-width: 85em) 40vw, 100vw"
					/>
				)}
			</div>
			<p className="holiday-collection-description">{collection.description}</p>

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

			{/* <Gallery media={collection.products.nodes.map((product) => product.featuredImage)} /> */}
			<Gallery media={mediaItems} />
		</div>
	);
}

function ProductsGrid({ products }: { products: ProductItemFragment[] }) {
	return (
		<div className="holiday-products-grid">
			{products.map((product, index) => (
				<ProductItem key={product.id} product={product} loading={index < 8 ? 'eager' : undefined} />
			))}
		</div>
	);
}

function ProductItem({ product, loading }: { product: ProductItemFragment; loading?: 'eager' | 'lazy' }) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
	return (
		<Link className="holiday-product-item" key={product.id} prefetch="intent" to={variantUrl}>
			{product.featuredImage && (
				<Image
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
