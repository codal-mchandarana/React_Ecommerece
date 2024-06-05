import {fetchCart, fetchWishlist} from "../axios/api";

const convertImageUrl:any = (str:string)=>{
    let helperStr ;
    str = str.replaceAll('{','');
    str = str.replaceAll('}','');

    helperStr = str.split(',')
    return helperStr
};

export const helper_Fetching_cartProducts = async()=>{

    const cartItems = await fetchCart();
    return cartItems;
}

export const helper_Fetching_wishlistProducts = async()=>{
    const wishlistItems = await fetchWishlist();
    return wishlistItems;
}

export default convertImageUrl;