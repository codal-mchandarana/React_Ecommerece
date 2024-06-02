import EcommerceClient from "./helper";
import convertImageUrl from "../utils/helpter";

export const addToCartApi = async(product_id:any)=>{
    try {
        const response = await EcommerceClient.post(`cart/addToCart/${product_id}`,{},{
            withCredentials:true
        })

        return response;
    }catch(error){
        console.log(error);
    }
    let response = {status:500};
    return response
}
export const addToWishlistApi = async(product_id:any)=>{
    try {
        const response = await EcommerceClient.post(`wishlist/addToWishlist/${product_id}`,{},{
            withCredentials:true
        })

        return response;
    }catch(error){
        console.log(error);
    }
    let response = {status:500};
    return response
}
export const removeFromCartApi = async(product_id:any)=>{
    try {
        const response = await EcommerceClient.delete(`cart/removeFromCart/${product_id}`,{
            withCredentials:true
        })
        return response;
    }catch (error){
        console.log(error);
    }
    let response = {status:500};
    return response
}

export const deleteFromCart = async(product_id:any)=>{
    try {
        const response = await EcommerceClient.delete(`cart/permenantremoveFromCart/${product_id}`,{
            withCredentials:true
        })
        return response;
    }catch (error){
        console.log(error);
    }
    let response = {status:500};
    return response
}

export const fetchCart = async()=>{
    try {
        const response = await EcommerceClient.get('/cart/getUserCart',{withCredentials:true});
        if(response.status===200){
            const cartItems = response.data
            for(const element of cartItems)
                element.images = convertImageUrl(String(element.images));

            return cartItems;
        }
    }catch(error){
        console.log(error);
    }
    return [];
}
export const fetchWishlist = async()=>{
    try {
        const response = await EcommerceClient.get('/wishlist',{withCredentials:true});
        if(response.status===200){
            const cartItems = response.data
            for(const element of cartItems)
                element.images = convertImageUrl(String(element.images));

            return cartItems;
        }
    }catch(error){
        console.log(error);
    }
    return [];
}

