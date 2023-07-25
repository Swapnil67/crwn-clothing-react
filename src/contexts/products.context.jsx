import { createContext, useEffect, useState } from "react";
import DEFAULT_PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: []
});

export const ProductsProvider = ({ children }) => {

  const [products] = useState(DEFAULT_PRODUCTS);
  const value = { products };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

/*
 * For every context we build
 * there is a provider
 */

