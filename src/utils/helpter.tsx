import {fetchCart, fetchWishlist} from "../axios/api";

 export const convertImageUrl:any = (str:string)=>{
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

export function formatDateWithTime(date:any) {
    // Extract date components
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-indexed
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Ensure two digits for day, month, hours, minutes, and seconds
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Construct the formatted date string
    let formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

