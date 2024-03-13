import axios from "axios";
import { useCallback } from "react";

interface useApiResult {
  getProductInfo: (barcode: string) => Promise<any>;
  searchProducts: (searchTerm: string) => Promise<Product[]>;
}

interface Product {
  product_name: string;
  categories: string;
}

export const useApi = (): useApiResult => {
  const getProductInfo = useCallback(async (barcode: string) => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product information:", error);
      return null;
    }
  }, []);

  const searchProducts = async (searchTerm: string): Promise<Product[]> => {
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=product_name&tag_contains_0=contains&tag_0=${encodeURIComponent(
        searchTerm
      )}&page_size=20&json=true`;

      const response = await axios.get(url);

      const products: Product[] = response.data.products.map(
        (product: any) => ({
          product_name: product.product_name,
          categories: product.categories,
        })
      );

      return products;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  };

  return {
    getProductInfo,
    searchProducts,
  };
};
