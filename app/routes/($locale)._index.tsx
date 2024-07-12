// app/routes/($locale)._index.tsx

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
	return [{ title: 'Sweetchoice 🍫 Home' }];
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

export default function Homepage() {
	const data = useLoaderData<typeof loader>();
	return (
		<div className="home">
			<div className="home-hero">
				<div className="home-hero-content">
					<h1>CHRISTMAS EVERY DAY</h1>
					<p>Holiday season treats wholesale treats for holiday seasons. Trusted by leading supermarket chains in Serbia and the EU.</p>
					<button className="home-hero-button">Talk Business</button>
					<a className="home-hero-link" href="/collections/all">Shop all →</a>
					<div className="client-logos">
						<div><a href="/about">About</a></div>
						<div>Logo</div>
						<div>Logo</div>
						<div>Logo</div>
					</div>
				</div>
			</div>
			<hr />
			<FeaturedCollection collection={data.featuredCollection} />
			<RecommendedProducts products={data.recommendedProducts} />
			<BusinessSelector />
			
			{/* About Section */}
			<section className="about-section">
				<div>
					<h2>About Us</h2>
					<p>Learn more about our journey and values.</p>
				</div>
				<a className="about-link" href="/about">Read More</a>
			</section>
			<ChristmasCollection collection={data.christmasCollection} />
			<hr />
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
			<h2>Recommended</h2>
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

