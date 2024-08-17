// app/routes/($locale)._index.tsx

import React, { useState, useEffect, useRef } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment, RecommendedProductsQuery } from 'storefrontapi.generated';
import { FEATURED_COLLECTION_QUERY, RECOMMENDED_PRODUCTS_QUERY, CHRISTMAS_COLLECTION_QUERY } from '../graphql/queries';
import Logos from '../components/ui/Logos';
import Button from '../components/ui/Button';
import HolidaySection from '~/components/holidays/HolidaySection';
import HolidayWheel from '~/components/holidays/HolidayWheel';

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
			<section className="min-h-screen flex flex-col justify-start p-6 sm:p-8 md:p-12 pt-16">
				<div className="flex-grow flex flex-col justify-start">
					<div className="md:w-4/5 mb-8">
						<h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold leading-tight mb-4">
							<span className="block">SWEET HOLIDAYS</span>
							<span className="block">ALL YEAR LONG</span>
						</h1>
						<p className="text-xl sm:text-2xl">
							We wholesale and retail wholesome holiday treats. Trusted by leading supermarket chains.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 mb-12">
						<Link
							to="/contact"
							className="text-xl font-semibold px-6 py-2 border-2 border-black bg-[#AE7AFF] hover:bg-[#d71e97]
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
                        transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
						>
							Get a Quote →
						</Link>
						<Button
							type="secondary"
							onClick={() => window.location.href = "/collections/all"}
							className="w-full sm:w-auto"
						>
							Shop all →
						</Button>
					</div>
				</div>

				<div className="mt-auto mb-4">
					<div className="p-4 border-2 border-black rounded-full bg-white">
						<Logos logos={logos} />
					</div>
				</div>
			</section>

			<div className="fancy-divider border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

			<section ref={treatsSection} className="px-6 sm:px-8 md:px-12 mb-12">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Treats & Sweets for Every Season</h2>
				<RecommendedProducts products={data.recommendedProducts} />
			</section>

			<HolidaySection holidayCollections={data.holidayCollections} />

			{isHolidaySelectorVisible && (
				<div className="fixed bottom-4 left-0 right-0 z-10 px-6 sm:px-8 md:px-12 flex justify-between items-center">
					<HolidayWheel />
					<Link
						to="/contact"
						className="ml-4 px-4 py-2 bg-[#AE7AFF] text-white font-semibold rounded-full sm:rounded-lg 
                       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                       transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
					>
						<span className="hidden sm:inline">Contact</span>
						<span className="sm:hidden">👋</span>
					</Link>
				</div>
			)}

			<div className="fancy-divider border-t-4 border-black my-8 mx-6 sm:mx-8 md:px-12"></div>

			<section ref={blurbsSection} className="px-6 sm:px-8 md:px-12 mb-12">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Sweetchoice by the Numbers</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 border-4 border-black bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						<h3 className="text-6xl font-bold mb-2">10+</h3>
						<h4 className="text-xl font-semibold">Years sweetening holidays across Europe</h4>
					</div>
					<div className="p-6 border-4 border-black bg-[#FF69B4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						<h3 className="text-6xl font-bold mb-2">100+</h3>
						<h4 className="text-xl font-semibold">B2B partners trusting our sweet offerings</h4>
					</div>
					<div className="p-6 border-4 border-black bg-[#00CED1] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						<h3 className="text-6xl font-bold mb-2">1M+</h3>
						<h4 className="text-xl font-semibold">Smiles delivered through our holiday treats</h4>
					</div>
				</div>
			</section>
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