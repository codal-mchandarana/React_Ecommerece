import Classes from "./Wishlist.module.css";
import calculateOriginalPrice from "../../utils/Calculate";
import {ProductType} from "../../Interface/Product";
import {useNavigate} from "react-router-dom";

interface wishlistItem {
    data: ProductType,
    handleDeleteClick:any,
    handleMoveToCart:any
}

const WishListItems:React.FC<wishlistItem> = ({data,handleDeleteClick,handleMoveToCart})=>{

    const navigate = useNavigate();
    const handlePdpClick = (id: string) => {
        navigate(`/pdp/${id}`)
    }
    return (
        <>
            <div className={Classes.wishlist_body}>
                <div className={Classes.wishlist_item}>
                    <div className={Classes.product_info}>
                        <img style={{cursor:'pointer'}} onClick={()=>{handlePdpClick(data.id)}} src={data.images[0]} alt="product name"/>
                        <div style={{marginLeft: '1rem'}} className={Classes.product_details}>
                            <span>{data.title}</span>
                            <span className={Classes.variant}>{data.brand}</span>
                            <span className={Classes.quantity}>{(data.description).slice(0, 30)}...</span>
                        </div>
                    </div>
                    <div className={Classes.product_cost}><span
                        style={{textDecoration: "line-through"}}>&#8377;{data.price}</span><span
                        style={{color: "red"}}> &#8377;{calculateOriginalPrice(data.price, data.discountPercentage).toFixed(2)}</span>
                    </div>
                    <div className={Classes.actions}>
                        <span onClick={()=>{handleDeleteClick(data.id)}} className={`${Classes.action} text-danger`}>Remove Item</span>
                    </div>
                    <div className={Classes.actions}>
                    <span onClick={()=>{handleMoveToCart(data.id)}} className={`${Classes.action} text-success`}>Move to Cart</span>
                    </div>
                        
                </div>
            </div>
        </>
    )
}

export default WishListItems;