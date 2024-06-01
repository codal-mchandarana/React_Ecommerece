import { useContext } from "react"
import { CartContext } from "../../Store/CartContextProvider"
import CartItem1 from "./CartItem1"
import CartFooter from "./CartFooter"
import CartCheckout from "./CartCheckout"
import { ToastContainer } from "react-toastify"
import CartHeader from "./CartHeader"

const Cart: React.FC = (): JSX.Element => {

    const { carts, isLogin } = useContext(CartContext);
    console.log(carts)

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
            <CartHeader />
            {/* <div style={{ marginTop: "7rem" }} className="container">
                <div className="row mt-5 gx-5">
                    {carts.map((item) => {
                        return (
                            <CartItem data={item} />
                        )
                    })}
                </div>
            </div> */}

            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div  className="col-md-8">
                            <div  style={{boxShadow:"0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)"}} className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {carts.length} {carts.length === 1 ? "item" : "items"}</h5>
                                </div>

                                <div className="card-body">
                                    {/* Single item */}
                                    <div className="container">
                                        <div className="row mt-2 gx-5">
                                            {carts.map((item) => {
                                                return (
                                                    <>
                                                        <CartItem1 key={Math.ceil(Math.random()*10000)} data={item} />
                                                        <hr className="my-4" />
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    {/* Single item */}
                                </div>
                            </div>
                            <CartFooter />
                        </div>
                        <CartCheckout />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart