import { createContext, useState } from "react";
import { ProductType } from "../Interface/Product";

/* Creating a Context */

interface cartItems {
    carts: ProductType[],
    isLogin: boolean,
    setIslogin(value: boolean): void,
    isAuthorised(): void,
    SetItemvalues(items: ProductType[]): void,
    AddItemCarts(item: ProductType): void,
    DeleteItemCarts(id: number): void
}

/* Creating a context */

export const CartContext = createContext<cartItems>({
    carts: [],
    isLogin: false,
    setIslogin: () => { },
    isAuthorised: () => { },
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
    const [login, setIslogin] = useState(false);

    const AddItemCarts = (item: ProductType): void => {
        editItems(prevItems => [...prevItems, item])
    }

    const DeleteItemCarts = (id: number): void => {
        editItems(prevItems => prevItems.filter((item) => parseInt(item.id) !== id))
    }

    const SetItemvalues = (items: ProductType[]): void => {
        editItems(items)
    }

    const setislogin = (value: boolean): void => {
        setIslogin(value)
    }
    const isAuthorised = (): void => {
        let token = localStorage.getItem('token');

        if (token) {
            fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (res.status !== 200)
                        throw new Error('invalid token')
                    else
                        setIslogin(true);
                })
                .catch(error => {
                    console.log(error)
                    setIslogin(false);
                    localStorage.removeItem('token')
                })
        }
    }

    const ctxValue: cartItems = {
        carts: items,
        isLogin: login,
        isAuthorised,
        setIslogin: setislogin,
        AddItemCarts: AddItemCarts,
        SetItemvalues: SetItemvalues,
        DeleteItemCarts: DeleteItemCarts
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;