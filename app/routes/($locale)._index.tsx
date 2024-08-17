// app/routes/($locale)._index.tsx

import { useState, useEffect } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment, RecommendedProductsQuery } from 'storefrontapi.generated';
import { FEATURED_COLLECTION_QUERY, RECOMMENDED_PRODUCTS_QUERY, CHRISTMAS_COLLECTION_QUERY } from '../graphql/queries';
// ui
import Logos from '../components/ui/Logos';
import Button from '../components/ui/Button';
import Blurbs from '../components/ui/Blurbs';
import Eyebrow from '../components/ui/Eyebrow';
// holiday
import HolidaySection from '~/components/holidays/HolidaySection';
import HolidayWheel from '~/components/holidays/HolidayWheel';
// import HolidaySection, { loader as holidayLoader } from '~/components/holidays/HolidaySection';

// import { Button } from 'flowbite-react';


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


// ----------------------------------------------


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


// export async function loader(args: LoaderFunctionArgs) {
// 	const deferredData = loadDeferredData(args);
// 	const criticalData = await loadCriticalData(args);
// 	const christmasCollection = await loadChristmasCollection(args);
// 	// const holidayData = await holidayLoader(args);

// 	return defer({
// 		...deferredData,
// 		...criticalData,
// 		christmasCollection,
// 		// ...christmasCollection,
// 		// ...holidayData,
// 	});
// }



async function loadCriticalData({ context }: LoaderFunctionArgs) {
	const { collections } = await context.storefront.query(FEATURED_COLLECTION_QUERY);
	return {
		featuredCollection: collections.nodes[0],
	};
}

async function loadChristmasCollection({ context }: LoaderFunctionArgs) {
	const { collections } = await context.storefront.query(CHRISTMAS_COLLECTION_QUERY);
	return {
		christmasCollection: collections.nodes[0],
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

const blurbsData = [
	{
		imgSrc: "/assets/graphics/choco-gradient.svg",
		altText: "Buyback guarantee",
		text: "Buyback guarantee for all bulk purchases up to 1 month of shelf life",
		highlight: "Buyback guarantee",
	},
	{
		imgSrc: "/assets/graphics/choco-grad-2.svg",
		altText: "Promotional Support",
		text: "Promotional support to boost your holiday sales and engage customers",
		highlight: "Promotional support",
	},
	{
		imgSrc: "/assets/graphics/choco-gradient.svg",
		altText: "Custom Terms",
		text: "Flexible Terms tailored to meet the unique needs of your business",
		highlight: "Flexible Terms",
	},
];


export default function Homepage() {
	const [currentImage, setCurrentImage] = useState(0);


	const data = useLoaderData<typeof loader>();

	return (
		<main className="">
			<div className='container mx-auto'>
			<section className="p-6 sm:p-8 md:p-12 md-max:p-4 ">
				<div className="w-full banner-img">
					
					<div className=" mb-4 flex flex-col md-wax:w-full">

						<h1 className='text-7xl font-semibold  md-max:mt-0 md-max:mb-2 md-max:leading-tight sm-max:text-3xl sm-max:mt-5'>SWEET HOLIDAYS, ALL YEAR LONG</h1>
						<p className='text-2xl md-max:text-xl'>
							We wholesale and retail wholesome holiday treats. Trusted by leading supermarket chains.
						</p>
					</div>

					<div className="flex gap-6 mt-16 md-max:mt-8 sm-max:block">
						<Link
							to={`/contact`}
							className="text-xl font-semibold px-12 py-2 border-2 border-black 

											shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
											transition-all duration-200
											flex items-center justify-center hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"

						>
							Talk Business
						</Link>
						<div className='sm--max:w-full text-center'>
						<Button type="secondary"  onClick={() => window.location.href = "/collections/all"}>Shop all →</Button>
						</div>
					</div>

				</div>

					<div className='p-4 my-6 border-2 border-black rounded-full bg-white mt-48 sm-max:mt-4 md-max:rounded-xl sm-max:mt-0'>
						<Logos logos={logos} />
					</div>
			</section>
			</div>
			<hr className='mobile-hr'style={{ marginBottom: '3em' }} />

			<RecommendedProducts products={data.recommendedProducts} />


			<hr />
			<div className='container mx-auto md-max:mt-6 md-max:p-3.5'>
			<section>
				<div className="flex items-center gap-4">
					<h2 className=''>Treats & Sweets for Every Season</h2>
				</div>
			</section>
			</div>
			{/* New HolidaySection component */}
			<HolidaySection holidayCollections={data.holidayCollections} />

			{/* New HolidayWheel component */}
			<HolidayWheel />

			{/* Commented out old sections */}
			{/* <HolidaySection /> */}
			{/* <HolidaySection christmasCollection={data.christmasCollection} /> */}

			{/* <section>
        <h2>Christmas Collection test</h2>
        <ChristmasCollection collection={data.christmasCollection} />
      </section> */}

			<hr />
			<div className='container mx-auto md-max:p-3.5'>
			<h1>Benefits</h1>
			<Blurbs blurbs={blurbsData} />
			</div>
		</main>
	);
}

function FeaturedCollection({ collection }: { collection: FeaturedCollectionFragment }) {
	if (!collection) return null;
	const image = collection?.image;
	return (
		<Link className="featured-collection" to={`/collections/${collection.handle}`}>
			{image && (
				<div className="featured-collection-image">
					<Image data={image} sizes="100vw" />
				</div>
			)}
			<h1>{collection.title}</h1>
		</Link>
	);
}

function RecommendedProducts({ products }: { products: Promise<RecommendedProductsQuery | null> }) {
	return (
		<div className="recommended-products md-max:p-3.5">
			<div className='container mx-auto'>
			<div className='mobile-view 'style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<h2>Gift packs</h2>
				<p>Make someone's day sweeter</p>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={products}>
					{(response) => (
						<div className="recommended-products-grid">
							{response
								? response.products.nodes.map((product) => (
									<Link key={product.id} className="recommended-product sm-max:text-center" to={`/products/${product.handle}`}>
										<Image data={product.images.nodes[0]} aspectRatio="1/1" sizes="(min-width: 45em) 20vw, 50vw" />
										<h4>{product.title}</h4>
										<small>
											<Money data={product.priceRange.minVariantPrice} />
										</small>
									</Link>
								))
								: null}
						</div>
					)}
				</Await>
			</Suspense>
			<br />
			</div>
		</div>
	);
}

function ChristmasCollection({ collection }: { collection: FeaturedCollectionFragment }) {
	if (!collection) return null;
	return (
		<section className="christmas-section">
			<h2>Christmas treats B2B</h2>
			<div className="products-grid">
				{collection.products.nodes.map((product) => (
					<Link key={product.id} className="recommended-product" to={`/products/${product.handle}`}>
						<Image data={product.images.nodes[0]} aspectRatio="1/1" sizes="(min-width: 45em) 20vw, 50vw" />
						<h4>{product.title}</h4>
						<small>
							<Money data={product.priceRange.minVariantPrice} />
						</small>
					</Link>
				))}
			</div>
			<button className="secondary-button">See Category</button>
		</section>
	);
}
