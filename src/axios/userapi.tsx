import EcommerceClient from "./helper";
import {userDetails} from "../Interface/userDetails";

export const fetchUserDetails = async ()=>{
    try {
        const response = await EcommerceClient.get('user/getUserDetails',{
            withCredentials:true,
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
    return {}
};

export const updateUserDetails = async(user:userDetails)=>{
    try {
        const response = await EcommerceClient.post('user/profile',user,{
            withCredentials:true,
            headers:{'content-type':'application/json'}
        })
        return response;
    }catch (error){
        console.log(error);
    }
    let response = {status:500};
    return response
}

export const updateUserPassword = async(userPass:any)=>{
    try {
        const response = await EcommerceClient.put('user/change-password',userPass,{
            withCredentials:true,
            headers:{'content-type':'application/json'}
        });
        return response;
    }catch(error){
        console.log(error);
    }
    let response = {status:500};
    return response
}