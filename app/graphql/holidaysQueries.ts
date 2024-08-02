// app/graphql/holidaysQueries.ts


export const HOLIDAY_COLLECTION_QUERY = `#graphql
  query HolidayCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 4) {
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
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;




export const SPRING_COLLECTION_QUERY = `#graphql
  query SpringCollection {
    collections(first: 1, query: "title:Spring") {
      nodes {
        id
        title
        handle
        products(first: 4) {
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
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
` as const;

export const SUMMER_COLLECTION_QUERY = `#graphql
  query SummerCollection {
    collections(first: 1, query: "title:Summer") {
      nodes {
        id
        title
        handle
        products(first: 4) {
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
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
` as const;

export const AUTUMN_COLLECTION_QUERY = `#graphql
  query AutumnCollection {
    collections(first: 1, query: "title:Autumn") {
      nodes {
        id
        title
        handle
        products(first: 4) {
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
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
` as const;

export const WINTER_COLLECTION_QUERY = `#graphql
  query WinterCollection {
    collections(first: 1, query: "title:Winter") {
      nodes {
        id
        title
        handle
        products(first: 4) {
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
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
` as const;
