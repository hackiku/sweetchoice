// app/routes/($locale).collections.$handle.tsx


import React, { useState, useMemo, useEffect } from 'react';
import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';
import Card from '~/components/ecom/product/Card';
import type { ProductItemFragment } from 'storefrontapi.generated';

import HolidaySelector from '~/components/ecom/holidays/HolidaySelector';

import { useTranslation } from '~/lib/i18n/useTranslation';
import { useContact } from '~/components/cta/contact/ContactContext';

import SelectorRow from '~/components/ecom/SelectorRow';
import Logos from '~/components/proof/Logos';
import ContactButton from '~/components/cta/contact/ContactButton';

const logos = [
	{ src: "/assets/logos/maxi-logo.svg", alt: "Maxi logo" },
	{ src: "/assets/logos/dis-logo.png", alt: "DIS logo", style: { height: '20px' } },
	{ src: "/assets/logos/idea-logo.svg", alt: "Idea logo" },
	{ src: "/assets/logos/univerexport-logo.svg", alt: "Univerexport logo" },
	{ src: "/assets/logos/tempo-logo.svg", alt: "Tempo logo" },
	{ src: "/assets/logos/aroma-logo.svg", alt: "Aroma logo" },
];

const seasonColors = {
	christmas: {
		main: '#F65A4D',
		secondary: '#00FF00',
		translationKey: 'footer.navigation.holidays.items.christmas'
	},
	valentines: {
		main: '#D8B3F8',
		secondary: '#FF6B6B',
		translationKey: 'footer.navigation.holidays.items.valentinesDay'
	},
	easter: {
		main: '#FFDB58',
		secondary: '#FF6B6B',
		translationKey: 'footer.navigation.holidays.items.easter'
	},
	halloween: {
		main: '#FFA500',
		secondary: '#00FF00',
		translationKey: 'footer.navigation.holidays.items.halloween'
	},
	default: {
		main: '#FFF59F',
		secondary: '#A6FAFF',
		translationKey: 'footer.navigation.shop.items.allYear'
	},
} as const;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `SweetChoice | ${data?.collection.title ?? ''} Collection` }];
};

export async function loader(args: LoaderFunctionArgs) {
	const { handle } = args.params;
	const { storefront } = args.context;
	const paginationVariables = getPaginationVariables(args.request, { pageBy: 24 });

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
	const { t } = useTranslation();
	const { openContact } = useContact();

	const [sortOption, setSortOption] = useState('manual');
	const [stockFilter, setStockFilter] = useState('all');
	const [gridSize, setGridSize] = useState(4); // Default to 4 columns

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			// Max 4 columns by default
			if (width < 640) setGridSize(1);
			else if (width < 768) setGridSize(2);
			else if (width < 1024) setGridSize(3);
			else setGridSize(4);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'sort_by') setSortOption(value);
		else if (name === 'stock_filter') setStockFilter(value);
		else if (name === 'grid_size') setGridSize(Number(value));
	};

	const filteredAndSortedProducts = useMemo(() => {
		if (!collection.products) return [];

		let products = [...collection.products.nodes];

		// Apply stock filter
		if (stockFilter === 'in-stock') {
			products = products.filter(product =>
				product.variants.nodes.some(variant => variant.availableForSale)
			);
		} else if (stockFilter === 'out-of-stock') {
			products = products.filter(product =>
				product.variants.nodes.every(variant => !variant.availableForSale)
			);
		}

		// Apply sorting
		switch (sortOption) {
			case 'best-selling':
				return products;
			case 'title-ascending':
				return [...products].sort((a, b) => a.title.localeCompare(b.title));
			case 'title-descending':
				return [...products].sort((a, b) => b.title.localeCompare(a.title));
			case 'created-ascending':
				return [...products].sort((a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
			case 'created-descending':
				return [...products].sort((a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			default:
				return products;
		}
	}, [collection.products, sortOption, stockFilter]);

	const seasonColor = seasonColors[collection.handle as keyof typeof seasonColors] || seasonColors.default;

	return (
		<div className="w-full">
			<div className="w-full bg-[#fff8ee] pt-14 pb-10 border-b-4 border-t-4 border-black"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px',
					backgroundColor: seasonColor.main,
				}}>
				<div className="container mx-auto px-6 md:px-12">
					<span className="inline-block bg-black text-white text-2xl font-bold py-2 px-4 transform -rotate-2 uppercase whitespace-normal max-w-max mb-4"
						style={{
							boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
						}}>
						{t('collections.header.productsLabel')}
					</span>

					<h1 className="uppercase text-[14vw] mt-2 sm:text-[8vw] md:text-[7vw] font-bold leading-tight text-orange-400"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						{t(seasonColors[collection.handle as keyof typeof seasonColors]?.translationKey || 'footer.navigation.shop.items.allYear')}
					</h1>

					{/* Updated button and selector container */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pb-4">
						<ContactButton
							onClick={openContact}
							text={t('collections.cta.getCatalog')}
							bgColor={`bg-[#45FF13]`}
							hoverBgColor="hover:bg-black"
							textColor="text-black"
							hoverTextColor="hover:text-white"
							className="text-xl"
						/>

						<div className="flex justify-end">
							<HolidaySelector />
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-6 md:px-12 mt-8">
				<SelectorRow
					sortOption={sortOption}
					stockFilter={stockFilter}
					gridSize={gridSize}
					onSortChange={handleSortChange}
				/>

				<div className="border-t-4 border-black my-8"></div>

				<Pagination connection={collection.products}>
					{({ nodes: originalNodes, isLoading, PreviousLink, NextLink }) => (
						<>
							<div
								className="grid gap-4"
								style={{
									gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
								}}
							>
								{filteredAndSortedProducts.slice(0, 24).map((product) => (
									<Card
										key={product.id}
										product={product}
										seasonColor={seasonColor.main}
										secondaryColor={seasonColor.secondary}
									/>
								))}
							</div>
							<div className="flex justify-between items-center mt-8">
								<PreviousLink>
									{isLoading ? t('collections.pagination.loading') : t('collections.pagination.previous')}
								</PreviousLink>
								<NextLink>
									{isLoading ? t('collections.pagination.loading') : t('collections.pagination.next')}
								</NextLink>
							</div>
						</>
					)}
				</Pagination>

				<section className="mt-16 pt-8 border-t-4 border-black">
					<h3 className="text-3xl font-bold mb-8 text-center">{t('collections.trust.title')}</h3>
					<Logos logos={logos} />
				</section>
			</div>
		</div>
	);
}

// Keep the GraphQL queries and fragments as they were
const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    title
    handle
		createdAt
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
        weight
        weightUnit
        availableForSale
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    tags
  }
` as const;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query CollectionDetails(
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