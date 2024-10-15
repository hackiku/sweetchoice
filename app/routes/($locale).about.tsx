// app/routes/($locale).about.tsx

import React, { useState } from 'react';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, Link } from '@remix-run/react';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';

import GalleryMasonry from '~/components/about/GalleryMasonry';
import EuropeMap from '~/components/about/EuropeMap';
import FounderCEO from '~/components/about/FounderCEO';

import TestimonialSlider from '~/components/ui/TestimonialSlider';
import StatBlurbs from '~/components/ui/StatBlurbs';
import RecommendedProducts from '~/components/ecom/product/RecommendedProducts';

import ContactButton from '~/components/ui/ContactButton';
import ContactModal from '~/components/ui/ContactModal';

export const meta: MetaFunction = () => {
	return [{ title: `About us | SweetChoice` }];
};

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query recommendedProducts($count: Int = 22) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
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
	const [isModalOpen, setIsModalOpen] = useState(false);

	const galleryAssets = [
		{ type: 'video' as const, src: '/assets/tiktok.mp4', width: 1080, height: 1920 },
		{ type: 'image' as const, src: 'https://picsum.photos/800/600', width: 800, height: 600 },
		{ type: 'image' as const, src: 'https://picsum.photos/600/800', width: 600, height: 800 },
		{ type: 'image' as const, src: 'https://picsum.photos/700/700', width: 700, height: 700 },
		{ type: 'video' as const, src: '/assets/tiktok.mp4', width: 1080, height: 1920 },
		{ type: 'image' as const, src: 'https://picsum.photos/900/600', width: 900, height: 600 },
	];

	const handleContactClick = () => {
		setIsModalOpen(true);
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
					<h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-semibold leading-[1.1] mb-4 w-full text-orange-200" style={{ textShadow: '4px 4px 0px #000000' }}>
						WE HAVE CANDY <br /> (and you know it)
					</h1>
				</section>

				{/* Gallery Masonry */}
				<section className="w-full mb-16">
					<GalleryMasonry assets={galleryAssets} />
				</section>

				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base mt-4">
						SweetChoice is the only company in South East Europe specialized in the import and distribution of seasonal confectionery products.
					</p>
					<p className="text-2xl max-w-2xl font-bold leading-tight sm-max:text-base mt-4">
						You've probably seen our sweets in your local supermarkets and stores around holiday time.
					</p>

					<div className="mt-8">
						<ContactButton
							onClick={handleContactClick}
							text="Talk Business →"
							bgColor="bg-orange-400"
							hoverBgColor="hover:bg-black"
							hoverTextColor="hover:text-white"
							className="text-xl"
						/>
					</div>
				</section>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Recommended Products */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">All About Holiday Treats</h2>
					<Suspense fallback={<div>Loading...</div>}>
						<Await resolve={recommendedProducts}>
							{(data) => (
								<RecommendedProducts products={data.products.nodes} />
							)}
						</Await>
					</Suspense>
				</section>

				<div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:mx-12"></div>

				{/* Testimonials */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">From Our Partners</h2>
					<TestimonialSlider />
				</section>

				{/* Stat Blurbs */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">SweetChoice by the Numbers</h2>
					<StatBlurbs />
				</section>

				{/* Map */}
				<section id="map" className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Our Reach</h2>
					<div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-2xl font-bold border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
						<EuropeMap />
					</div>
				</section>

				{/* Founder */}
				<section className="w-full px-6 sm:px-8 md:px-12 mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">Meet Our Founder</h2>
					<FounderCEO />
				</section>

			</div>

			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
}