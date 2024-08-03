// app/components/holiday/HolidaySection.tsx

import React from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import ProductCard from '~/components/ecom/ProductCard';
import { CHRISTMAS_COLLECTION_QUERY } from '~/graphql/queries';

const holidays = [
	{ id: 'christmas', title: 'Christmas', mainColor: '#E6F3FF', secondaryColor: '#FFD1DC' },
	{ id: 'valentines', title: "Valentine's Day", mainColor: '#FFE6E6', secondaryColor: '#FF69B4' },
	{ id: 'easter', title: 'Easter', mainColor: '#F0FFF0', secondaryColor: '#98FB98' },
	{ id: 'halloween', title: 'Halloween', mainColor: '#FFF5E6', secondaryColor: '#FFA500' },
];

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const { storefront } = context;

	const christmasData = await storefront.query(CHRISTMAS_COLLECTION_QUERY);

	return {
		christmasCollection: christmasData.collections.nodes[0],
	};
};

const HolidaySection = () => {
	const { christmasCollection } = useLoaderData<typeof loader>();

	return (
		<div className="w-screen overflow-x-hidden">
			{holidays.map((holiday) => (
				<section
					id={holiday.id}
					key={holiday.id}
					className="p-8 w-full"
					style={{ backgroundColor: holiday.mainColor }}
				>
					<h2 className="text-4xl font-bold mb-4">{holiday.title}</h2>
					<p className="mb-4">Super short description pulled from Shopify collections CDN.</p>
					<ProductsGrid
						products={christmasCollection?.products.nodes || []}
						secondaryColor={holiday.secondaryColor}
					/>
					<div className="mt-8 flex justify-between items-center">
						<Link
							to={`/collections/${holiday.id}`}
							className="px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
							style={{ backgroundColor: holiday.secondaryColor }}
						>
							Explore {holiday.title} →
						</Link>
						<Link to="/collections/all" className="underline">All Collections →</Link>
					</div>
				</section>
			))}
		</div>
	);
};

const ProductsGrid = ({ products, secondaryColor }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
			{products.map((product) => (
				<div key={product.id}>
					<ProductCard
						productName={product.title}
						productLink={`/products/${product.handle}`}
						imageUrl={product.images.nodes[0]?.url}
						imageAlt={product.images.nodes[0]?.altText || product.title}
						price={<Money data={product.priceRange.minVariantPrice} />}
						weight="80g"
						buttonBgColor={secondaryColor}
					/>
				</div>
			))}
		</div>
	);
};

export default HolidaySection;