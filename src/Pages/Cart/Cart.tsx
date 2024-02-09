import { useContext } from "react"
import { CartContext } from "../../Store/CartContextProvider"
import CartItem from "./CardItem"

const Cart: React.FC = (): JSX.Element => {

    const { carts } = useContext(CartContext)

    return (
        <div style={{marginTop:"7rem"}} className="container">
            <div className="row mt-5 gx-5">
                {carts.map((item) => {
                    return (
                        <CartItem data={item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Cart