// app/graphql/recommendedProducts.ts

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query recommendedProducts($count: Int = 8) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
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