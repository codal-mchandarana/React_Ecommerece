import { ReactElement, createContext, useState } from "react";
import { ProductType } from "../Interface/Product";

/* Creating a Context */

interface cartItems {
    carts: ProductType[],
    SetItemvalues(items: ProductType[]): void,
    AddItemCarts(item: ProductType): void,
    DeleteItemCarts(id: number): void
}

/* Creating a context */

export const CartContext = createContext<cartItems>({
    carts: [],
    SetItemvalues: () => { },
    AddItemCarts: () => { },
    DeleteItemCarts: () => { }
});



/* Creating a context provider component */

type Props = {
    children: JSX.Element,
};
const CartContextProvider: React.FC<Props> = ({ children }): JSX.Element => {

    const [items, editItems] = useState<ProductType[]>([])
    console.log(items)

    const AddItemCarts = (item: ProductType): void => {
        editItems(prevItems => [...prevItems, item])
    }

    const DeleteItemCarts = (id: number): void => {
        editItems(prevItems =>  prevItems.filter((item) => parseInt(item.id) !== id))
    }

    const SetItemvalues = (items: ProductType[]): void => {
        editItems(items)
    }

    const ctxValue: cartItems = {
        carts: items,
        AddItemCarts: AddItemCarts,
        SetItemvalues: SetItemvalues,
        DeleteItemCarts:DeleteItemCarts
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;