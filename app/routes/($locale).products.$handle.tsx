// app/routes/($locale).products.$handle.tsx
//
// This file contains the Product page component for the SweetChoice e-commerce website.
// It implements a neo-brutalist design style consistent with the rest of the site.
// The page displays product details, variant selection, and add-to-cart functionality.
//
// Key features:
// - Responsive layout with improved mobile design
// - Dynamic product information loading
// - Order quantity selector
// - Variant selection with visual feedback
// - Add to catalog functionality with analytics
// - Bold typography and high-contrast design elements
// - Special pricing display for B2B products

import { Suspense, useState } from 'react';
import { defer, redirect, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import {
	Await,
	Link,
	useLoaderData,
	type MetaFunction,
	type FetcherWithComponents,
} from '@remix-run/react';
import type {
	ProductFragment,
	ProductVariantsQuery,
	ProductVariantFragment,
} from 'storefrontapi.generated';
import {
	Image,
	Money,
	VariantSelector,
	type VariantOption,
	getSelectedProductOptions,
	CartForm,
	type OptimisticCartLine,
	Analytics,
	type CartViewPayload,
	useAnalytics,
} from '@shopify/hydrogen';
import type { SelectedOption } from '@shopify/hydrogen/storefront-api-types';
import { getVariantUrl } from '~/lib/variants';
import { useAside } from '~/components/Aside';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: `SweetChoice | ${data?.product.title ?? ''}` }];
};

export async function loader(args: LoaderFunctionArgs) {
	const { params, context, request } = args;
	const { handle } = params;
	const { storefront } = context;

	const selectedOptions = getSelectedProductOptions(request);

	if (!handle) {
		throw new Error('Expected product handle to be defined');
	}

	const { product } = await storefront.query(PRODUCT_QUERY, {
		variables: { handle, selectedOptions },
	});

	if (!product?.id) {
		throw new Response(null, { status: 404 });
	}

	const variants = storefront.query(VARIANTS_QUERY, {
		variables: { handle },
	});

	return defer({
		product,
		variants,
	});
}

