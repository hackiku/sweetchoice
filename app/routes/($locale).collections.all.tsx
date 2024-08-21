// app/routes/($locale).collections.all.tsx

import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import {
	Pagination,
	getPaginationVariables,
	Image,
	Money,
} from '@shopify/hydrogen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

import ProductCard from '~/components/ecom/product/ProductCard';
import ProductCardMini from '~/components/ecom/product/ProductCardMini';
import ProductCardWholesale from '~/components/ecom/product/ProductCardWholesale';

export const meta: MetaFunction<typeof loader> = () => {
	return [{ title: `SweetChoice | All Products` }];
};

export async function loader(args: LoaderFunctionArgs) {
	const { context, request } = args;
	const { storefront } = context;
	const paginationVariables = getPaginationVariables(request, {
		pageBy: 8,
	});

	const { products } = await storefront.query(CATALOG_QUERY, {
		variables: { ...paginationVariables },
	});

	return defer({ products });
}

export default function Collection() {
	const { products } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">All Products</h1>
			<Pagination connection={products}>
				{({ nodes, isLoading, PreviousLink, NextLink }) => (
					<>
						<PreviousLink className="inline-block mb-4 text-blue-600 hover:text-blue-800">
							{isLoading ? 'Loading...' : <span>↑ Load previous</span>}
						</PreviousLink>
						<ProductsGrid products={nodes} />
						<NextLink className="inline-block mt-4 text-blue-600 hover:text-blue-800">
							{isLoading ? 'Loading...' : <span>Load more ↓</span>}
						</NextLink>
					</>
				)}
			</Pagination>
		</div>
	);
}

function ProductsGrid({ products }: { products: ProductItemFragment[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{products.map((product, index) => {
				const variant = product.variants.nodes[0];
				const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);

				// Rotating between different card types for demonstration
				switch (index % 4) {
					case 0:
						return (
							<ProductCard
								key={product.id}
								productName={product.title}
								productLink={variantUrl}
								product_id={product.id}
								imageUrl={product.featuredImage?.url || ''}
								imageAlt={product.featuredImage?.altText || product.title}
								price={<Money data={product.priceRange.minVariantPrice} />}
								weight="100g" // Placeholder, adjust as needed
							/>
						);
					case 1:
						return (
							<ProductCardMini
								key={product.id}
								productName={product.title}
								product_id={product.id}
								productLink={variantUrl}
								imageUrl={product.featuredImage?.url || ''}
								imageAlt={product.featuredImage?.altText || product.title}
								price={<Money data={product.priceRange.minVariantPrice} />}
								weight="100g" // Placeholder, adjust as needed
								tags={['New', 'Popular']} // Example tags, adjust as needed
							/>
						);
					case 2:
						return (
							<ProductCardWholesale
								key={product.id}
								productName={product.title}
								product_id={product.id}
								productLink={variantUrl}
								imageUrl={product.featuredImage?.url || ''}
								imageAlt={product.featuredImage?.altText || product.title}
								price={<Money data={product.priceRange.minVariantPrice} />}
								weight="100g" // Placeholder, adjust as needed
								tags={['Wholesale', 'Bulk']} // Example tags, adjust as needed
							/>
						);
					case 3:
						return (
							<ProductItem
								key={product.id}
								product={product}
								loading={index < 8 ? 'eager' : undefined}
							/>
						);
				}
			})}
		</div>
	);
}

function ProductItem({
	product,
	loading,
}: {
	product: ProductItemFragment;
	loading?: 'eager' | 'lazy';
}) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
	return (
		<Link
			className="block bg-white border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] 
                 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200"
			key={product.id}
			prefetch="intent"
			to={variantUrl}
		>
			{product.featuredImage && (
				<Image
					alt={product.featuredImage.altText || product.title}
					aspectRatio="1/1"
					data={product.featuredImage}
					loading={loading}
					sizes="(min-width: 45em) 400px, 100vw"
					className="w-full h-64 object-cover mb-4"
				/>
			)}
			<h4 className="text-lg font-bold mb-2">{product.title}</h4>
			<small className="text-gray-600">
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

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
` as const;