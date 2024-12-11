import { createContext, useContext, useReducer, useState } from "react"

export const CartContext = createContext();

function reducer(state, action) {
    switch(action.type){
        case "add":
            return [
                ...state,
                { product: action.product, count: action.count },
            ]
        case "increase_of_count":{
            const updatedCart = state.map((item) => {
                if(item.product.id === action.id){
                    // console.log({product: {...item.product}, count: item.count + 1})
                    return {product: {...item.product}, count: item.count + 1}
                }
                else{
                    return item
                }
            })
            return updatedCart
        }
        case "decrease_of_count":{
            const updatedCart = state.map((item) => {
                if(item.product.id === action.id){
                    return {product: {...item.product}, count: item.count - 1}
                }
                else{
                    return item
                }
            })
            return updatedCart
        }
        case "delete_item": {
            return state.filter((item) => item.product.id !== action.id)
        }
        case "clear_cart": {
            return []
        }
        default:
            return state
    }
}

const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(reducer, [])
    // console.log(cart, "*")

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