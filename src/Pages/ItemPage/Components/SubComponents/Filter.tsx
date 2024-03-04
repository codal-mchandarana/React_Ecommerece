import { useLoaderData, useRouteLoaderData } from 'react-router-dom'
import Classes from './Filter.module.css'
import { ProductType } from '../../../../Interface/Product';

interface filter{
    len:number,
    handleChange(event: React.ChangeEvent<HTMLSelectElement>):void,
    handleChangeInput(event:React.ChangeEvent<HTMLInputElement>):void
}

const Filter: React.FC<filter> = ({len,handleChange,handleChangeInput}): JSX.Element => {
   
    const data:any = useRouteLoaderData("mainPage");
    let product_value: ProductType[] = data.products;

    let brand_name:string[] = (product_value.map((item)=>{return item.brand})).filter((x,i,a)=>a.indexOf(x)===i)
    brand_name.sort()

    return (
        <>
            <div className={`container ${Classes.spad} mt-2`}>
                <div className="row">
                    <div className="col-lg-3">
                        <div className={Classes.shop__sidebar__search}>
                            <form action="#">
                                <input name='search' onChange={handleChangeInput} type="text" placeholder="Search..." />
                                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-9 mt-2">
                    <div className={Classes.shop__product__option}>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="shop__product__option__left">
                                    <p style={{fontWeight:'bold'}}>Showing {len} results</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className={Classes.shop__product__option__right}>
                                    <p>Sort by Price:</p>
                                    <select name='price' onChange={handleChange} style={{border:"none",cursor:"pointer",fontWeight:'bold'}}>
                                        <option className={Classes.option} value="0">No Choice</option>
                                        <option className={Classes.option} value="1">Low To High</option>
                                        <option className={Classes.option} value="2">High to Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className={Classes.shop__product__option__right}>
                                    <p>Sort by Rating:</p>
                                    <select name='rating' onChange={handleChange} style={{border:"none",cursor:"pointer",fontWeight:'bold'}}>
                                        <option className={Classes.option} value="0">No Choice</option>
                                        <option className={Classes.option} value="1">Low To High</option>
                                        <option className={Classes.option} value="2">High to Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className={Classes.shop__product__option__right}>
                                    <p>Sort by Brand:</p>
                                    <select name='brand' onChange={handleChange} style={{border:"none",cursor:"pointer",fontWeight:'bold',width:'7rem'}}>
                                    <option className={Classes.option} value="No Choice">No Choice</option>
                                    {
                                         brand_name.map((item,index)=>{
                                            return <option key={index} className={Classes.option} value={item}>{item}</option>
                                         })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter