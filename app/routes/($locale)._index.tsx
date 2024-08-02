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
import HolidayWheel from '~/components/holidays/HolidayWheel';
// import SeasonsWheel from '~/components/seasons/SeasonsWheel';
// import HolidaySection, { loader as holidayLoader } from '~/components/holidays/HolidaySection';
import HolidaySection from '~/components/holidays/HolidaySection';
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

const heroAssets = [
	// "/assets/graphics/choco-gradient.svg",
	"/assets/animations/frame1.png",
	"/assets/animations/frame2.png",
	"/assets/animations/frame3.png",
	"/assets/animations/frame4.png",
	"/assets/santa-eaten.png",
	// "/assets/graphics/choco-grad-2.svg",
];

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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prevImage) => (prevImage + 1) % heroAssets.length);
		}, 500);

		return () => clearInterval(interval);
	}, []);

	const data = useLoaderData<typeof loader>();

	return (
		<div className="home">
			<div className="hero">
				<img
					className="absolute bottom-[6vh] top-[32vh] md:top-[18vh] right-[12vw] w-[22vw] h-[28vw] object-contain transform rotate-[10deg]"
					src={heroAssets[currentImage]}
					alt="Chocolate background" />
				<div className="hero-content">
					<h1>SWEET HOLIDAYS, ALL YEAR LONG</h1>
					<p>
						We wholesale and retail wholesome holiday treats.
						<br />
						Trusted by leading supermarket chains.&nbsp;
						<a className="underline" target='blank' href="https://sweetchoice-a775574908f7afeeb9c6.o2.myshopify.dev/">Live →</a>
					</p>
					<Button type="primary" onClick={() => window.location.href = "/contact"}>Talk Business</Button>
					<Button type="secondary" onClick={() => window.location.href = "/collections/all"}>Shop all →</Button>
					

					<div className='home-logos-container'>
						<Logos logos={logos} />
					</div>

				</div>
			</div>
			<hr style={{ marginBottom: '3em' }} />

			<RecommendedProducts products={data.recommendedProducts} />
			
			{/* <BusinessSelector /> */}

			<hr />
			
			<section>
				<div className="flex items-center gap-4">
					<h2 className=''>Treats & Sweets for Every Season</h2>
					<Eyebrow
						text="wholesale"
						className='text-xs bg-red-700'
						/>
				</div>
			</section>

			{/* ------------------------------------------------------------ */}

			
			{/* <HolidaySection /> */}
			{/* <HolidaySection christmasCollection={data.christmasCollection} /> */}
			<HolidaySection holidayCollections={data.holidayCollections} />


			<HolidayWheel />


			<section>
				<h2>Christmas Collection test</h2>
				
				{/* <ChristmasCollection collection={data.christmasCollection} /> */}

			</section>

			<hr />
				<h1>Benefits</h1>
				<Blurbs blurbs={blurbsData} />
		</div>
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
		<div className="recommended-products">
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<h2>Gift packs</h2>
				<p>Make someone's day sweeter</p>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={products}>
					{(response) => (
						<div className="recommended-products-grid">
							{response
								? response.products.nodes.map((product) => (
									<Link key={product.id} className="recommended-product" to={`/products/${product.handle}`}>
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
