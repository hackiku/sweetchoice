// /app/($locale)._index.tsx

import { useState, useEffect, useRef } from 'react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type { RecommendedProductsQuery } from 'storefrontapi.generated';
import { FEATURED_COLLECTION_QUERY, RECOMMENDED_PRODUCTS_QUERY } from '../graphql/queries';

import { useTranslation } from '~/lib/i18n/useTranslation';

import Hero from '~/components/ui/Hero';
import HolidaySection from '~/components/ecom/holidays/HolidaySection';
import HolidayWheel from '~/components/ecom/holidays/HolidayWheel';

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  return [{ title: t('home.meta.title') }];
};

const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: 10) {
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
          variants(first: 1) {
            nodes {
              weight
              weightUnit
            }
          }
        }
      }
    }
  }
`;

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

async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const { collections } = await context.storefront.query(FEATURED_COLLECTION_QUERY);
  return {
    featuredCollection: collections.nodes[0],
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
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();
  const [isHolidaySelectorVisible, setIsHolidaySelectorVisible] = useState(false);
  const holidaySection = useRef<HTMLDivElement>(null);
  const blurbsSection = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (holidaySection.current && blurbsSection.current) {
        const holidayRect = holidaySection.current.getBoundingClientRect();
        const blurbsRect = blurbsSection.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        setIsHolidaySelectorVisible(
          holidayRect.top <= windowHeight && blurbsRect.top > windowHeight
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="overflow-x-hidden">

      <Hero />

      {/* <div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:px-12"></div> */}

      <div ref={holidaySection} className="pt-6">
        <HolidaySection holidayCollections={data.holidayCollections} />
      </div>

      {isHolidaySelectorVisible && (
        <div className="fixed bottom-4 left-0 right-0 z-10 px-6 sm:px-8 md:px-12 flex justify-between items-center">
          <HolidayWheel />
        </div>
      )}

      <div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:px-12"></div>

      <section ref={blurbsSection} className="px-6 sm:px-8 md:px-12 mb-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8">{t('home.blurbs.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t('home.blurbs.items').map((item, index) => (
						<Link
              key={index}
              to="/about"
              className={`p-6 border-4 border-black bg-[${item.bgColor}] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1`}
            >
              <h3 className="text-6xl font-bold mb-2">{item.number}</h3>
              <h4 className="text-xl font-semibold">{item.text}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* <div className="border-t-4 border-black my-8 mx-6 sm:mx-8 md:px-12"></div> */}
    </main>
  );
}