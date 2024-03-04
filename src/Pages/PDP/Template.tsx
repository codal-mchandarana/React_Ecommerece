import { useParams, useRouteLoaderData } from "react-router-dom"
import ProductImage from "./Components/ProductImage";
import TopPortion from "./Components/TopPortion"

const Template: React.FC = (): JSX.Element => {
    const data1: any = useRouteLoaderData("mainPage");
    const { id } = useParams();
    
    const index = id?parseInt(id)-1:0;
    
    const  currentProduct = data1.products[index]

    return (
        <>
           <TopPortion item={currentProduct.title}/>
           <ProductImage currentProduct={currentProduct} />
        </>
    )

}

export default Template