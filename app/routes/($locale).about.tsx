// app/routes/($locale).about.tsx
// This file contains the About page component for Sweetchoice
// It includes a hero section, image slider placeholder, recommended products, a map placeholder, and stat blurbs

import React from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';
import { RECOMMENDED_PRODUCTS_QUERY } from '../graphql/queries';

export const meta: MetaFunction = () => {
	return [{ title: `About us | Sweetchoice` }];
};

export async function loader({ context }: LoaderFunctionArgs) {
	const recommendedProducts = context.storefront.query(RECOMMENDED_PRODUCTS_QUERY);

	return json({
		recommendedProducts,
	});
}

export default function About() {
	const { recommendedProducts } = useLoaderData<typeof loader>();

	return (
		<div>
			{/* Hero Section */}
			<section className="flex flex-col justify-center px-6 sm:px-8 md:px-12 mb-2">
				<h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-semibold leading-[1.1] mb-4 w-full">
					WE HAVE CANDY <br /> (and you know it)
				</h1>
			</section>

			{/* Image Slider Placeholder */}
			<section className="relative mb-6">
				{/* TODO: Implement proper fullwidth, auto-scrolling, draggable image slider component */}
				<div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-2xl font-bold">
					Image Slider Placeholder
				</div>
			</section>

			<section className="px-6 sm:px-8 md:px-12 mb-16">
				<p className="text-2xl max-w-2xl leading-tight sm-max:text-base">
					Sweetchoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.
				</p>
			</section>

			{/* Recommended Products Section */}
			<section className="px-6 sm:px-8 md:px-12 mb-16">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Our Products</h2>
				<RecommendedProducts products={recommendedProducts} />
			</section>

			{/* Map Placeholder Section */}
			<section className="px-6 sm:px-8 md:px-12 mb-16">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Our Reach</h2>
				<div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-2xl font-bold">
					Map of Europe Placeholder
				</div>
			</section>

			{/* Stat Blurbs Section */}
			<section className="px-6 sm:px-8 md:px-12 mb-16">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Sweetchoice by the Numbers</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 border-4 border-black bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                        hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                        transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
						<h3 className="text-6xl font-bold mb-2">2013</h3>
						<h4 className="text-xl font-semibold">Year Sweetchoice was founded</h4>
					</div>
					<div className="p-6 border-4 border-black bg-[#FF69B4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                        hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                        transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
						<h3 className="text-6xl font-bold mb-2">15+</h3>
						<h4 className="text-xl font-semibold">Countries we distribute to</h4>
					</div>
					<div className="p-6 border-4 border-black bg-[#00CED1] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                        hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                        transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
						<h3 className="text-6xl font-bold mb-2">200+</h3>
						<h4 className="text-xl font-semibold">Unique seasonal products</h4>
					</div>
				</div>
			</section>
		</div>
	);
}

// RecommendedProducts component
function RecommendedProducts({ products }: { products: Promise<RecommendedProductsQuery | null> }) {
	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<Suspense fallback={<div className="text-center py-10">Loading...</div>}>
				<Await resolve={products}>
					{(response) => (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{response?.products?.nodes.map((product) => (
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
							))}
						</div>
					)}
				</Await>
			</Suspense>
		</div>
	);
}