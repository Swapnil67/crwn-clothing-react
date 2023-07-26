const { createContext, useState, useEffect } = require("react");

function addCartItem(cartItems, product) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  // * If exists just increase the quantity & return
  if (existingCartItem) {
    return cartItems.map((cardItem) =>
      cardItem.id === product.id
        ? { ...cardItem, quantity: cardItem.quantity + 1 }
        : cardItem
    );
  }

  // * For new items
  return [...cartItems, { ...product, quantity: 1 }];
}

function removeCartItem(cartItems, product) {
  // * Check if product exists in cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  // * Check if quantity is equal to 1, if it is remove the item from list
  if (existingCartItem["quantity"] === 1) {
    return cartItems.filter((cartItem) =>  cartItem.id !== product.id);
  } 
  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}


function clearCartItem(cartItems, cartItemToClear) {
  return cartItems.filter((cartItem) =>  cartItem.id !== cartItemToClear.id);
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
    setCartCount
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
