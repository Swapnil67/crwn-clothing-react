import { createContext, useState } from 'react';

export const CheckoutContext = createContext({
  checkoutItems: [],
  setCheckoutItems: () => {}
})

export const CheckoutProvider = ({ children }) => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  console.log("checkoutItems: ", checkoutItems);

  const value = { checkoutItems, setCheckoutItems };
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}