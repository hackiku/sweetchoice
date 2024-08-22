// app/routes/($locale).products.$handle.tsx

import { Suspense, useState, useRef, useEffect } from 'react';
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
import { RECOMMENDED_PRODUCTS_QUERY } from '~/graphql/recommendedProducts';

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

	const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

	return defer({
		product,
		variants,
		recommendedProducts,
	});
}

export default function Product() {
	const { product, variants, recommendedProducts } = useLoaderData<typeof loader>();
	const { selectedVariant } = product;

	return (
		<div className="pt-[6vw] smd:pt-12 border-y-4 border-black bg-indigo-200 bg-opacity-70">
			<div className="mx-auto px-4 md:px-28">
				<div className="md:grid md:grid-cols-2 md:gap-12 md:gap-28">
					<div className="mb-8 md:mb-0">
						<h1 className="text-5xl md:text-3xl font-bold md:hidden mb-10">{product.title}</h1>
						<ProductImage image={selectedVariant?.image} />
					</div>

					<div className='flex flex-col gap-1ss'>
						<h1 className="text-4xl md:text-5xl font-bold hidden md:block">{product.title}</h1>
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
							{/* <h2 className="text-2xl font-bold mb-2">Description</h2> */}
							<div
								dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
								className="prose prose-lg"
							/>
						</div>
					</div>
				</div>
			</div>


			<div className="mt-16 px-4 pb-12 md:px-28 overflow-none">

				<div className="border-t-4 border-black my-8"></div>
				<h2 className="text-4xl md:5xl font-semibold mb-8">Recommended</h2>
				<Suspense fallback={<div>Loading recommended products...</div>}>
					<Await resolve={recommendedProducts}>
						{(data) => <RecommendedProducts products={data.products} />}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

function ProductImage({ image }: { image: ProductVariantFragment['image'] }) {
	if (!image) {
		return (
			<div className="bg-[#FFF9E5] border-2 border-black aspect-square flex items-center justify-center w-1/3">
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
			<p className="mt-8 text-4xl font-bold">
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








// ------------- QUERIES -------------



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



function RecommendedProducts({ products }) {
	const scrollRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
				setShowLeftArrow(scrollLeft > 0);
				setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
			}
		};

		if (scrollRef.current) {
			scrollRef.current.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	const scroll = (direction) => {
		if (scrollRef.current) {
			const { clientWidth } = scrollRef.current;
			scrollRef.current.scrollBy({ left: direction * clientWidth, behavior: 'smooth' });
		}
	};

	const handleMouseDown = (e) => {
		setIsDragging(true);
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
	};

	const handleMouseLeave = () => {
		setIsDragging(false);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * 2; // Adjust scrolling speed
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};

	return (
		<div className="relative">
			<div
				ref={scrollRef}
				className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 md:cursor-grab active:cursor-grabbing"
				style={{ scrollSnapType: 'x mandatory' }}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				{products.nodes.map((product) => (
					<div
						key={product.id}
						className="flex-none w-[calc(50%-8px)] md:w-[calc(25%-12px)] scroll-snap-align-start"
					>
						<Link
							to={`/products/${product.handle}`}
							className="group block border-4 border-black p-4 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
						>
							<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden mb-4 border-2 border-black">
								<Image
									data={product.images.nodes[0]}
									className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-200"
									sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
								/>
							</div>
							<h4 className="text-lg font-bold mb-2">{product.title}</h4>
							<p className="text-base font-bold">
								<Money data={product.priceRange.minVariantPrice} />
							</p>
						</Link>
					</div>
				))}
			</div>
			{showLeftArrow && (
				<button
					onClick={() => scroll(-1)}
					className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border-4 border-black p-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
					aria-label="Scroll left"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>
			)}
			{showRightArrow && (
				<button
					onClick={() => scroll(1)}
					className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border-4 border-black p-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
					aria-label="Scroll right"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			)}
		</div>
	);
}