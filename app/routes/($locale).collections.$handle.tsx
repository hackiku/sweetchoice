// app/routes/($locale).collections.$handle.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables, Money, Analytics } from '@shopify/hydrogen';
import WholesaleCard from "~/components/ecom/WholesaleCard";
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

import Logos from '~/components/ui/Logos';
import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

// Example logos data (replace with your actual data)
const logos = [
	{ src: "/assets/logos/maxi-logo.svg", alt: "Maxi logo" },
	{ src: "/assets/logos/dis-logo.png", alt: "DIS logo", style: { height: '20px' } },
	{ src: "/assets/logos/idea-logo.svg", alt: "Idea logo" },
	{ src: "/assets/logos/univerexport-logo.svg", alt: "Univerexport logo" },
	{ src: "/assets/logos/tempo-logo.svg", alt: "Tempo logo" },
	{ src: "/assets/logos/aroma-logo.svg", alt: "Aroma logo" },
];

const seasonColors = {
	christmas: { main: '#F65A4D', secondary: '#00FF00' },
	valentines: { main: '#D8B3F8', secondary: '#FF6B6B' },
	easter: { main: '#FFDB58', secondary: '#FF6B6B' },
	halloween: { main: '#FFA500', secondary: '#00FF00' },
	default: { main: '#FFF59F', secondary: '#A6FAFF' },
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `SweetChoice | ${data?.collection.title ?? ''} Collection` }];
};

export async function loader(args: LoaderFunctionArgs) {
	const { handle } = args.params;
	const { storefront } = args.context;
	const paginationVariables = getPaginationVariables(args.request, { pageBy: 8 });

	if (!handle) {
		throw redirect('/collections');
	}

	const [{ collection }] = await Promise.all([
		storefront.query(COLLECTION_QUERY, { variables: { handle, ...paginationVariables } })
	]);

	if (!collection) {
		throw new Response(`Collection ${handle} not found`, { status: 404 });
	}

	return defer({ collection });
}

export default function Collection() {
	const { collection } = useLoaderData<typeof loader>();
	const [sortOption, setSortOption] = useState('manual');
	const [stockFilter, setStockFilter] = useState('all');
	const [gridSize, setGridSize] = useState(4);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'sort_by') setSortOption(value);
		else if (name === 'stock_filter') setStockFilter(value);
		else if (name === 'grid_size') setGridSize(Number(value));
	}, []);

	const filteredAndSortedProducts = useMemo(() => {
		if (!collection.products) return [];
		let products = [...collection.products.nodes];

		if (stockFilter === 'in-stock') {
			products = products.filter(product => product.variants.nodes.some(variant => variant.availableForSale));
		} else if (stockFilter === 'out-of-stock') {
			products = products.filter(product => product.variants.nodes.every(variant => !variant.availableForSale));
		}

		switch (sortOption) {
			case 'best-selling':
				// Implement your best-selling logic here
				return products;
			case 'title-ascending':
				return products.sort((a, b) => a.title.localeCompare(b.title));
			case 'title-descending':
				return products.sort((a, b) => b.title.localeCompare(a.title));
			case 'price-ascending':
				return products.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
			case 'price-descending':
				return products.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
			case 'created-ascending':
				return products.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
			case 'created-descending':
				return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			default:
				return products;
		}
	}, [collection.products, sortOption, stockFilter]);

	const seasonColor = seasonColors[collection.handle as keyof typeof seasonColors] || seasonColors.default;

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	return (
		<div className="w-full">
			<div className="w-full bg-[#fff8ee] pt-14 pb-10 border-b-4 border-t-4 border-black"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px',
					backgroundColor: seasonColor.main,
				}}>
				<div className="container mx-auto px-6 md:px-12">
					<h1 className="text-6xl font-bold mb-4">
						{collection.title}
					</h1>
					<ContactButton
						onClick={handleContactClick}
						text="Get Catalog →"
						bgColor={seasonColor.secondary}
						hoverBgColor="black"
						textColor="black"
						hoverTextColor="white"
						className="text-xl"
					/>
				</div>
			</div>

			<div className="container mx-auto px-6 md:px-12 mt-8 flex flex-wrap justify-start gap-4">
				<select
					name="sort_by"
					value={sortOption}
					onChange={handleSortChange}
					className="border-4 border-black p-2 font-bold bg-pink-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
				>
					<option value="manual">Featured</option>
					<option value="best-selling">Best selling</option>
					<option value="title-ascending">Alphabetically, A-Z</option>
					<option value="title-descending">Alphabetically, Z-A</option>
					<option value="price-ascending">Price, low to high</option>
					<option value="price-descending">Price, high to low</option>
					<option value="created-ascending">Date, old to new</option>
					<option value="created-descending">Date, new to old</option>
				</select>

				<select
					name="stock_filter"
					value={stockFilter}
					onChange={handleSortChange}
					className="border-4 border-black p-2 font-bold bg-green-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
				>
					<option value="all">All products</option>
					<option value="in-stock">In stock</option>
					<option value="out-of-stock">Out of stock</option>
				</select>

				<select
					name="grid_size"
					value={gridSize}
					onChange={handleSortChange}
					className="border-4 border-black p-2 font-bold bg-blue-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
				>
					<option value="1">Grid: 1</option>
					<option value="2">Grid: 2</option>
					<option value="3">Grid: 3</option>
					<option value="4">Grid: 4</option>
					<option value="5">Grid: 5</option>
					<option value="6">Grid: 6</option>
				</select>
			</div>

			<div className="container mx-auto px-6 md:px-12 mt-8">
				<Pagination connection={collection.products}>
					{({ nodes, isLoading, PreviousLink, NextLink }) => (
						<>
							<div className={`grid gap-4 grid-cols-${gridSize}`}>
								{nodes.map((product) => (
									<WholesaleCardComponent key={product.id} product={product} secondaryColor={seasonColor.secondary} />
								))}
							</div>
							<div className="flex justify-between items-center mt-8">
								<PreviousLink className="border-4 border-black p-2 font-bold bg-purple-300 transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]">
									{isLoading ? 'Loading...' : '← Previous'}
								</PreviousLink>
								<NextLink className="border-4 border-black p-2 font-bold bg-purple-300 transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]">
									{isLoading ? 'Loading...' : 'Next →'}
								</NextLink>
							</div>
						</>
					)}
				</Pagination>

				<section className="mt-16">
					<h3 className="text-2xl font-bold mb-4">Trusted by leading supermarkets</h3>
					<Logos logos={logos} />
				</section>
			</div>

			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
}

function WholesaleCardComponent({ product, secondaryColor }: { product: ProductItemFragment; secondaryColor: string }) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
	const productLink = variantUrl;
	const imageUrl = product.featuredImage?.url || '';
	const imageAlt = product.featuredImage?.altText || product.title;
	const price = <Money data={product.priceRange.minVariantPrice} />;
	const product_id = product.id;

	return (
		<WholesaleCard
			productName={product.title}
			productLink={productLink}
			imageUrl={imageUrl}
			imageAlt={imageAlt}
			price={price}
			weight="80g" // You might want to get this from your product data
			buttonBgColor={secondaryColor}
			tags={product.tags || []}
			product_id={product_id}
		/>
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
        availableForSale
      }
    }
    createdAt
  }
` as const;

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