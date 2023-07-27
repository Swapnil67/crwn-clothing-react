import { createContext, useEffect, useState } from "react";
// import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

export const CategoriesContext = createContext({
  categoriesMap: []
});

export const CategoriesProvider = ({ children }) => {

  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect(() => {
  //   createCollectionAndDocuments('categories', SHOP_DATA);
  // }, [])

  useEffect(()=>{
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log("categoryMap: ", categoryMap);
      setCategoriesMap(categoryMap)
    }
    getCategoryMap();
  }, [])

  const value = { categoriesMap };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};

/*
 * For every context we build
 * there is a provider
 */

