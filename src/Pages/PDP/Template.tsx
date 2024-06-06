import { useParams, useRouteLoaderData } from "react-router-dom"
import ProductImage from "./Components/ProductImage";
import TopPortion from "./Components/TopPortion"
import { ToastContainer } from "react-toastify";
import {useEffect, useState} from "react";
import EcommerceClient from "../../axios/helper";

const Template: React.FC = (): JSX.Element => {
    const [currentProduct,setCurrentProduct] = useState({
        id:'',
        title:'',
        description:'',
        price:'',
        discountPercentage:'',
        qty:0,
        rating:'',
        stock:'',
        brand:'',
        category:'',
        thumbnail:'',
        images:[]
    })
    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async()=>{
            try {
                const response = await EcommerceClient.get(`product/getProduct/${id}`,{
                    withCredentials:true
                });
                setCurrentProduct(response.data);
            }catch (error){
                console.log(error);
            }
        }
        fetchItem();
    }, []);

    // const currentProduct = data1[index]
    // currentProduct.images = convertImageUrl(String(currentProduct?.images))

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <TopPortion item={currentProduct?.title} />
            {currentProduct.id!==''&&<ProductImage currentProduct={currentProduct} />}
        </>
    )

}

export default Template