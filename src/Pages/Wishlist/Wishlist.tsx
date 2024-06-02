import MiddlePortion from "./MiddlePortion";
import TopPortion from '../ItemPage/Components/TopPortion'
import {ToastContainer} from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../../Store/CartContextProvider";

const Wishlist:React.FC = ():JSX.Element=>{
    const {  isLogin } = useContext(CartContext);

    if (!isLogin) {
        return (<h1 style={{ position: 'absolute', top: '50%', left: '35%' }}>Please Login to view your wishlist..</h1>)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <TopPortion item="wishlist" />
            <MiddlePortion />
        </>
    )
}

export default Wishlist;