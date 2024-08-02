// app/routes/($locale).holyshit.tsx

// app/routes/($locale).holidays.tsx

import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import HolidaySection from '~/components/holidays/HolidaySection';
import HolidayWheel from '~/components/holidays/HolidayWheel';

const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: 8) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
            width
            height
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

export async function loader({ context }: LoaderFunctionArgs) {
	const { storefront } = context;

	const holidayHandles = ['christmas', 'valentines', 'easter', 'halloween'];

	const holidayCollections = await Promise.all(
		holidayHandles.map(async (handle) => {
			const { collection } = await storefront.query(COLLECTION_QUERY, {
				variables: { handle },
			});
			return { [handle]: collection };
		})
	);

	const holidayCollectionsData = Object.assign({}, ...holidayCollections);

	console.log('Holiday Collections Data:', holidayCollectionsData);

	return defer({
		holidayCollections: holidayCollectionsData,
	});
}

export default function HolidaysRoute() {
	const { holidayCollections } = useLoaderData<typeof loader>();

	const easterCollection = holidayCollections.easter;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Easter Collection Test</h1>
			{easterCollection ? (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{easterCollection.products.nodes.map((product) => (
						<Link key={product.id} to={`/products/${product.handle}`} className="group">
							<div className="aspect-square overflow-hidden">
								{product.featuredImage && (
									<Image
										data={product.featuredImage}
										aspectRatio="1/1"
										sizes="(min-width: 45em) 20vw, 50vw"
										className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
									/>
								)}
							</div>
							<h3 className="mt-2 text-sm font-medium">{product.title}</h3>
							<p className="mt-1 text-sm text-gray-500">
								<Money data={product.priceRange.minVariantPrice} />
							</p>
						</Link>
					))}
				</div>
			) : (
				<p>No Easter collection found</p>
			)}

			<h1 className="text-2xl font-bold mb-4">Holiday Collections</h1>
			<HolidaySection holidayCollections={holidayCollections} />
			<HolidayWheel />
		</div>
	);
}