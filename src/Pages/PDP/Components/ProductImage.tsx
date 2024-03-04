import Classes from './ProductImage.module.css'
import { ProductType } from '../../../Interface/Product';
import calculateOriginalPrice from '../../../utils/Calculate';
import { useContext, useState } from 'react';
import { CartContext } from '../../../Store/CartContextProvider';
import { useNavigate } from 'react-router-dom';

interface product {
    currentProduct: ProductType
}

const ProductImage: React.FC<product> = ({ currentProduct }): JSX.Element => {

    const [selected, setSelected] = useState(0);
    const {isLogin} = useContext(CartContext);
    const Navigate = useNavigate()

    let discount_price: number = 0;

    const onClick = ()=>{
        if(!isLogin)
           Navigate('/login');
        else  
           console.log("Hello")
    }


    const Price_block = () => {
        const price = calculateOriginalPrice(currentProduct.price, currentProduct.discountPercentage);
        discount_price = price

        if (currentProduct.discountPercentage) {
            return <span>₹ {price} </span>
        }
        return <span>₹ {currentProduct.price}</span>
    }

    const Rating_block = () => {
        const listItems = [];
        let iteration: number = Math.floor(parseInt(currentProduct.rating))

        for (let index = 0; index < iteration; index++) {
            listItems.push(<span className={`fa fa-star ${Classes.checked}`}></span>)
        }

        for (let index = 0; index < 5 - iteration; index++) {
            listItems.push(<span className="fa fa-star"></span>)
        }
        return listItems;
    }

    return (
        <div style={{ fontFamily: "open sans", marginTop: "3rem", marginBottom: "3rem" }} className="container">
            <div className={`card ${Classes.mainContain}`}>
                <div className="container-fluid">
                    <div className={`pt-4 wrapper row ${Classes.main_contain}`}>
                        <div className={`${Classes.preview} col-md-6`}>

                            <div className={`${Classes.preview_pic} tab-content`}>
                                <div className={`tab-pane ${selected === 0 && 'active'}`} id="pic-1"><img style={{ width: "100%",objectFit:'contain' }} alt='product-1' className={Classes.pic} src={currentProduct.images[0]} /></div>
                                <div className={`tab-pane ${selected === 1 && 'active'}`} id="pic-2"><img alt='product-2' style={{ width: "100%" }} className={Classes.pic} src={currentProduct.images[1]} /></div>
                                <div className={`tab-pane ${selected === 2 && 'active'}`} id="pic-3"><img alt='product-3' style={{ width: "100%" }} className={Classes.pic} src={currentProduct.images[2]} /></div>
                                <div className={`tab-pane ${selected === 3 && 'active'}`} id="pic-4"><img alt='product-4' style={{ width: "100%" }} className={Classes.pic} src={currentProduct.images[3]} /></div>
                            </div>
                            <ul className={`${Classes.preview_thumbnail} nav ${Classes.nav_tabs}`}>
                                <li style={{ border: selected === 0 ? "2px solid gray" : "none" }} onClick={() => { setSelected(0) }} className="active"><a href='#!' data-target="#pic-1" data-toggle="tab"><img alt='product-1' className={Classes.boxPic} src={currentProduct.images[0]} /></a></li>
                                <li style={{ border: selected === 1 ? "2px solid gray" : "none" }} onClick={() => { setSelected(1) }}><a href='#!' data-target="#pic-2" data-toggle="tab"><img alt='product-2' className={Classes.boxPic} src={currentProduct.images[1]} /></a></li>
                                <li style={{ border: selected === 2 ? "2px solid gray" : "none" }} onClick={() => { setSelected(2) }}><a href='#!' data-target="#pic-3" data-toggle="tab"><img alt='product-3' className={Classes.boxPic} src={currentProduct.images[2]} /></a></li>
                                <li onClick={() => { setSelected(3) }} style={{ position: "relative", left: "0.5rem", border: selected === 3 ? "2px solid gray" : "none" }}><a href='#!' data-target="#pic-4" data-toggle="tab"><img alt='product-4' className={Classes.boxPic} src={currentProduct.images[3]} /></a></li>
                            </ul>
                        </div>
                        <div style={{ padding: "2rem 0" }} className={`${Classes.details} col-md-6`}>
                            <h3 style={{ textTransform: "none" }} className={Classes.product_title}>{(currentProduct.title)} :- {currentProduct.category[0].toUpperCase() + currentProduct.category.slice(1)}</h3>
                            <span style={{ position: "relative", bottom: "1rem" }}>By :- <a href="">{currentProduct.brand}</a></span>

                            
                            <div className={Classes.rating}>
                                <div className="stars">
                                    {Rating_block()}
                                </div>
                            </div>

                            <h5 style={{ width: "80%" }} className={Classes.product_description}> {currentProduct.description}</h5>

                            <hr style={{ width: "80%" }} />
                            <h3 style={{ fontWeight: 'bold' }}>Retail Price: <span style={{ textDecoration: "line-through", fontWeight: '100' }}> ₹{currentProduct.price}</span></h3>
                            <h3 style={{ textTransform: 'none' }} className={Classes.price}> Price: {Price_block()}</h3>
                            <p style={{ fontSize: '1.1rem' }}>You Save : <span style={{ color: "red", fontWeight: 'bold' }}>₹{(parseInt(currentProduct.price) - discount_price).toFixed(2)} ({currentProduct.discountPercentage}%)</span></p>

 
                            <hr style={{ width: "80%", position: "relative", bottom: "1rem" }} />

                            <div style={{position:"relative",right:"0.7rem"}} className="action">
                                <button onClick={onClick} className={`${Classes.like} ${Classes.add_to_cart} btn ${Classes.btn_default}`} type="button"><i style={{marginRight:"0.6rem"}} className="fa-solid fa-cart-shopping"></i>ADD TO CART</button>
                                <button className={`${Classes.like} btn ${Classes.btn_default}`} type="button"><span className="fa fa-heart"></span></button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductImage;