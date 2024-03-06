import { useContext } from "react"
import { CartContext } from "../../Store/CartContextProvider"
import CartItem from "./CardItem"
import { ToastContainer } from "react-toastify"

const Cart: React.FC = (): JSX.Element => {

    const { carts, isLogin } = useContext(CartContext)

    if (!isLogin) {
        return (
            <h1 style={{ position: 'absolute', top: '50%', left: '35%' }}>Please Login to view your cart..</h1>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <div style={{ marginTop: "7rem" }} className="container">
                <div className="row mt-5 gx-5">
                    {carts.map((item) => {
                        return (
                            <CartItem data={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Cart