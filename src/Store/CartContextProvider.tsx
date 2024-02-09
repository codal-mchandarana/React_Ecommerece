import { ReactElement, createContext, useState } from "react";
import { ProductType } from "../Interface/Product";

/* Creating a Context */

interface cartItems {
    carts: ProductType[],
    renderCart: ProductType[],
    SetItemvalues(items: ProductType[]): void,
    AddItemCarts(item: ProductType): void,
    editrenderitems(item: ProductType[]): void
}

/* Creating a context */

export const CartContext = createContext<cartItems>({
    carts: [],
    renderCart: [],
    SetItemvalues: () => { },
    AddItemCarts: () => { },
    editrenderitems: () => { }
});



/* Creating a context provider component */

type Props = {
    children: JSX.Element,
};
const CartContextProvider: React.FC<Props> = ({ children }): JSX.Element => {

    const [items, editItems] = useState<ProductType[]>([])
    const [renderitems, editrenderitems] = useState<ProductType[]>([])

    const AddItemCarts = (item: ProductType): void => {
        editItems((prevItems) => { return [...prevItems, item] })
    }

    const SetItemvalues = (items: ProductType[]): void => {
        editItems(items)
    }

    const editRenderItems = (items: ProductType[]): void => {
        editrenderitems(items)
    }

    const ctxValue: cartItems = {
        carts: items,
        renderCart: renderitems,
        AddItemCarts: AddItemCarts,
        SetItemvalues: SetItemvalues,
        editrenderitems: editRenderItems
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;