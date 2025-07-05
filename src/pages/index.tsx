import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import HeaderBottom from "@/components/header/HeaderBottom";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Products from "@/components/product";
import { ProductProps } from "@/type";
interface Props{
  productData: ProductProps
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({productData} : Props) {
  console.log(productData)
  return (
    <main>
      <div>
        <Banner/>
        <Products productData={productData}/>
      </div>
    </main>
  );
}
export const getServerSideProps=async()=>{
  const res=await fetch("https://fakestoreapi.com/products");
  const productData=await res.json();
  return{props:{productData}}
}