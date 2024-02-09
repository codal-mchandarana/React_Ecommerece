import TopPortion from "./Components/TopPortion"
import axios from 'axios'
import MiddlePortion from "./Components/MiddlePortion"
import { json, useLoaderData } from 'react-router-dom'

const ItemPage: React.FC = (): JSX.Element => {

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