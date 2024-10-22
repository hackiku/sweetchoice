// app/routes/($locale).collections.all.tsx

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

import Card from '~/components/ecom/product/Card';
import SelectorRow from '~/components/ecom/SelectorRow';
import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

const INITIAL_LOAD = 8;
const LOAD_MORE_COUNT = 8;

export const meta: MetaFunction = () => {
	return [{ title: `SweetChoice | All Products` }];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
	const { storefront } = context;
	const { products } = await storefront.query(PRODUCTS_QUERY, {
		variables: { first: 150 },
	});

	return json({ products });
}

export default function AllProducts() {
	const { products } = useLoaderData<typeof loader>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [gridSize, setGridSize] = useState(4);
	const [sortOption, setSortOption] = useState('manual');
	const [stockFilter, setStockFilter] = useState('all');
	const [visibleProductCount, setVisibleProductCount] = useState(INITIAL_LOAD);

	const handleContactClick = () => {
		setIsModalOpen(true);
	};

	const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'sort_by') setSortOption(value);
		else if (name === 'stock_filter') setStockFilter(value);
		else if (name === 'grid_size') setGridSize(Number(value));
	}, []);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width < 640) setGridSize(2);
			else if (width < 768) setGridSize(3);
			else if (width < 1024) setGridSize(4);
			else if (width < 1280) setGridSize(5);
			else setGridSize(6);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const filteredAndSortedProducts = useMemo(() => {
		let filteredProducts = products.nodes;

		if (stockFilter === 'in-stock') {
			filteredProducts = filteredProducts.filter(product =>
				product.variants.nodes.some(variant => variant.availableForSale)
			);
		} else if (stockFilter === 'out-of-stock') {
			filteredProducts = filteredProducts.filter(product =>
				product.variants.nodes.every(variant => !variant.availableForSale)
			);
		}

		switch (sortOption) {
			case 'title-ascending':
				return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
			case 'title-descending':
				return filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
			case 'price-ascending':
				return filteredProducts.sort((a, b) =>
					parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
				);
			case 'price-descending':
				return filteredProducts.sort((a, b) =>
					parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
				);
			case 'created-ascending':
				return filteredProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
			case 'created-descending':
				return filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			default:
				return filteredProducts;
		}
	}, [products.nodes, sortOption, stockFilter]);

	const visibleProducts = filteredAndSortedProducts.slice(0, visibleProductCount);

	const handleShowMore = () => {
		setVisibleProductCount(prevCount => Math.min(prevCount + LOAD_MORE_COUNT, filteredAndSortedProducts.length));
	};

	const handleShowLess = () => {
		setVisibleProductCount(INITIAL_LOAD);
	};

	return (
		<div className="w-full">
			<div className="w-full bg-[#D8B3F8] pt-14 pb-10 border-y-4 border-black"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}>
				<div className="container mx-auto px-6 md:px-12">
					<span className="inline-block  bg-black text-white text-2xl font-bold py-2 px-4 transform -rotate-2 uppercase whitespace-normal max-w-max mb-4"
						style={{
							boxShadow: '4px 4px 0px 0px rgba(255,255,255,1)',
						}}>
						Products
					</span>

					<h1 className="text-[8vw] mt-2 sm:text-[6vw] md:text-[5vw] font-bold leading-tight text-orange-400"
						style={{
							WebkitTextStroke: '3px black',
							textStroke: '3px black',
							textShadow: '-0.1em 0.12em 0 #000',
							filter: 'drop-shadow(0 0 1px black)'
						}}>
						<span className="block">All Products</span>
						<span className="block ml-8">All Seasons</span>
						<span className="block ml-16">All Year Long</span>
					</h1>

					<ContactButton
						onClick={handleContactClick}
						text="Get Catalog →"
						bgColor="bg-[#39FF14]"
						hoverBgColor="hover:bg-[#00FFFF]"
						textColor="text-black"
						hoverTextColor="hover:text-black"
						className="text-xl font-bold mt-4"
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

				<div className="border-t-4 border-black my-8"></div>

				<div
					className="grid gap-4"
					style={{
						gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
					}}
				>
					{visibleProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onContactClick={handleContactClick}
						/>
					))}
				</div>

				<div className="flex justify-center mt-8">
					{visibleProductCount < filteredAndSortedProducts.length ? (
						<button
							onClick={handleShowMore}
							className="px-6 py-2 text-xl font-bold border-4 border-black bg-[#D8B3F8] text-black 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                         hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                         transition-all duration-200"
						>
							Show More ↓
						</button>
					) : visibleProductCount > INITIAL_LOAD && (
						<button
							onClick={handleShowLess}
							className="px-6 py-2 text-xl font-bold border-4 border-black bg-[#D8B3F8] text-black 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                         hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                         transition-all duration-200"
						>
							Show Less ↑
						</button>
					)}
				</div>
			</div>

			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
}

function ProductCard({ product, onContactClick }: { product: ProductItemFragment, onContactClick: () => void }) {
	const variant = product.variants.nodes[0];
	const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);

	return (
		<Card
			productName={product.title}
			productLink={variantUrl}
			imageUrl={product.featuredImage?.url || ''}
			imageAlt={product.featuredImage?.altText || product.title}
			weight={variant.weight || 0}
			weightUnit={variant.weightUnit || 'g'}
			boxQuantity={10}
			onContactClick={onContactClick}
		/>
	);
}

const PRODUCTS_QUERY = `#graphql
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
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    createdAt
  }
  query ProductsPage($first: Int!) {
    products(first: $first) {
      nodes {
        ...ProductItem
      }
    }
  }
` as const;