import Card from "./SubComponents/Card"
import Filter from "./SubComponents/Filter";
import { useEffect, useRef, useState } from "react";
import { ProductType } from "../../../Interface/Product";
import { useLoaderData } from "react-router-dom";

interface edit {
    price: string,
    rating: string,
    brand: string,
    last: number
}

const MiddlePortion: React.FC = (): JSX.Element => {

    const data1: any = useLoaderData();
    const [data, setData] = useState<ProductType[]>([])
    const [edit, isEdit] = useState<edit>({ "price": "0", "rating": "0", "brand": "0", last: 0 });

    console.log(edit)

    useEffect(() => {
        setData(data1.products)
    }, [])

    /***********  Filtering the data according to price ***********/

    const sortDataPrice = (type: number, vari: number, arr1: ProductType[]) => {
        let arr: ProductType[] = data;

        if (vari === 1)
            arr = data1.products;
        else if (vari === 2)
            arr = arr1

        arr.sort((item1, item2) => {
            if (type === 1)
                return parseInt(item1.price) - parseInt(item2.price);
            else
                return parseInt(item2.price) - parseInt(item1.price);
        })
        return arr;
    }

    /***********  Filtering the data according to rating ***********/

    const sortDataRating = (type: number, vari: number, arr1: ProductType[]) => {

        let arr: ProductType[] = data;

        if (vari === 1)
            arr = data1.products;
        else if (vari === 2)
            arr = arr1

        arr.sort((item1, item2) => {
            if (type === 1)
                return parseFloat(item1.rating) - parseFloat(item2.rating);
            else
                return parseFloat(item2.rating) - parseFloat(item1.rating);
        })
        return arr;
    }

    /***********  Filtering the data according to brand ***********/

    const brandFiltering = (type: string) => {
        let arr: ProductType[] = data1.products;
        arr = arr.filter(item => item.brand === type)
        return arr;
    }

    const changePrice = (value: string, vari: number = 0, arr1: ProductType[] = []) => {
        const arr: ProductType[] = sortDataPrice(parseInt(value), vari, arr1)
        return arr;
    }

    const changeRating = (value: string, vari: number = 0, arr1: ProductType[] = []) => {
        const arr: ProductType[] = sortDataRating(parseInt(value), vari, arr1);
        return arr;
    }

    /***********  Handle Change logic for Select ***********/

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        isEdit((prev) => { return { ...prev, [name]: value } });

        if (name === "price") {
            if (parseInt(value) === 0) {
                if (edit.rating !== "0") {
                    let arr: ProductType[] = changeRating(edit.rating);
                    setData(prev => [...arr]);
                    isEdit((prev) => { return { ...prev, last: 2 } })
                }
            }
            else {
                let arr: ProductType[] = changePrice(value)
                setData(prev => [...arr]);
                isEdit((prev) => { return { ...prev, last: 1 } })
            }
        }
        else if (name === "rating") {
            if (parseInt(value) === 0) {
                if (edit.price !== "0") {
                    let arr: ProductType[] = changePrice(edit.price);
                    setData(prev => [...arr]);
                    isEdit((prev) => { return { ...prev, last: 1 } })
                }
            }
            else {
                const arr: ProductType[] = changeRating(value);
                setData(prev => [...arr]);
                isEdit((prev) => { return { ...prev, last: 2 } })
            }
        }
        else {
            if (value === "No Choice") {
                if (edit.price !== "0" || edit.rating !== "0") {
                    if (edit.last === 1) {
                        let arr: ProductType[] = changePrice(edit.price, 1);
                        setData(prev => [...arr]);
                        isEdit(prev => { return { ...prev, last: 1 } })
                    }
                    else {
                        const arr: ProductType[] = changeRating(edit.rating, 1);
                        setData(prev => [...arr]);
                        isEdit(prev => { return { ...prev, last: 2 } })
                    }
                    
                }
                else {
                    setData(prev => [...data1.products])
                }
            }
            else {
                isEdit(prev => { return { ...prev, last: 3 } })

                let arr: ProductType[] = brandFiltering(value)
                if (edit.last === 1)
                    arr = changePrice(edit.price, 2, arr)
                else if (edit.last === 2)
                    arr = changeRating(edit.rating, 2, arr);
                setData(prev => [...arr])
            }
        }
    }

    /***********  Handle Change logic for Input ***********/

    const inputChanging = (value: string) => {
        let arr: ProductType[] = data;

        arr = arr.filter((item) => {
            return ((item.title).toLowerCase().includes(value) || (item.brand).toLowerCase().includes(value))
        })

        return arr;
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        let arr: ProductType[];

        if (value === "") {
            arr = data1.products;
            let brand: boolean = false;

            if (edit.brand !== "No Choice" && edit.last !== 0) {
                brand = true;
                arr = brandFiltering(edit.brand)
            }

            if (edit.last === 1) {
                let vari: number = !brand ? 1 : 2;;
                arr = changePrice(edit.price, vari, arr)
            }

            else if (edit.last === 2) {
                let vari: number = !brand ? 1 : 2;
                arr = changeRating(edit.rating, vari, arr)
            }

            else {
                if (edit.last === 3)
                    arr = brandFiltering(edit.brand);
            }

            setData(prev => [...arr])

        }
        else
            arr = inputChanging(value.toLowerCase());

        setData((prev) => {
            return [...arr]
        });
    }

    return (
        <>
            <Filter handleChangeInput={handleChangeInput} handleChange={handleChange} len={data.length} />
            <div className="container">
                <div className="row mt-5 gx-5">
                    {data.map((item) => {
                        return (
                            <Card data={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MiddlePortion