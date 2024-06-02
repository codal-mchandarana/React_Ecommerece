import TopPortion from "./Components/TopPortion"
import axios from 'axios'
import MiddlePortion from "./Components/MiddlePortion"
import { json } from 'react-router-dom'
import { ToastContainer } from "react-toastify"

const ItemPage: React.FC = (): JSX.Element => {

    return (
        <>
           <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <TopPortion item="shop" />
            <MiddlePortion />
        </>
    )
}

export default ItemPage

export const loader = async (): Promise<object> => {
    // https://dummyjson.com/products
    let response;
    try {
        response = await axios.get('http://localhost:8080/product');
    }catch (error){
        console.log(error)
    }
    if (response?.status !== 200) { }
    return json(response?.data);
}