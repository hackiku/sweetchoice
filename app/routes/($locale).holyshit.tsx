// app/routes/($locale).holyshit.tsx

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

export default function Holyshit() {
	const { holidayCollections } = useLoaderData<typeof loader>();

	const easterCollection = holidayCollections.easter;

	return (
		<main className="">

			<section className="m-6 md:m-20">
				<h1 className="text-6xl font-semibold">Holiday Candy & Chocolate</h1>
				<button className="border-black border-2 rounded-full bg-[#FFA6F6] hover:bg-[#fa8cef] active:bg-[#f774ea] w-10 h-10">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.8425 24V0H13.1575V24H10.8425ZM0 13.1664V10.8336H24V13.1664H0Z" fill="black" />
					</svg>
				</button>
			</section>
			<hr className='mb-6'/>

				{/* <div className="m-6 w-5/6"> */}
				<div className="XXXw-[95vw]">
					<HolidaySection holidayCollections={holidayCollections} />
				</div>
				<HolidayWheel />

		</main>
	);
}