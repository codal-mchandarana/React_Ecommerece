import Classes from "./ProductSlider.module.css";
import calculate from "../../utils/Calculate";

const SliderItem:React.FC<{active:string,data:any}> = ({active,data}):JSX.Element=>{
    console.log('sjflsjfd',data)

    return <div className={`carousel-item ${active}`}>
        <div className={`${Classes.cards_wrapper_default} cards_wrapper`}>
            {
                data.map((product:any,index:number)=>{

                    return (
                        <div className={`card ${Classes.card1}`}>
                            <img src={product.images[0]}
                                 className="card-img-top w-100 object-fit-cover" alt="..."/>
                            <div style={{borderTop:"1px solid gray"}} className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                {/*<h6 style={{color:"red"}} className="card-title">{product.brand}</h6>*/}
                                <h6 style={{color:"red"}} className="card-title">${calculate(product.price,product.discountPercentage)}</h6>
                                <p className="card-text">{product.description.slice(0,50)}...</p>
                                <a style={{width:"60%",margin:"auto"}} href="#" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                    )
                })
            }
            {/*<div className={`card ${Classes.card1}`}>*/}
            {/*    <img src="https://cdn.dummyjson.com/product-images/80/1.jpg"*/}
            {/*         className="card-img-top w-100 object-fit-cover" alt="..."/>*/}
            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">Card title</h5>*/}
            {/*        <p className="card-text">Some quick example text to build on the card title and make up*/}
            {/*            the bulk of the card's content.</p>*/}
            {/*        <a href="#" className="btn btn-dark">Go somewhere</a>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className={`card ${Classes.card1}`}>*/}
            {/*    <img src="https://cdn.dummyjson.com/product-images/7/1.jpg"*/}
            {/*         className="card-img-top w-100 object-fit-cover" alt="..."/>*/}
            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">Card title</h5>*/}
            {/*        <p className="card-text">Some quick example text to build on the card title and make up*/}
            {/*            the bulk of the card's content.</p>*/}
            {/*        <a href="#" className="btn btn-dark">Go somewhere</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={`card ${Classes.card1}`}>*/}
            {/*    <img src="https://cdn.dummyjson.com/product-images/8/1.jpg"*/}
            {/*         className="card-img-top w-100 object-fit-cover" alt="..."/>*/}
            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">Card title</h5>*/}
            {/*        <p className="card-text">Some quick example text to build on the card title and make up*/}
            {/*            the bulk of the card's content.</p>*/}
            {/*        <a href="#" className="btn btn-dark">Go somewhere</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={`card ${Classes.card1} d-none d-md-block`}>*/}
            {/*    <img src="https://cdn.dummyjson.com/product-images/7/2.jpg"*/}
            {/*         className="card-img-top w-100 object-fit-cover" alt="..."/>*/}
            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">Card title</h5>*/}
            {/*        <p className="card-text">Some quick example text to build on the card title and make up*/}
            {/*            the bulk of the card's content.</p>*/}
            {/*        <a href="#" className="btn btn-dark">Go somewhere</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={`card ${Classes.card1} d-none d-md-block`}>*/}
            {/*    <img src="https://cdn.dummyjson.com/product-images/8/3.jpg"*/}
            {/*         className="card-img-top w-100 object-fit-cover" alt="..."/>*/}
            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">Card title</h5>*/}
            {/*        <p className="card-text">Some quick example text to build on the card title and make up*/}
            {/*            the bulk of the card's content.</p>*/}
            {/*        <a href="#" className="btn btn-dark">Go somewhere</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </div>
}
export default SliderItem;