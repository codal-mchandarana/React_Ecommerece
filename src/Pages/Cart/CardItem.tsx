import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../Interface/Product';
import { CartContext } from '../../Store/CartContextProvider';
import Classes from '../ItemPage/Components/SubComponents/Card.module.css'
import { useContext } from 'react';
import { success } from '../../Toast/toast';
import calculateOriginalPrice from '../../utils/Calculate';

const List = (rating: string) => {

    const renderList = () => {
        const listItems = [];
        let iteration: number = Math.round(parseInt(rating))

        for (let index = 0; index < iteration; index++) {
            listItems.push(<i style={{ color: "#FF9529" }} className="fa-solid fa-star"></i>)
        }

        for (let index = 0; index < 5 - iteration; index++) {
            listItems.push(<i className="fa-regular fa-star"></i>)
        }
        return listItems;
    }

    return renderList()
}

interface card {
    data: ProductType,
}

const CartItem: React.FC<card> = ({ data }): JSX.Element => {

    const { DeleteItemCarts } = useContext(CartContext);
    const navigate = useNavigate()

    const handleDeleteClick = (id: number) => {
        DeleteItemCarts(id);
        success("Item removed SuccessFully !!")
    }

    const handlePdpClick = (id: string) => {
        navigate(`/pdp/${id}`)
    }

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className={Classes.product__item}>
                <div className={Classes.product__item__pic}>
                    <img onClick={() => { handlePdpClick(data.id) }} className={Classes.img} src={`${data.images[0]}`} alt="" />
                </div>
                <div className={Classes.product__item__text}>
                    <h6>{data.title}</h6>
                    <a onClick={() => { handleDeleteClick(parseInt(data.id)) }} href="#!">- Remove from Cart</a>
                    <div className={Classes.rating}>
                        {List(data.rating)}
                    </div>
                    <p>{data.description.slice(0, 50)}...</p>
                    <p>{data.brand}</p>
                    <h5><span style={{ textDecoration: "line-through" }}>&#8377;{data.price}</span><span style={{ color: "red" }}> &#8377;{calculateOriginalPrice(data.price, data.discountPercentage).toFixed(2)}</span></h5>
                </div>
            </div>
        </div>

    )
}
export default CartItem;