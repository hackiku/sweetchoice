import { useState, useEffect } from 'react';

const fetchProductVariantId = async (productId: string) => {
    const query = `
      query ($productId: ID!) {
        product(id: $productId) {
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `;
    
    try {
      const response = await fetch('https://f13103-ad.myshopify.com/api/2023-01/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'a5d7d50a6b5bcbf07dd7f89006d9de83', // Your public storefront access token
        },
        body: JSON.stringify({ 
          query,
          variables: { productId } // Pass the variable here
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        return null;
      }
      
      if (result.data && result.data.product && result.data.product.variants.edges.length > 0) {
        return result.data.product.variants.edges[0]?.node.id || null;
      } else {
        console.error("Product or variants data not found", result);
        return null;
      }
    } catch (error) {
      console.error("Error fetching product variant ID:", error);
      return null;
    }
};


  
const useProductVariant = (productId: string) => {
  const [variantId, setVariantId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getVariantId = async () => {
      setLoading(true);
      setError(null);
      const id = await fetchProductVariantId(productId);
      if (id === null) {
        setError("Could not fetch variant ID");
      }
      setVariantId(id);
      setLoading(false);
    };

    getVariantId();
  }, [productId]);
  
  return { variantId, loading, error };
};

export default useProductVariant;
