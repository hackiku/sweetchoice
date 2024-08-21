// app/routes/($locale).collections.all.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables, Money } from '@shopify/hydrogen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

import ProductCard from '~/components/ecom/product/ProductCard';
import ProductCardMini from '~/components/ecom/product/ProductCardMini';
import ProductCardWholesale from '~/components/ecom/product/ProductCardWholesale';
import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

const seasonColors = {
	default: { main: '#FFF59F', secondary: '#A6FAFF' },
};

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

export default function Collection() {
	const { products } = useLoaderData<typeof loader>();
	const [sortOption, setSortOption] = useState('manual');
	const [stockFilter, setStockFilter] = useState('all');
	const [gridSize, setGridSize] = useState(4);
	const [cardType, setCardType] = useState('all');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [visibleProducts, setVisibleProducts] = useState({
		all: 8,
		shop: 4,
		wholesale: 4,
		mini: 4,
	});

	const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'sort_by') setSortOption(value);
		else if (name === 'stock_filter') setStockFilter(value);
		else if (name === 'grid_size') setGridSize(Number(value));
		else if (name === 'card_type') setCardType(value);
	}, []);

	const filteredAndSortedProducts = useMemo(() => {
		if (!products.nodes) return [];
		let filteredProducts = [...products.nodes];

		if (stockFilter === 'in-stock') {
			filteredProducts = filteredProducts.filter(product => product.variants.nodes.some(variant => variant.availableForSale));
		} else if (stockFilter === 'out-of-stock') {
			filteredProducts = filteredProducts.filter(product => product.variants.nodes.every(variant => !variant.availableForSale));
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
	}, [products.nodes, sortOption, stockFilter]);

	const seasonColor = seasonColors.default;

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	const handleShowMore = (section: keyof typeof visibleProducts) => {
		setVisibleProducts(prev => ({
			...prev,
			[section]: prev[section] + 4
		}));
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

				<select
					name="card_type"
					value={cardType}
					onChange={handleSortChange}
					className="border-4 border-black p-2 font-bold bg-yellow-300 cursor-pointer transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
				>
					<option value="all">All Cards</option>
					<option value="shop">Shop Cards</option>
					<option value="wholesale">Wholesale Cards</option>
					<option value="mini">Mini Cards</option>
				</select>
			</div>

			<div className="container mx-auto px-6 md:px-12 mt-8">
				{(cardType === 'all' || cardType === 'shop') && (
					<>
						<h2 className="text-3xl font-bold mb-4">Shop Products</h2>
						<div className={`grid gap-4 grid-cols-${gridSize}`}>
							{filteredAndSortedProducts.slice(0, visibleProducts.shop).map((product) => (
								<ProductCard
									key={product.id}
									productName={product.title}
									productLink={useVariantUrl(product.handle, product.variants.nodes[0].selectedOptions)}
									product_id={product.id}
									imageUrl={product.featuredImage?.url || ''}
									imageAlt={product.featuredImage?.altText || product.title}
									price={<Money data={product.priceRange.minVariantPrice} />}
									weight={`${Math.floor(Math.random() * 500 + 50)}g`}
								/>
							))}
						</div>
						{visibleProducts.shop < filteredAndSortedProducts.length && (
							<button
								onClick={() => handleShowMore('shop')}
								className="mt-4 border-4 border-black p-2 font-bold bg-purple-300 transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
							>
								Show More
							</button>
						)}
						<hr className="my-8 border-t-4 border-black" />
					</>
				)}

				{(cardType === 'all' || cardType === 'wholesale') && (
					<>
						<h2 className="text-3xl font-bold mb-4">Wholesale Products</h2>
						<div className={`grid gap-4 grid-cols-${gridSize}`}>
							{filteredAndSortedProducts.slice(0, visibleProducts.wholesale).map((product) => (
								<ProductCardWholesale
									key={product.id}
									productName={product.title}
									product_id={product.id}
									productLink={useVariantUrl(product.handle, product.variants.nodes[0].selectedOptions)}
									imageUrl={product.featuredImage?.url || ''}
									imageAlt={product.featuredImage?.altText || product.title}
									price={<Money data={product.priceRange.minVariantPrice} />}
									weight={`${Math.floor(Math.random() * 500 + 50)}g`}
									tags={['Wholesale', 'Bulk']}
								/>
							))}
						</div>
						{visibleProducts.wholesale < filteredAndSortedProducts.length && (
							<button
								onClick={() => handleShowMore('wholesale')}
								className="mt-4 border-4 border-black p-2 font-bold bg-purple-300 transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
							>
								Show More
							</button>
						)}
						<hr className="my-8 border-t-4 border-black" />
					</>
				)}

				{(cardType === 'all' || cardType === 'mini') && (
					<>
						<h2 className="text-3xl font-bold mb-4">Mini Products</h2>
						<div className={`grid gap-4 grid-cols-${gridSize}`}>
							{filteredAndSortedProducts.slice(0, visibleProducts.mini).map((product) => (
								<ProductCardMini
									key={product.id}
									productName={product.title}
									productLink={useVariantUrl(product.handle, product.variants.nodes[0].selectedOptions)}
									weight={`${Math.floor(Math.random() * 500 + 50)}g`}
									imageBgColor={`hsl(${Math.random() * 360}, 80%, 90%)`}
								/>
							))}
						</div>
						{visibleProducts.mini < filteredAndSortedProducts.length && (
							<button
								onClick={() => handleShowMore('mini')}
								className="mt-4 border-4 border-black p-2 font-bold bg-purple-300 transform hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(237,28,36,1)]"
							>
								Show More
							</button>
						)}
					</>
				)}
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