import { createContext, useState } from "react";
import { ProductType } from "../Interface/Product";

/* Creating a Context */

interface wishListItems {
    wishlistItems:ProductType[],
    SetWishlistvalues(items:ProductType[]):void,
    AddItemsWishlist(item:ProductType):void,
}

/* Creating a context */

export const WishlistContext = createContext<wishListItems>({
    wishlistItems: [],
    SetWishlistvalues:()=>{ },
    AddItemsWishlist:()=>{ },
});

/* Creating a context provider component */

type Props = {
    children: JSX.Element,
};
const WishlistContextProvider: React.FC<Props> = ({ children }): JSX.Element => {
    const [wishlistItems, setWishlistItems] = useState<ProductType[]>([])

    const AddItemsWishlist = (item: ProductType): void => {
        const newobj = {...item,qty:1};
        setWishlistItems(prevItems => [...prevItems, newobj])
    }

    const SetWishlistvalues = (items: ProductType[]): void => {
        setWishlistItems(items)
    }

    const ctxValue: wishListItems = {
        wishlistItems,
        AddItemsWishlist,
        SetWishlistvalues,
    }

    return (
        <WishlistContext.Provider value={ctxValue}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider;