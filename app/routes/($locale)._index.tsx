// app/routes/($locale)._index.tsx

import { useState, useEffect } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment, RecommendedProductsQuery } from 'storefrontapi.generated';
import { FEATURED_COLLECTION_QUERY, RECOMMENDED_PRODUCTS_QUERY, CHRISTMAS_COLLECTION_QUERY } from '../graphql/queries';
import { BusinessSelector } from '../components/BusinessSelector';
import '../styles/home-hero.css';
import '../styles/business-selector.css';
import '../styles/collections.css';

export const meta: MetaFunction = () => {
	return [{ title: 'Sweetchoice | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
	const deferredData = loadDeferredData(args);
	const criticalData = await loadCriticalData(args);
	const christmasCollection = await loadChristmasCollection(args);

	return defer({
		...deferredData,
		...criticalData,
		...christmasCollection,
	});
}

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

// ==================== HOMEPAGE ====================

const heroAssets = [
	"/assets/graphics/choco-gradient.svg",
	"/assets/graphics/choco-grad-2.svg",
];



export default function Homepage() {

	const [currentImage, setCurrentImage] = useState(heroAssets[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prevImage) =>
				prevImage === heroAssets[0] ? heroAssets[1] : heroAssets[0]
			);
		}, 1500);

		return () => clearInterval(interval);
	}, []);

	const data = useLoaderData<typeof loader>();
	return (
		<div className="home">
			<div className="home-hero">
				<img className="choco-background" src={currentImage} alt="Chocolate background" />
				{/* <img className="choco-background" src="/assets/graphics/choco-gradient.svg" alt="Chocolate background" /> */}
				{/* <img className="choco-background" src="/assets/graphics/choco-grad-2.svg" alt="Chocolate background" /> */}
				<div className="home-hero-content">
					<h1>SWEET HOLIDAYS, ALL YEAR LONG</h1>
					<p><a href="/about">We wholesale and retail wholesome holiday treats.<br></br> Trusted by leading supermarket chains.</a></p>
					<button className="home-hero-button">Talk Business</button>
					<a className="home-hero-link" href="/collections/all">Shop all →</a>
					<div className="client-logos">
						<img src="/assets/logos/maxi-logo.svg" alt="Maxi logo" />
						<img style={{ height: '33px' }} src="/assets/logos/dis-logo.png" alt="DIS logo" />
						<img src="/assets/logos/idea-logo.svg" alt="Idea logo" />
						<img src="/assets/logos/univerexport-logo.svg" alt="Univerexport logo" />
						<img src="/assets/logos/tempo-logo.svg" alt="Tempo logo" />
					</div>
				</div>
			</div>
			<hr style={{ marginBottom: '3em' }} />

			<RecommendedProducts products={data.recommendedProducts} />
			<BusinessSelector />

			<section className="about-section">
				
				<div>
					<h2 style={{ fontSize: '3em' }}>Wholesale programs</h2>
					<p>Explore our tailored holiday confectionery wholesale programs. <br></br>Making holidays colorful and sweet since 2013.</p>
					<a className="about-link" href="/about">Learn more →</a>
				</div>
				{/* <img src="/assets/supermarket-lineart.png" alt="" /> */}
				{/* <img src="/assets/supermarket-lineart.png" alt="Supermarket line art" style={{ width: '40%' }} /> */}
				{/* <img src="/assets/shopping-cart.svg" alt="Supermarket line art" style={{ width: '15%' }} /> */}
				<img src="/assets/shopping-cart.svg" alt="Supermarket line art" style={{
					width: '15%',
					transform: 'rotate(30deg)',
					position: 'absolute',
					right: '10%',
					top: '-15%'
				}} 
 />


			</section>
			
			<ChristmasCollection collection={data.christmasCollection} />
		
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
				<h2>Select gift packs</h2>
				<p>Our top picks for you</p>
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