export default function Product() {
	const { product, variants } = useLoaderData<typeof loader>();
	const { selectedVariant } = product;

	return (
		<div className="pt-12 border-t-4 border-black bg-indigo-200 bg-opacity-70">
			<div className="mx-auto px-4 md:px-28">
				<div className="md:grid md:grid-cols-2 md:gap-12 md:gap-24">
					<div className="mb-8 md:mb-0">
						<h1 className="text-5xl md:text-3xl font-bold md:hidden mb-12">{product.title}</h1>
					
						<ProductImage image={selectedVariant?.image} />
					</div>
					<div>
						<h1 className="text-4xl md:text-5xl font-bold hidden md:block">{product.title}</h1>
						<div className="border-t-4 border-black my-8"></div>
						<ProductWeight product={product} selectedVariant={selectedVariant} />
						<ProductPrice selectedVariant={selectedVariant} isB2B={product.productType === 'B2B'} />
						<Suspense fallback={<div>Loading variants...</div>}>
							<Await resolve={variants}>
								{(data) => (
									<ProductForm
										product={product}
										selectedVariant={selectedVariant}
										variants={data?.product?.variants.nodes || []}
									/>
								)}
							</Await>
						</Suspense>
						
						<div className="border-t-4 border-black my-8"></div>


						<div className="mt-8">
							<h2 className="text-2xl font-bold mb-2">Description</h2>
							<div
								dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
								className="prose prose-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ProductImage({ image }: { image: ProductVariantFragment['image'] }) {
	if (!image) {
		return (
			<div className="product-image bg-[#FFF9E5] border-4 border-black aspect-square flex items-center justify-center">
				<span className="text-2xl font-bold">No Image Available</span>
			</div>
		);
	}
	return (
		<div className="product-image border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF9E5] aspect-square overflow-hidden">
			<Image
				alt={image.altText || 'Product Image'}
				data={image}
				key={image.id}
				sizes="(min-width: 45em) 50vw, 100vw"
				className="w-full h-full object-contain p-4"
			/>
		</div>
	);
}

function ProductWeight({ product, selectedVariant }) {
	const [selectedWeight, setSelectedWeight] = useState('Box');
	const weights = ['Box', 'Pallet', 'Transport'];

	const defaultBoxWeight = 12;
	const defaultPalletWeight = defaultBoxWeight * 48;
	const defaultTransportWeight = defaultPalletWeight * 24;

	const variantWeight = selectedVariant?.weight?.value || defaultBoxWeight;

	const getWeight = (type) => {
		switch (type) {
			case 'Box':
				return variantWeight;
			case 'Pallet':
				return variantWeight * 48;
			case 'Transport':
				return variantWeight * 48 * 24;
			default:
				return variantWeight;
		}
	};

	return (
		<div className="mb-6 bg-opacity-0">
			<div className="flex space-x-2">
				{weights.map((weight) => (
					<button
						key={weight}
						onClick={() => setSelectedWeight(weight)}
						className={`
              px-4 py-2 border-2 border-black text-lg font-bold
              ${selectedWeight === weight
								? 'bg-black text-white'
								: 'bg-white text-black hover:bg-gray-100'
							}
            `}
					>
						{weight}
					</button>
				))}
			</div>
			<p className="mt-4 text-3xl font-bold">
				{getWeight(selectedWeight)} units
			</p>
		</div>
	);
}

function ProductPrice({
	selectedVariant,
	isB2B,
}: {
	selectedVariant: ProductFragment['selectedVariant'];
	isB2B: boolean;
}) {
	if (isB2B) {
		return (
			<div className="product-price text-2xl font-bold mb-6">
				Price upon request
			</div>
		);
	}

	return (
		<div className="product-price text-2xl font-bold mb-6">
			{selectedVariant?.compareAtPrice ? (
				<>
					<span className="text-red-600 mr-2">Sale</span>
					<span className="line-through text-gray-500 mr-2">
						<Money data={selectedVariant.compareAtPrice} />
					</span>
					<span>
						<Money data={selectedVariant.price} />
					</span>
				</>
			) : (
				selectedVariant?.price && <Money data={selectedVariant?.price} />
			)}
		</div>
	);
}

function ProductForm({
	product,
	selectedVariant,
	variants,
}: {
	product: ProductFragment;
	selectedVariant: ProductFragment['selectedVariant'];
	variants: Array<ProductVariantFragment>;
}) {
	const { open } = useAside();
	const { publish, shop, cart, prevCart } = useAnalytics();

	return (
		<div className="product-form">
			<VariantSelector
				handle={product.handle}
				options={product.options}
				variants={variants}
			>
				{({ option }) => (
					<ProductOptions key={option.name} option={option} />
				)}
			</VariantSelector>

			<div className="mt-6">
				<AddToCartButton
					disabled={!selectedVariant || !selectedVariant.availableForSale}
					onClick={() => {
						open('cart');
						publish('cart_viewed', {
							cart,
							prevCart,
							shop,
							url: window.location.href || '',
						} as CartViewPayload);
					}}
					lines={
						selectedVariant
							? [
								{
									merchandiseId: selectedVariant.id,
									quantity: 1,
									selectedVariant,
								},
							]
							: []
					}
				>
					{selectedVariant?.availableForSale ? '+ Add to catalog' : 'Sold out'}
				</AddToCartButton>
			</div>
		</div>
	);
}

function ProductOptions({ option }: { option: VariantOption }) {
	return (
		<div className="product-options mb-4" key={option.name}>
			<h3 className="text-lg font-bold mb-2">{option.name}</h3>
			<div className="flex flex-wrap gap-2">
				{option.values.map(({ value, isAvailable, isActive, to }) => {
					return (
						<Link
							key={option.name + value}
							prefetch="intent"
							preventScrollReset
							replace
							to={to}
							className={`
                px-4 py-2 border-2 border-black text-lg font-bold
                ${isActive
									? 'bg-black text-white'
									: 'bg-white text-black hover:bg-gray-100'
								}
                ${!isAvailable && 'opacity-50 cursor-not-allowed'}
              `}
						>
							{value}
						</Link>
					);
				})}
			</div>
		</div>
	);
}

function AddToCartButton({
	analytics,
	children,
	disabled,
	lines,
	onClick,
}: {
	analytics?: unknown;
	children: React.ReactNode;
	disabled?: boolean;
	lines: Array<OptimisticCartLine>;
	onClick?: () => void;
}) {
	return (
		<CartForm route="/cart" inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
			{(fetcher: FetcherWithComponents<any>) => (
				<>
					<input
						name="analytics"
						type="hidden"
						value={JSON.stringify(analytics)}
					/>
					<button
						type="submit"
						onClick={onClick}
						disabled={disabled ?? fetcher.state !== 'idle'}
						className={`
              w-full py-3 px-6 text-xl font-semibold 
              border-4 border-black
              ${disabled
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-[#FF6B6B] hover:bg-[#FF8787]'
							}
              transition-colors duration-200
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              active:translate-x-[2px]
              active:translate-y-[2px]
            `}
					>
						{children}
					</button>
				</>
			)}
		</CartForm>
	);
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    weight
    weightUnit
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    productType
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariant
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;