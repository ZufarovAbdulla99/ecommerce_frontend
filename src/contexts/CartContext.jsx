import { createContext, useContext, useReducer, useState } from "react"

export const CartContext = createContext();

function reducer(state, action) {
    switch(action.type){
        case "add":
            return [
                ...state,
                { product: action.product, count: action.count },
            ]
        default:
            return state
    }
}

const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(reducer, [])
    console.log(cart, "*")

    // function productHasCart(id) {
    //     // console.log(cart)
    //     let [productId] = cart.map((cartItem) => {
    //       if(cartItem.product.id === id) return true
    //       else return false
    //     })
    //     return productId
    //   }

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if(!context) {
        throw new Error("CartContext must be inside CartProvider!")
    }

    return context;
}

export default CartProvider