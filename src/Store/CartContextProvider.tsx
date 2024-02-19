import { createContext, useEffect, useState } from "react";
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
    let arr: ProductType[] = [];
    const [items, editItems] = useState<ProductType[]>(arr)
    const [login, setIslogin] = useState(false);

    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        let tempoArr = localStorage.getItem(currentUser);
        if (tempoArr)
           arr = JSON.parse(tempoArr);
    }

    useEffect(()=>{
        editItems(prev=>arr)
    },[login])


    const AddItemCarts = (item: ProductType): void => {
        editItems(prevItems => [...prevItems, item])
        let tempArr = items
        tempArr.push(item)

        if (currentUser)
            localStorage.setItem(currentUser, JSON.stringify(tempArr));
    }

    const DeleteItemCarts = (id: number): void => {
        editItems(prevItems => prevItems.filter((item) => parseInt(item.id) !== id));
        let tempArr = items;
        tempArr = tempArr.filter((item)=>parseInt(item.id)!==id);
        if (currentUser)
            localStorage.setItem(currentUser, JSON.stringify(tempArr));
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