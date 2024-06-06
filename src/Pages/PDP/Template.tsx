import { useParams, useRouteLoaderData } from "react-router-dom"
import ProductImage from "./Components/ProductImage";
import TopPortion from "./Components/TopPortion"
import { ToastContainer } from "react-toastify";
import convertImageUrl from "../../utils/helpter";

const Template: React.FC = (): JSX.Element => {
    const data1: any = useRouteLoaderData("mainPage");
    const { id } = useParams();

    const index = id ? parseInt(id) - 1 : 0;

    const currentProduct = data1[index]
    currentProduct.images = convertImageUrl(String(currentProduct.images))

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <TopPortion item={currentProduct.title} />
            <ProductImage currentProduct={currentProduct} />
        </>
    )

}

export default Template