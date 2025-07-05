import React, { useEffect } from "react"
import logo from "../../images/logo.png"
import Image from "next/image"
import cartIcon from "../../images/cart.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { stateProps } from "@/type";
import { addUser, removeUser } from "@/store/nextSlice";


const Header = () => {
    const dispatch = useDispatch();
    const { productData, favoriteData, userInfo } = useSelector(
        (state: stateProps) => state.next
    );

    // Custom authentication functions
    const signIn = () => {
        window.location.href = '/api/auth/google/login';
    };

    const signOut = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            dispatch(removeUser());
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Check if user is authenticated on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/user');
                if (response.ok) {
                    const userData = await response.json();
                    dispatch(addUser({
                        name: userData.name || "",
                        email: userData.email || "",
                        image: userData.image || "",
                    }));
                } else {
                    dispatch(removeUser());
                }
            } catch {
                dispatch(removeUser());
            }
        };

        checkAuth();
    }, [dispatch]);
       




  return (
    <div className="w-full h-20 bg-amazon_blue  text-lightText sticky top-0 z-50">
     <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
    {/*Logo*/}
       <Link href={"/"} className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
        <Image className="w-28 object-cover" src={logo} alt="logoImg"/>
        </Link>
    {/*delivery*/}
      <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%] gap-1">
        <CiLocationOn/>
        <div className="text-xs">
          <p>Deliver to</p>
          <p className="text-white font-bold uppercase">India</p>
        </div>
      </div>
    {/*searchbar*/}
   <div className="flex-1 h-10 flex items-center justify-between relative">
      <input
        className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black bg-white border border-transparent outline-none focus-visible:border-amazon_yellow"
        type="text"
        placeholder="Search amazon products"
      />
      <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex
                items-center justify-center absolute right-0 rounded-md rounded-br-md">
        <HiOutlineSearch/>
      </span>
      </div>
      {/*signin*/}
      {/* Sign-in Section */}
      <div 
        onClick={() => userInfo ? signOut() : signIn()}
        className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%] gap-1"
      >
        {userInfo && userInfo.image && (
          <Image 
            src={userInfo.image} 
            alt="User avatar" 
            width={25} 
            height={25} 
            className="rounded-full"
          />
        )}
        <div>
          <p className="text-xs">Hello, {userInfo ? userInfo.name : "Sign in"}</p>
          <p className="text-white font-bold flex items-center text-sm">
            {userInfo ? "Sign out" : "Account & Lists"}{" "}
            <span><BiCaretDown/></span>
          </p>
        </div>
      </div>

      {/*favourite*/}
      <div className="px-3 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%] relative min-w-[90px]">
        <div>
          <p className="text-xs">Marked</p>
          <p className="text-white font-bold text-sm">&Favourites</p>
        </div>
        {favoriteData.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amazon_yellow text-black text-xs font-bold rounded-full flex items-center justify-center">
            {favoriteData.length}
          </span>
        )}
      </div>
        {/*cart*/}
        <Link href={"/cart"} className="flex items-center px-3 border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%] relative min-w-[80px]">
          <div className="relative mr-2">
            <Image className="w-10 h-10 object-contain" src={cartIcon} alt="cartImg"/>
            {productData && productData.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amazon_yellow text-black text-xs font-bold rounded-full flex items-center justify-center">
                {productData.length}
              </span>
            )}
          </div>
          <p className="text-sm text-white font-bold">Cart</p>
        </Link>





    </div>
</div>
    
  );
};

export default Header;
