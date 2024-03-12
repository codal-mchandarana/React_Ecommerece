import { useContext, useState } from "react";
import { ProductType } from "../../Interface/Product";
import calculateOriginalPrice from "../../utils/Calculate";
import { CartContext } from "../../Store/CartContextProvider";
import { useNavigate } from "react-router-dom";
import { success } from "../../Toast/toast";

interface card {
    data: ProductType,
    key:number
}

const CartItem1: React.FC<card> = ({key, data }): JSX.Element => {

    const { DeleteItemCarts, carts,ChangeTotalPrice } = useContext(CartContext);
    const navigate = useNavigate()

    const [counter, setCounter] = useState(data.qty);

    const changeLocalStorage = () => {
        let currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem(currentUser, JSON.stringify(carts));
        }
    }

    const calculatePrice = ():number=>{
        if(data.discountPercentage)
           return parseInt(calculateOriginalPrice(data.price,data.discountPercentage).toFixed(2));
        
        return parseInt(data.price)
    }

    const handleDeleteClick = (id: number) => {
        DeleteItemCarts(id);
        success("Item removed SuccessFully !!")
    }

    const handlePdpClick = (id: string) => {
        navigate(`/pdp/${id}`)
    }

    const Decrement = () => {
        if (counter > 1) {
            setCounter(counter - 1)
            data.qty = data.qty - 1;
            changeLocalStorage()
            ChangeTotalPrice(calculatePrice(),2)
        }
    }
    const Increment = () => {
        setCounter(counter + 1)
        data.qty = data.qty + 1;
        changeLocalStorage()
        ChangeTotalPrice(calculatePrice(),1)
    }

    return (
        <>
            <div key={key} className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    {/* Image */}
                    <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                    >
                        <img
                            src={data.images[0]}
                            className="w-100 object-fit-contain"
                            style={{ cursor: "pointer", height: "10rem" }}
                            alt={data.title}
                            onClick={() => { handlePdpClick(data.id) }}
                        />
                        <a href="#!">
                            <div
                                className="mask"
                                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                            />
                        </a>
                    </div>
                    {/* Image */}
                </div>
                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    {/* Data */}
                    <p><strong>{data.title}</strong></p>
                    <p>Brand: {data.brand}</p>
                    <p className="w-75">Discount: {data.discountPercentage}%</p>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => { handleDeleteClick(parseInt(data.id)) }}
                    >
                        <i className="fas fa-trash" />
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm mb-2"
                        data-mdb-toggle="tooltip"
                        title="Move to the wish list"
                    >
                        <i className="fas fa-heart" />
                    </button>
                    {/* Data */}
                </div>
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    {/* Quantity */}
                    <div className="d-flex mb-4" style={{ width: '300', height: '40px' }}>
                        <button onClick={Decrement} style={{ borderRadius: "45%" }} className="btn btn-danger me-2 ">
                            <i className="fas fa-minus" />
                        </button>
                        <div style={{ width: "3rem" }} className="form-outline">
                            <p className="form-control pl-5"><span style={{ marginLeft: "5px" }}>{counter}</span></p>
                            <label className="form-label" htmlFor="form1">
                                Quantity
                            </label>
                        </div>
                        <button onClick={Increment} style={{ borderRadius: "45%" }} className="btn btn-success ms-2">
                            <i className="fas fa-plus" />
                        </button>
                    </div>
                    {/* Quantity */}
                    {/* Price */}
                    <p style={{ position: 'relative', top: "1.5rem", right: "3.5rem" }} className="text-center">
                        <strong><span style={{ textDecoration: "line-through" }}>&#8377;{data.price}</span><span style={{ color: "red" }}> &#8377;{calculateOriginalPrice(data.price, data.discountPercentage).toFixed(2)}</span></strong>
                    </p>
                    {/* Price */}
                </div>
            </div>

        </>
    )
}

export default CartItem1;