// app/routes/($locale).collections.all.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

import Card from '~/components/ecom/product/Card';
import SelectorRow from '~/components/ecom/SelectorRow';
import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

const seasonColors = {
	default: { main: '#FFF59F', secondary: '#A6FAFF' },
	christmas: { main: '#F65A4D', secondary: '#00FF00' },
	valentines: { main: '#D8B3F8', secondary: '#FF6B6B' },
	easter: { main: '#FFDB58', secondary: '#FF6B6B' },
	halloween: { main: '#FFA500', secondary: '#00FF00' },
};

const seasons = ['Christmas', 'Valentine\'s', 'Easter', 'Halloween'];

export const meta: MetaFunction<typeof loader> = () => {
	return [{ title: `SweetChoice | All Products` }];
};

export async function loader(args: LoaderFunctionArgs) {
	const { context, request } = args;
	const { storefront } = context;
	const paginationVariables = getPaginationVariables(request, {
		pageBy: 24,
	});

	const { products } = await storefront.query(CATALOG_QUERY, {
		variables: { ...paginationVariables },
	});

	return defer({ products });
}

const ProductCard: React.FC<{ product: ProductItemFragment; seasonColor: { main: string; secondary: string }; onContactClick: () => void }> = ({ product, seasonColor, onContactClick }) => {
	const variantUrl = useVariantUrl(product.handle, product.variants.nodes[0].selectedOptions);

	return (
		<Card
			productName={product.title}
			productLink={variantUrl}
			imageUrl={product.featuredImage?.url || ''}
			imageAlt={product.featuredImage?.altText || product.title}
			weight={Math.floor(Math.random() * 500 + 50)}
			weightUnit="g"
			seasonColor={seasonColor.secondary}
			secondaryColor={seasonColor.secondary}
			boxQuantity={Math.floor(Math.random() * 20 + 5)}
			onContactClick={onContactClick}
		/>
	);
};

export default function Collection() {
	const { products } = useLoaderData<typeof loader>();
	const [sortOption, setSortOption] = useState('manual');
	const [stockFilter, setStockFilter] = useState('all');
	const [gridSize, setGridSize] = useState(4);
	const [selectedSeason, setSelectedSeason] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'sort_by') setSortOption(value);
		else if (name === 'stock_filter') setStockFilter(value);
		else if (name === 'grid_size') setGridSize(Number(value));
	}, []);

	const handleSeasonClick = useCallback((season: string) => {
		setSelectedSeason(prevSeason => prevSeason === season ? '' : season);
	}, []);

	const filteredAndSortedProducts = useMemo(() => {
		if (!products.nodes) return [];
		let filteredProducts = [...products.nodes];

		if (stockFilter === 'in-stock') {
			filteredProducts = filteredProducts.filter(product => product.variants.nodes.some(variant => variant.availableForSale));
		} else if (stockFilter === 'out-of-stock') {
			filteredProducts = filteredProducts.filter(product => product.variants.nodes.every(variant => !variant.availableForSale));
		}

		if (selectedSeason) {
			filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(selectedSeason.toLowerCase()));
		}

		switch (sortOption) {
			case 'title-ascending':
				return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
			case 'title-descending':
				return filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
			case 'price-ascending':
				return filteredProducts.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
			case 'price-descending':
				return filteredProducts.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
			case 'created-ascending':
				return filteredProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
			case 'created-descending':
				return filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			default:
				return filteredProducts;
		}
	}, [products.nodes, sortOption, stockFilter, selectedSeason]);

	const seasonColor = seasonColors[selectedSeason.toLowerCase() as keyof typeof seasonColors] || seasonColors.default;

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	return (
		<div className="w-full">
			<div className="w-full bg-[#fff8ee] pt-14 pb-10 border-y-4 border-black"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px',
					backgroundColor: seasonColor.main,
				}}>
				<div className="container mx-auto px-6 md:px-12">
					<h1 className="text-6xl font-bold mb-4">
						All Products
					</h1>
					<ContactButton
						onClick={handleContactClick}
						text="Get Catalog →"
						bgColor="bg-[#39FF14]"
						hoverBgColor="hover:bg-[#00FFFF]"
						textColor="text-black"
						hoverTextColor="hover:text-black"
						className="text-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
					/>
				</div>
			</div>

			<div className="container mx-auto px-6 md:px-12 mt-8">
				<SelectorRow
					sortOption={sortOption}
					stockFilter={stockFilter}
					gridSize={gridSize}
					onSortChange={handleSortChange}
				/>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				<div className="flex flex-wrap justify-start gap-4 mb-8">
					{seasons.map((season) => (
						<button
							key={season}
							onClick={() => handleSeasonClick(season)}
							className={`px-6 py-2 rounded-full font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${selectedSeason === season
									? 'bg-[#ED1C24] text-white'
									: 'bg-gray-300 text-black hover:bg-gray-400'
								}`}
						>
							{season}
						</button>
					))}
				</div>

				<div className={`grid gap-4 grid-cols-${gridSize}`}>
					{filteredAndSortedProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							seasonColor={seasonColor}
							onContactClick={handleContactClick}
						/>
					))}
				</div>
			</div>

			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
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