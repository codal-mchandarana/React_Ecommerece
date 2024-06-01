import { createContext, useEffect, useState } from "react";
import { ProductType } from "../Interface/Product";
import calculateOriginalPrice from "../utils/Calculate";

/* Creating a Context */

interface cartItems {
    carts: ProductType[],
    isLogin: boolean,
    setIslogin(value: boolean): void,
    isAuthorised(): void,
    SetItemvalues(items: ProductType[]): void,
    AddItemCarts(item: ProductType): void,
    DeleteItemCarts(id: number): void,
    TotalPrice: number,
    ChangeTotalPrice(price: number, type: number): void
}

/* Creating a context */

export const CartContext = createContext<cartItems>({
    carts: [],
    isLogin: false,
    setIslogin: () => { },
    isAuthorised: () => { },
    SetItemvalues: () => { },
    AddItemCarts: () => { },
    DeleteItemCarts: () => { },
    TotalPrice: 0,
    ChangeTotalPrice: () => { },
});

/* Creating a context provider component */

type Props = {
    children: JSX.Element,
};
const CartContextProvider: React.FC<Props> = ({ children }): JSX.Element => {
    let arr: ProductType[] = [];

    const [items, editItems] = useState<ProductType[]>(arr)
    const [login, setIslogin] = useState(false);
    const [price, changePrice] = useState<number>(0);


    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        let tempoArr = localStorage.getItem(currentUser);
        if (tempoArr)
            arr = JSON.parse(tempoArr);
    }

    useEffect(() => {
        let TotalPrice: number = 0;

        for (const element of arr) {
            let tempPrice: number = parseInt(element.price);
            if (element.discountPercentage)
                tempPrice = calculateOriginalPrice(element.price, element.discountPercentage);
            TotalPrice += (tempPrice * element.qty)
        }
        changePrice(TotalPrice);
        editItems(prev => arr)
    }, [login])


    const AddItemCarts = (item: ProductType): void => {
        const newobj = {...item,qty:1};
        editItems(prevItems => [...prevItems, newobj])
        let tempArr = items
        tempArr.push(newobj)

        let price: number = parseInt(item.price)
        if (item.discountPercentage)
            price = calculateOriginalPrice(item.price, item.discountPercentage);

        changePrice((prev) => prev + price);

        if (currentUser)
            localStorage.setItem(currentUser, JSON.stringify(tempArr));
    }

    const DeleteItemCarts = (id: number): void => {
        const item: any = items.find((element) => parseInt(element.id) === id)
        editItems(prevItems => prevItems.filter((item) => parseInt(item.id) !== id));
        let tempArr = items;
        tempArr = tempArr.filter((item) => parseInt(item.id) !== id);

        let price: number = parseInt(item.price)
        if (item.discountPercentage)
            price = calculateOriginalPrice(item.price, item.discountPercentage);

        changePrice((prev) => prev - (price * item.qty));

        if (currentUser)
            localStorage.setItem(currentUser, JSON.stringify(tempArr));
    }

    const SetItemvalues = (items: ProductType[]): void => {
        let TotalPrice = 0
        console.log(items)
        for (const element of items) {
            console.log(element)
            let tempPrice: number = parseInt(element.price);
            if (element.discountPercentage)
                tempPrice = calculateOriginalPrice(element.price, element.discountPercentage);
            TotalPrice += (tempPrice * element.qty)
        }
        changePrice(TotalPrice);
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

    const ChangePrice = (price: number, type: number) => {
        if (type === 1)
            changePrice((prev) => { return prev + price; })
        else if (type === 2)
            changePrice((prev) => { return prev - price })
    }

    const ctxValue: cartItems = {
        carts: items,
        isLogin: login,
        isAuthorised,
        setIslogin: setislogin,
        AddItemCarts: AddItemCarts,
        SetItemvalues: SetItemvalues,
        DeleteItemCarts: DeleteItemCarts,
        TotalPrice: price,
        ChangeTotalPrice: ChangePrice,
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;