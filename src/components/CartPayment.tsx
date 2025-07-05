import React ,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { StoreProduct,stateProps } from "@/type";
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";


const CartPayment=()=>{
    const{productData}=useSelector((state:stateProps)=>state.next);
    const[totalAmount,setTotalAmount]=useState(0);
    useEffect(()=>{
        let amount=0;
        productData.map((item:StoreProduct)=>{
            amount+=item.price *10 * item.quantity;
            return 
        })
        setTotalAmount(amount)

    },[productData])
     return (
  <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-sm mx-auto">
    {/* Free Shipping Info */}
    <div className="flex items-start gap-3">
      <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
        <SiMediamarkt />
      </span>
      <p className="text-sm text-gray-700">
        Your order qualifies for <span className="font-medium">FREE Shipping</span>. Continue for more details.
      </p>
    </div>

    {/* Total Price */}
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm font-semibold text-gray-800">Total Price:</p>
      <span className="font-bold text-xl text-gray-900">
        <FormattedPrice amount={totalAmount} />
      </span>
    </div>

    {/* Checkout Button and Login Prompt */}
    <div className="mt-6 flex flex-col items-center">
      <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
        Proceed to Checkout
      </button>
      <p className="text-xs mt-2 text-red-500 font-semibold animate-bounce text-center">
        Please Login to Continue
      </p>
    </div>
  </div>
);

}

export default CartPayment;
