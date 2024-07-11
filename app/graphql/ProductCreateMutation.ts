// app/graphql/ProductCreateMutation.ts

export const PRODUCT_CREATE_MUTATION = `#graphql
  mutation CreateProductWithNewMedia($input: ProductInput!, $media: [CreateMediaInput!]) {
    productCreate(input: $input, media: $media) {
      product {
        id
        title
        media(first: 10) {
          nodes {
            alt
            mediaContentType
            preview {
              status
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;
