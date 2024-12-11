import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react"

import { useCart } from "../contexts/CartContext";

import CartItem from "./CartItem";

// import CartItem from "../components/CartItem";
// import { SidebarContext } from "../contexts/SidebarContext";

const Sidebar = ({isOpen, handleClose}) => {
  // const { isOpen, handleClose } = useContext(SidebarContext);
  // const { cart, clearCart, itemAmount, total } = useContext(CartContext);

  // let isOpen = true

  const { cart, allProductsCount, totalPrice, dispatch } = useCart()
  


  useEffect(() => {
    function watchClick(e) {
      if (isOpen && !e.target.closest("[class*=sidebar]")) {
      // if (isOpen && e.target.closest("[:notclass*=sidebar]")) {
        // console.log(e.target.closest("[class*=sidebar]"))
        // console.log(e.target.closest(".sidebar"), "ZZ")
      // if (isOpen && !e.target.closest(".sidebar")) {
        handleClose();
        // console.log("CLOSE")
      }
    }

    if (isOpen) {
      window.addEventListener("click", watchClick);
    }

    return () => {
      window.removeEventListener("click", watchClick);
    };
  }, [isOpen, handleClose]);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } flex flex-col w-full pb-10 bg-white fixed top-0 h-full shadow-2xl md:w-[48vw] lg:w-[40vw] xl:max-w-[30vw] sidebar transition-all duration-300 z-20 px-4 lg:px-9`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Carts count: {allProductsCount()}</div>
        <div
        //   onClick={handleClose}
          className="cursor-poniter w-8 h-8 flex justify-center items-center"
        >
          <ArrowRight className="text-2xl cursor-pointer" onClick={handleClose} />
        </div>
      </div>
      <div className="flex grow flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
            return <CartItem item={item} key={item.product.id} />
        })}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* total */}
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> ${" "}
            {/* {parseFloat(total).toFixed(2)} */}
            { parseFloat(totalPrice()).toFixed(2) }
          </div>
          {/* clear cart icon */}
          <div
            onClick={() => dispatch({type: "clear_cart"})}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <Trash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
        >
          View Cart
        </Link>
        <Link
          to={"/"}
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;