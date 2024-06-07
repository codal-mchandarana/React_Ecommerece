import Classes from './Wishlist.module.css'
import {useContext} from "react";
import {WishlistContext} from "../../Store/WishlistContextProvider";
import WishListItems from "./WishListItems";
import {fetchCart, fetchWishlist, moveTocartFromWishlist, removeFromWishlistApi} from "../../axios/api";
import {CartContext} from "../../Store/CartContextProvider";
import {success} from "../../Toast/toast";
import {toast} from "react-toastify";
import error = toast.error;

const MiddlePortion:React.FC = ():JSX.Element=>{

    const {wishlistItems,SetWishlistvalues} = useContext(WishlistContext);
    const {SetItemvalues} = useContext(CartContext);
    const handleDeleteClick = async(product_id:any)=>{
        const response = await removeFromWishlistApi(product_id);
        if(response.status===200){
            const wishListItems = await fetchWishlist();
            SetWishlistvalues(wishListItems);
            success("Item removed Successfully !!")
        }else
            error("SOME ERROR OCCURED")
    }

    const handleMoveToCart = async(product_id:any)=>{
        try {
            const response = await moveTocartFromWishlist(product_id);
            if(response.status===200){
                success("Item moved to cart Successfully !!");
                const wishListItems = await fetchWishlist();
                const items = await fetchCart();
                SetItemvalues(items);
                SetWishlistvalues(wishListItems);
            }else
                throw new Error();
        }catch (err) {
            console.log(err);
            error("SOME ERROR OCCURED");
        }
    }

    return (
        <>
            <div className={Classes.body}>
                <div className={`${Classes.container} `}>
                    {/*<div className={Classes.heading}>MY TOP BEANIE - 3/30/2024</div>*/}
                    <div className={Classes.wishlist_header}>
                        <div>{wishlistItems.length} ITEM IN YOUR WISH LIST</div>
                        <div>COST</div>
                        <div>DELETE</div>
                        <div>MOVE</div>
                    </div>
                    {wishlistItems.map((value)=>{
                        return <WishListItems data={value} handleDeleteClick={handleDeleteClick} handleMoveToCart={handleMoveToCart} />
                    })}
                    <div className={Classes.add_to_cart}>
                        <button type="submit">ADD ALL ITEMS TO SHOPPING CART</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiddlePortion;