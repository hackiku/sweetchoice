// app/routes/($locale)._index.tsx

import React, { useState, useEffect, useRef } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment, RecommendedProductsQuery } from 'storefrontapi.generated';
import { FEATURED_COLLECTION_QUERY, RECOMMENDED_PRODUCTS_QUERY, CHRISTMAS_COLLECTION_QUERY } from '../graphql/queries';
import Hero from '~/components/ui/Hero';

import Button from '../components/ui/Button';

import HolidaySection from '~/components/holidays/HolidaySection';
import HolidayWheel from '~/components/holidays/HolidayWheel';
import ProductCard from '~/components/ecom/ProductCard';

export const meta: MetaFunction = () => {
	return [{ title: 'Sweetchoice | Home' }];
};

const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: 4) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function loader(args: LoaderFunctionArgs) {
	const { context } = args;
	const { storefront } = context;

	const holidayCollections = await Promise.all(
		['christmas', 'valentines', 'easter', 'halloween'].map(async (handle) => {
			const { collection } = await storefront.query(COLLECTION_QUERY, {
				variables: { handle },
			});
			return { [handle]: collection };
		})
	);

	const holidayCollectionsData = Object.assign({}, ...holidayCollections);

	const criticalData = await loadCriticalData(args);
	const deferredData = loadDeferredData(args);

	return defer({
		...criticalData,
		...deferredData,
		holidayCollections: holidayCollectionsData,
	});
}

async function loadCriticalData({ context }: LoaderFunctionArgs) {
	const { collections } = await context.storefront.query(FEATURED_COLLECTION_QUERY);
	return {
		featuredCollection: collections.nodes[0],
	};
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
	const recommendedProducts = context.storefront
		.query(RECOMMENDED_PRODUCTS_QUERY)
		.catch((error) => {
			console.error(error);
			return null;
		});

	return {
		recommendedProducts,
	};
}

const logos = [
	{ src: "/assets/logos/maxi-logo.svg", alt: "Maxi logo" },
	{ src: "/assets/logos/dis-logo.png", alt: "DIS logo", style: { height: '20px' } },
	{ src: "/assets/logos/idea-logo.svg", alt: "Idea logo" },
	{ src: "/assets/logos/univerexport-logo.svg", alt: "Univerexport logo" },
	{ src: "/assets/logos/tempo-logo.svg", alt: "Tempo logo" },
	{ src: "/assets/logos/aroma-logo.svg", alt: "Aroma logo" },
];

// Dummy data for ProductCard
const dummyProducts = [
	{ id: '1', title: 'Gift Pack 1', handle: 'gift-pack-1', price: '29.99', weight: '500g' },
	{ id: '2', title: 'Gift Pack 2', handle: 'gift-pack-2', price: '39.99', weight: '750g' },
	{ id: '3', title: 'Gift Pack 3', handle: 'gift-pack-3', price: '49.99', weight: '1kg' },
	{ id: '4', title: 'Gift Pack 4', handle: 'gift-pack-4', price: '59.99', weight: '1.2kg' },
];

export default function Homepage() {
	const data = useLoaderData<typeof loader>();
	const [isHolidaySelectorVisible, setIsHolidaySelectorVisible] = useState(false);
	const treatsSection = useRef(null);
	const blurbsSection = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (treatsSection.current && blurbsSection.current) {
				const treatsRect = treatsSection.current.getBoundingClientRect();
				const blurbsRect = blurbsSection.current.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				setIsHolidaySelectorVisible(
					treatsRect.top <= windowHeight && blurbsRect.top > windowHeight
				);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<main className="overflow-x-hidden">			
		
		{/* Hero Section */}
			<Hero
				title="SWEET HOLIDAYS ALL YEAR LONG"
				subtitle="We wholesale and retail wholesome holiday treats. Trusted by leading supermarket chains."
				ctaText="Get a Quote →"
				ctaLink="/contact"
				secondaryButtonText="Shop all →"
				secondaryButtonLink="/collections/all"
				logos={logos}
			/>

			<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

			{/* Treats & Sweets Section */}
			<section ref={treatsSection} className="px-6 sm:px-8 md:px-12 mb-12">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Treats & Sweets for Every Season</h2>
				<RecommendedProducts products={data.recommendedProducts} />
			</section>

			{/* Holiday Section */}
			<HolidaySection holidayCollections={data.holidayCollections} />

			{isHolidaySelectorVisible && (
				<div className="fixed bottom-4 left-0 right-0 z-10 px-6 sm:px-8 md:px-12 flex justify-between items-center">
					<HolidayWheel />
					<Link
						to="/contact"
						className="ml-4 px-4 py-2 bg-[#AE7AFF] text-black font-semibold rounded-full sm:rounded-lg 
                       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                       transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
					>
						Contact Us
					</Link>
				</div>
			)}

			<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:px-12"></div>

			{/* Blurbs Section */}
			<section ref={blurbsSection} className="px-6 sm:px-8 md:px-12 mb-12">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Sweetchoice by the Numbers</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<Link
						to="/about"
						className="p-6 border-4 border-black bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                       hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                       transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1"
					>
						<h3 className="text-6xl font-bold mb-2">10+</h3>
						<h4 className="text-xl font-semibold">Years sweetening holidays across Europe</h4>
					</Link>
					<Link
						to="/about"
						className="p-6 border-4 border-black bg-[#FF69B4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                       hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                       transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1"
					>
						<h3 className="text-6xl font-bold mb-2">100+</h3>
						<h4 className="text-xl font-semibold">B2B partners trusting our sweet offerings</h4>
					</Link>
					<Link
						to="/about"
						className="p-6 border-4 border-black bg-[#00CED1] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                       hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                       transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1"
					>
						<h3 className="text-6xl font-bold mb-2">1M+</h3>
						<h4 className="text-xl font-semibold">Smiles delivered through our holiday treats</h4>
					</Link>
				</div>
			</section>

			<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:px-12"></div>
		</main>
	);
}

function RecommendedProducts({ products }: { products: Promise<RecommendedProductsQuery | null> }) {
	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-8">
				<h3 className="text-2xl font-bold mb-2 sm:mb-0">Gift packs</h3>
				<p className="text-lg text-gray-600">Make someone's day sweeter</p>
			</div>
			<Suspense fallback={<div className="text-center py-10">Loading...</div>}>
				<Await resolve={products}>
					{(response) => (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{response
								? response.products.nodes.map((product) => (
									<Link
										key={product.id}
										className="group block border-2 border-black p-4 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
										to={`/products/${product.handle}`}
									>
										<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
											<Image
												data={product.images.nodes[0]}
												className="w-full h-full object-center object-cover group-hover:opacity-75"
												sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
											/>
										</div>
										<h4 className="text-lg font-semibold mb-2">{product.title}</h4>
										<p className="text-base font-bold">
											<Money data={product.priceRange.minVariantPrice} />
										</p>
									</Link>
								))
								: null}
						</div>
					)}
				</Await>
			</Suspense>
		</div>
	);
}