import { createContext, useContext, useReducer } from "react"

export const CartContext = createContext();

function reducer(state, action) {
    return state
}

const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(reducer, [1, 2])

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