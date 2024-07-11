// app/graphql/AddProduct.ts

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
`;

export const UPDATE_PRODUCT_VARIANT_MUTATION = `#graphql
  mutation UpdateProductVariant($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      productVariant {
        id
        sku
        barcode
        inventoryPolicy
        fulfillmentService
        inventoryManagement
        inventoryQuantity
        weight
        weightUnit
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_PRODUCT_TAGS_MUTATION = `#graphql
  mutation AddProductTags($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors {
        field
        message
      }
    }
  }
`;
