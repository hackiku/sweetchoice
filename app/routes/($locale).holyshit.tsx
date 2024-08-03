// app/routes/($locale).holyshit.tsx

import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { Image, Money } from '@shopify/hydrogen';
import HolidaySection from '~/components/holidays/HolidaySection';
import HolidayWheel from '~/components/holidays/HolidayWheel';

// import HolidaySection from '~/components/seasons/HolidaySection';
import SeasonSection from '~/components/seasons/SeasonsSection';


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
			
			{/* <h1 className="text-2xl font-bold mb-4">Easter Collection Test</h1>
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
			)} */}

			<section className='mb-2'>
				<h1 className="text-6xl font-semibold">Holiday Collections</h1>
				<button className="border-black border-2 rounded-full bg-[#FFA6F6] hover:bg-[#fa8cef] active:bg-[#f774ea] w-10 h-10">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.8425 24V0H13.1575V24H10.8425ZM0 13.1664V10.8336H24V13.1664H0Z" fill="black" />
					</svg>
				</button>
			</section>
			<hr className='mb-6'/>

			{/* <SeasonSection /> */}
			{/* <HolidaySection /> */}
			<HolidaySection holidayCollections={holidayCollections} />
			<HolidayWheel />
		</div>
	);
}