export interface ProductProps{
    id:number;
    title:string;
    price: number;
    description:string;
    category:string;
    image:string;

    
}

export interface StoreProduct{
    id:number;
    title:string;
    price: number;
    description:string;
    category:string;
    image:string;
    quantity:number;

    
}

export interface stateProps{
    productData: StoreProduct[];
    favoriteData: StoreProduct[];
    allProducts: StoreProduct[];
    userInfo: null | {
        name: string;
        email: string;
        image: string;
    };
    next: any;

}