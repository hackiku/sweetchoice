// app/routes/($locale).about.tsx

import React from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';

import GalleryMasonry from '~/components/ui/GalleryMasonry';
import TestimonialSlider from '~/components/ui/TestimonialSlider';


export const meta: MetaFunction = () => {
	return [{ title: `About us | Sweetchoice` }];
};

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query recommendedProducts($count: Int = 4) {
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

	return json({
		recommendedProducts,
	});
}

export default function About() {
	const { recommendedProducts } = useLoaderData<typeof loader>();

	const galleryAssets = [
		{ type: 'video' as const, src: '/assets/tiktok.mp4' },
		{ type: 'image' as const, src: 'https://picsum.photos/800/600' },
		{ type: 'image' as const, src: 'https://picsum.photos/600/800' },
		{ type: 'image' as const, src: 'https://picsum.photos/700/700' },
		{ type: 'video' as const, src: '/assets/tiktok.mp4' },
		{ type: 'image' as const, src: 'https://picsum.photos/900/600' },
		// Add more assets as needed
	];

	return (
		<div className="flex flex-col items-center">
			{/* Hero Section */}
			<section className="w-full flex flex-col justify-center px-6 sm:px-8 md:px-12 mb-12">
				<h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-semibold leading-[1.1] mb-4 w-full">
					WE HAVE CANDY <br /> (and you know it)
				</h1>
			</section>

			{/* Gallery Masonry */}
			<section className="w-full mb-16">
				<GalleryMasonry assets={galleryAssets} />
			</section>

			<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
				<p className="text-2xl max-w-2xl font-semibold leading-tight sm-max:text-base mt-4">
					Sweetchoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.
				</p>
				<p className="text-2xl max-w-2xl font-semibold leading-tight sm-max:text-base mt-4">
					You've probably seen our sweets in your local supermarkets when the holidays are hot.
				</p>
			</section>

			<hr className="border-t-2 border-black my-8 w-full max-w-[calc(100%-3rem)] sm:max-w-[calc(100%-4rem)] md:max-w-[calc(100%-6rem)]" />

			{/* Recommended Products */}
			<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8">Recommended Products</h2>
				<Suspense fallback={<div>Loading...</div>}>
					<Await resolve={recommendedProducts}>
						{(data) => <RecommendedProducts products={data.products} />}
					</Await>
				</Suspense>

				<div className="flex flex-row justify-between items-center mt-8">
					<p className="text-2xl max-w-2xl font-semibold leading-tight sm-max:text-base">
						B2B holiday programs for supermarkets and mom & pop stores.
					</p>
					<div className="flex space-x-4">
						<button className="w-12 h-12 bg-[#FFA6F6] rounded-full flex items-center justify-center text-2xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">←</button>
						<button className="w-12 h-12 bg-[#A6FAFF] rounded-full flex items-center justify-center text-2xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">→</button>
					</div>
				</div>
			</section>

			
			<hr className="border-t-2 border-black my-8 w-full max-w-[calc(100%-3rem)] sm:max-w-[calc(100%-4rem)] md:max-w-[calc(100%-6rem)]" />


			{/* Map */}
			<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Our Reach</h2>
				<div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-2xl font-bold">
					Map of Europe Placeholder
				</div>
			</section>

			
			
			{/* Stat Blurbs */}
			<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
				{/* <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Sweetchoice by the Numbers</h2> */}
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


			<hr className="border-t-2 border-black my-8 w-full max-w-[calc(100%-3rem)] sm:max-w-[calc(100%-4rem)] md:max-w-[calc(100%-6rem)]" />

			<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
				<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">What Our Partners Say</h2>
				<TestimonialSlider />
			</section>


		</div>
	);
}

function RecommendedProducts({ products }: { products: RecommendedProductsQuery['products'] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{products.nodes.map((product) => (
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
	);
}