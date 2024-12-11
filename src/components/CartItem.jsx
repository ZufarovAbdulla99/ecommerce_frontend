import { useContext } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, X } from "lucide-react"
import { useCart } from "../contexts/CartContext";

// import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
//   const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  // destructure item
  const { cart, dispatch } = useCart()
  const { id, title, image, price } = item.product;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          {/* title and remove icon */}
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            {/* remove icon */}
            <div
              onClick={(event) => {
                event.stopPropagation()
                dispatch({type: "delete_item", id})}}
              className="text-xl cursor-pointer"
            >
              <X className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* quantity */}
            <div className="flex flex-1 max-w-[100px] px-1 items-center h-full border text-primary font-medium">
              <button
              disabled={item.count === 1}  
              className="h-full flex-1 flex justify-center items-center cursor-pointer disabled:opacity-50">
                <Minus className="w-4" onClick={()=>dispatch({type: "decrease_of_count", id})}/>
              </button>
              <div className="h-full flex justify-center items-center px-2">
                {item.count}
              </div>
              <button 
               
              className="h-full flex flex-1 justify-center items-center cursor-pointer">
                <Plus className="w-4" onClick={()=>dispatch({type: "increase_of_count", id})}/>
              </button>
            </div>
            {/* item price */}
            <div className="flex flex-1 justify-around items-center">
              $ {price}
            </div>
            {/* final price */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">
                {`$ ${parseFloat(
              price * item.count
            ).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
