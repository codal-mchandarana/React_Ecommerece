import Card from "./SubComponents/Card"
import Filter from "./SubComponents/Filter";
import { useEffect, useState } from "react";
import { ProductType } from "../../../Interface/Product";
import { useLoaderData } from "react-router-dom";

interface edit {
    price: string,
    rating: string,
    last: number
}

const MiddlePortion: React.FC = (): JSX.Element => {

    const data1: any = useLoaderData();
    const [data, setData] = useState<ProductType[]>([])
    const [edit, isEdit] = useState<edit>({ "price": "0", "rating": "0", last: 0 });

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
        setData(prev => [...arr]);
    }

    const changeRating = (value: string, vari: number = 0, arr1: ProductType[] = []) => {
        const arr: ProductType[] = sortDataRating(parseInt(value), vari, arr1)
        setData(prev => [...arr]);
    }

    /***********  Handle Change logic ***********/

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        isEdit((prev) => {
            return { ...prev, [name]: value }
        });

        if (name === "price") {
            if (parseInt(value) === 0) {
                if (edit.rating !== "0") {
                    changeRating(edit.rating)
                    isEdit((prev) => {
                        return { ...prev, last: 2 }
                    })
                }
            }
            else {
                changePrice(value)
                isEdit((prev) => {
                    return { ...prev, last: 1 }
                })
            }
        }
        else if (name === "rating") {
            if (parseInt(value) === 0) {
                if (edit.price !== "0") {
                    changePrice(edit.price);
                    isEdit((prev) => {
                        return { ...prev, last: 1 }
                    })
                }
            }
            else {
                changeRating(value);
                isEdit((prev) => {
                    return { ...prev, last: 2 }
                })
            }
        }
        else {
            if (value === "No Choice") {
                if (edit.price !== "0" || edit.rating !== "0") {
                    if (edit.last === 1) {
                        console.log("Hi")
                        changePrice(edit.price, 1)
                    }
                    else
                        changeRating(edit.rating, 1)
                }
                else {
                    setData(prev => [...data1.products])
                }
            }
            else {
                const arr: ProductType[] = brandFiltering(value)
                if (edit.last === 1)
                    changePrice(edit.price, 2, arr)
                else if (edit.last === 2)
                    changeRating(edit.rating, 2, arr);
                setData(prev => [...arr])
            }
        }
    }

    return (
        <>
            <Filter handleChange={handleChange} len={data.length} />
            <div className="container">
                <div className="row mt-5 gx-5">
                    {data.map((item) => {
                        return (
                            <Card
                                id={item.id}
                                key={parseInt(item.id)}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                rating={item.rating}
                                brand={item.brand}
                                images={item.images}

                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MiddlePortion