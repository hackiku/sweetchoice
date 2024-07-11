// app/graphql/ProductUpdateMutations.ts

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
` as const;

export const ADD_PRODUCT_TAGS_MUTATION = `#graphql
  mutation AddProductTags($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors {
        field
        message
      }
    }
  }
` as const;
