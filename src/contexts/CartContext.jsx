import { createContext, useContext, useReducer, useState } from "react";

export const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add_to_cart":
      return [...state, { product: action.payload, count: action.count }];
    case "increase_of_count": {
      const updatedCart = state.map((item) => {
        if (item.product.id === action.id) {
          // console.log({product: {...item.product}, count: item.count + 1})
          return { product: { ...item.product }, count: item.count + 1 };
        } else {
          return item;
        }
      });
      return updatedCart;
    }
    case "decrease_of_count": {
      const updatedCart = state.map((item) => {
        if (item.product.id === action.id) {
          return { product: { ...item.product }, count: item.count - 1 };
        } else {
          return item;
        }
      });
      return updatedCart;
    }
    case "delete_item": {
      return state.filter((item) => item.product.id !== action.id);
    }
    case "clear_cart": {
      return [];
    }
    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);

  function addToCart(product) {
    dispatch({ type: "add_to_cart", payload: product, count: 1 });
  }

  const allProductsCount = function () {
    let totalCount = cart.reduce((acc, productObject) => {
      return acc + productObject.count;
    }, 0);
    return totalCount;
  };

  const totalPrice = function () {
    let totalPrice = cart.reduce((acc, productObject) => {
      return acc + productObject.count * productObject.product.price;
    }, 0);
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{ cart, allProductsCount, totalPrice, addToCart, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext must be inside CartProvider!");
  }

  return context;
}

export default CartProvider;
