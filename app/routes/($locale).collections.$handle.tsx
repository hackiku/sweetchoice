import React, { useState, useMemo, useCallback } from 'react';
import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Pagination, getPaginationVariables, Money, Analytics } from '@shopify/hydrogen';
import ProductCard from "~/components/ecom/ProductCard";
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import Logos from '../components/ui/Logos';

// Example logos data (replace with your actual data)
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
  const [sortOption, setSortOption] = useState('manual'); // Default sorting option
  const [stockFilter, setStockFilter] = useState('all'); // Default stock filter

  const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'sort_by') {
      setSortOption(event.target.value);
    } else if (event.target.name === 'stock_filter') {
      setStockFilter(event.target.value);
    }
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (!collection.products) return [];
    let products = [...collection.products.nodes];

    // Apply stock filter
    if (stockFilter === 'in-stock') {
      products = products.filter(product => product.variants.nodes.some(variant => variant.availableForSale));
    } else if (stockFilter === 'out-of-stock') {
      products = products.filter(product => product.variants.nodes.every(variant => !variant.availableForSale));
    }

    // Apply sorting
    switch (sortOption) {
      case 'best-selling':
        // Implement your best-selling logic
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

  return (
    <div className='container mx-auto '>
      <section className="flex flex-col md:flex-row justify-between gap-2 md:gap-44 lg:gap-72 mb-10 mt-14 md-max:px-3">
        <div className="flex items-center space-x-4 w-2/4 sm-max:w-full sm-max:mb-4">
          <a href="/catalog/catalog-sample.pdf" target="_blank" rel="noopener noreferrer" className=" hover:underline text-xl font-semibold px-12 py-2 border-2 border-black 

											shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
											transition-all duration-200
											flex items-center justify-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">Get Catalog →</a>
        </div>
        <p className="">{collection.description}</p>
      </section>

      <section className='flex flex-col md:flex-row items-center gap-4 sm-max:items-start md-max:px-3'>
        <div className='flex items-center gap-4'>
          <h3 className='m-0'>Sort by:</h3>
          <select
            name="sort_by"
            id="SortBy"
            value={sortOption}
            onChange={handleSortChange}
            className="facet-filters__sort select__select caption-large cursor-pointer"
            aria-describedby="a11y-refresh-page-message"
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
        </div>
        <div className='flex items-center gap-4'>
          <h3 className='m-0'>Stock Status:</h3>
          <select
            name="stock_filter"
            id="StockFilter"
            value={stockFilter}
            onChange={handleSortChange}
            className="facet-filters__sort select__select caption-large cursor-pointer"
            aria-describedby="a11y-refresh-page-message"
          >
            <option value="all">All products</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </div>
      </section>

      <hr />
      <Pagination connection={{ ...collection.products, nodes: filteredAndSortedProducts }}>
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

      <Analytics.CollectionView data={{ collection: { id: collection.id, handle: collection.handle } }} />

      <hr />

      <section className='md-max:px-3' >
        <h3>Trusted by leading supermarkets</h3>
        <Logos logos={logos} />
      </section>
    </div>
  );
}

function ProductsGrid({ products }: { products: ProductItemFragment[] }) {
  return (
    <div className="my-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 md-max:px-3">
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
  const product_id = product.id; 
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
      darkImageUrl={imageUrl}
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
