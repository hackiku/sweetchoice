// app/routes/($locale).about.tsx
//
// This file contains the About page component for the SweetChoice e-commerce website.
// It includes sections for a hero banner, gallery, company description, product slider,
// map placeholder, statistics, and testimonials.
//
// The page features a gradient background with fading dots, a neo-brutalist design style,
// and a responsive layout for various screen sizes.

import React, { useState } from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';

import GalleryMasonry from '~/components/ui/GalleryMasonry';
import TestimonialSlider from '~/components/ui/TestimonialSlider';

export const meta: MetaFunction = () => {
	return [{ title: `About us | SweetChoice` }];
};

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query recommendedProducts($count: Int = 6) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          nodes {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export async function loader({ context }: LoaderFunctionArgs) {
	const { storefront } = context;
	const recommendedProducts = await storefront.query(RECOMMENDED_PRODUCTS_QUERY);
	return json({ recommendedProducts });
}

export default function About() {
	const { recommendedProducts } = useLoaderData<typeof loader>();
	const [currentProductIndex, setCurrentProductIndex] = useState(0);

	const galleryAssets = [
		{ type: 'video' as const, src: '/assets/tiktok.mp4' },
		{ type: 'image' as const, src: 'https://picsum.photos/800/600' },
		{ type: 'image' as const, src: 'https://picsum.photos/600/800' },
		{ type: 'image' as const, src: 'https://picsum.photos/700/700' },
		{ type: 'video' as const, src: '/assets/tiktok.mp4' },
		{ type: 'image' as const, src: 'https://picsum.photos/900/600' },
	];

	const handlePrevProduct = () => {
		setCurrentProductIndex((prevIndex) =>
			prevIndex === 0 ? recommendedProducts.products.nodes.length - 4 : prevIndex - 1
		);
	};

	const handleNextProduct = () => {
		setCurrentProductIndex((prevIndex) =>
			prevIndex === recommendedProducts.products.nodes.length - 4 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="flex flex-col items-center relative">
			<div className="w-full bg-gradient-to-b from-[#00A86B] to-transparent pt-14 pb-[75vh] absolute top-0 left-0 z-0"
				style={{
					backgroundImage: 'radial-gradient(#000 1px, transparent 1px), linear-gradient(to bottom, #00A86B, transparent)',
					backgroundSize: '20px 20px, 100% 100%',
					backgroundPosition: '0 0, 0 0',
					maskImage: 'linear-gradient(to bottom, black, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
				}}>
			</div>

			<div className="w-full z-10">
				{/* Hero Section */}
				<section className="w-full flex flex-col justify-center px-6 sm:px-8 md:px-12 mb-12 mt-8 border-t-3 border-black">
					<h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-semibold leading-[1.1] mb-4 w-full text-white" style={{ textShadow: '4px 4px 0px #000' }}>
						WE HAVE CANDY <br /> (and you know it)
					</h1>
				</section>

				{/* Gallery Masonry */}
				<section className="w-full mb-16">
					<GalleryMasonry assets={galleryAssets} />
				</section>

				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base mt-4">
						Sweetchoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.
					</p>
					<p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base mt-4">
						You've probably seen our sweets in your local supermarkets and stores around holiday time.
					</p>
				</section>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Recommended Products */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<Suspense fallback={<div>Loading...</div>}>
						<Await resolve={recommendedProducts}>
							{(data) => (
								<>
									<RecommendedProducts
										products={data.products}
										currentIndex={currentProductIndex}
									/>
									<div className="flex flex-row justify-between items-center mt-8">
										<p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base">
											B2B holiday programs for supermarkets and mom & pop stores.
										</p>
										<div className="flex space-x-4">
											<button
												onClick={handlePrevProduct}
												className="w-12 h-12 bg-[#FFA6F6] rounded-full flex items-center justify-center text-2xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200"
											>
												←
											</button>
											<button
												onClick={handleNextProduct}
												className="w-12 h-12 bg-[#A6FAFF] rounded-full flex items-center justify-center text-2xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200"
											>
												→
											</button>
										</div>
									</div>
									<div className="mt-8 text-center">
										<Link
											to="/collections/all"
											className="inline-block px-8 py-3 text-2xl font-semibold border-4 border-black bg-[#ED1C24] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200"
										>
											Products →
										</Link>
									</div>
								</>
							)}
						</Await>
					</Suspense>
				</section>

				{/* Map */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-2xl font-bold border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
						Map of Europe 😵
					</div>
				</section>

				{/* Stat Blurbs */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="p-6 border-4 border-black bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
							hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
							transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
							<h3 className="text-6xl font-black mb-2">2013</h3>
							<h4 className="text-xl font-bold">Year Sweetchoice was founded</h4>
						</div>
						<div className="p-6 border-4 border-black bg-[#FF69B4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
							hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
							transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
							<h3 className="text-6xl font-black mb-2">15+</h3>
							<h4 className="text-xl font-bold">Countries we distribute to</h4>
						</div>
						<div className="p-6 border-4 border-black bg-[#00CED1] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
							hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
							transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
							<h3 className="text-6xl font-black mb-2">200+</h3>
							<h4 className="text-xl font-bold">Unique seasonal products</h4>
						</div>
					</div>
				</section>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">From Our Partners</h2>
					<TestimonialSlider />
				</section>
			</div>
		</div>
	);
}

function RecommendedProducts({ products, currentIndex }: { products: RecommendedProductsQuery['products'], currentIndex: number }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{products.nodes.slice(currentIndex, currentIndex + 4).map((product) => (
				<Link
					key={product.id}
					className="group block border-4 border-black p-4 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-y-1 hover:-translate-x-1"
					to={`/products/${product.handle}`}
				>
					<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden mb-4 border-2 border-black">
						<Image
							data={product.images.nodes[0]}
							className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-200"
							sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
						/>
					</div>
					<h4 className="text-lg font-black mb-2">{product.title}</h4>
					<p className="text-base font-bold">
						<Money data={product.priceRange.minVariantPrice} />
					</p>
				</Link>
			))}
		</div>
	);
}