import { createContext, useState } from "react";
import { ProductType } from "../Interface/Product";
import calculateOriginalPrice from "../utils/Calculate";
import Cookies from 'js-cookie';

/* Creating a Context */

interface cartItems {
    carts: ProductType[],
    isLogin: boolean,
    setIslogin(value: boolean): void,
    isAuthorised(): boolean,
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
    isAuthorised: () => false,
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
    // let arr: ProductType[] = [];

    const [items, editItems] = useState<ProductType[]>([])
    const [login, setIslogin] = useState(false);
    const [price, changePrice] = useState<number>(0);


    const AddItemCarts = (item: ProductType): void => {
        const newobj = {...item,qty:1};
        editItems(prevItems => [...prevItems, newobj])
        let tempArr = items
        tempArr.push(newobj)

        let price: number = parseInt(item.price)
        if (item.discountPercentage)
            price = calculateOriginalPrice(item.price, item.discountPercentage);

        changePrice((prev) => prev + price);
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
    }

    const SetItemvalues = (items: ProductType[]): void => {
        let TotalPrice = calculateTotalPrice(items);
        changePrice(TotalPrice);
        editItems(items)
    }

    const calculateTotalPrice = (items: ProductType[]):number=>{
        let TotalPrice = 0

        for (const element of items) {
            let tempPrice: number = parseInt(element.price);
            if (element.discountPercentage)
                tempPrice = calculateOriginalPrice(element.price, element.discountPercentage);
            TotalPrice += (tempPrice * element.qty)
        }
        return TotalPrice;
    }

    const setislogin = (value: boolean): void => {
        setIslogin(value)
    }
    const isAuthorised = (): boolean => {
        let token = Cookies.get('accessToken');

        if(token) {
            return true;
        }
        return false;

        // if (token) {
        //     fetch('https://dummyjson.com/auth/me', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //         },
        //     })
        //         .then(res => {
        //             if (res.status !== 200)
        //                 throw new Error('invalid token')
        //             else
        //                 setIslogin(true);
        //         })
        //         .catch(error => {
        //             setIslogin(false);
        //             localStorage.removeItem('token')
        //         })
        // }
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