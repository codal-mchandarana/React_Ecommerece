import TopPortion from "./Components/TopPortion"
import axios from 'axios'
import MiddlePortion from "./Components/MiddlePortion"
import { json, useLoaderData } from 'react-router-dom'
import { useContext, useEffect } from "react"
import { CartContext } from "../../Store/CartContextProvider"


const ItemPage: React.FC = (): JSX.Element => {
    
    const data: any = useLoaderData();
    const {SetItemvalues} = useContext(CartContext)

    useEffect(()=>{
        SetItemvalues(data.products)
    },[data])
    

    return (
        <>
            <TopPortion />
            <MiddlePortion />
        </>
    )
}

export default ItemPage

export const loader = async (): Promise<object> => {
    const response = await axios.get('https://dummyjson.com/products');
    if (response.status !== 200) { }
    return json(response.data);
}