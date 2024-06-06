import Classes from './ProductSlider.module.css'
import SliderItem from "./SliderItem";
import {useEffect, useState} from "react";
import {fetchItems} from "../../axios/api";

const ProductSlider:React.FC = ():JSX.Element=>{

    const [data,setData] = useState([]);

    useEffect(() => {
        const fn = async()=>{
            let newData = await fetchItems(0,80);
            setData(newData);
        }
        fn();

    }, [])

    return <>
        <div className={Classes.container}>
            <div className={Classes.text}>GIFTS UNDER $100</div>
            <div id="carouselExampleControls" className={`${Classes.carousel1} carousel slide`} data-ride="carousel">
                <div className={`carousel_inner ${Classes.carousel_inner_1}`}>
                    <SliderItem active={'active'} data={data.slice(5,9)}/>
                    <SliderItem active={''} data={data.slice(1,5)}/>
                    {/*<SliderItem active={''}/>*/}
                    {/*<SliderItem active={''}/>*/}
                    {/*<div className="carousel-item">*/}
                    {/*    <div className={`${Classes.cards_wrapper_default} cards_wrapper`}>*/}
                    {/*        <div className={`card ${Classes.card1} `}>*/}
                    {/*            <img src="..." className="card-img-top" alt="..."/>*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5 className="card-title">Card title</h5>*/}
                    {/*                <p className="card-text">Some quick example text to build on the card title and make up*/}
                    {/*                    the bulk of the card's content.</p>*/}
                    {/*                <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className={`card ${Classes.card1} `}>*/}
                    {/*            <img src="..." className="card-img-top" alt="..."/>*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5 className="card-title">Card title</h5>*/}
                    {/*                <p className="card-text">Some quick example text to build on the card title and make up*/}
                    {/*                    the bulk of the card's content.</p>*/}
                    {/*                <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className={`card ${Classes.card1} `}>*/}
                    {/*            <img src="..." className="card-img-top" alt="..."/>*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5 className="card-title">Card title</h5>*/}
                    {/*                <p className="card-text">Some quick example text to build on the card title and make up*/}
                    {/*                    the bulk of the card's content.</p>*/}
                    {/*                <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className={`card ${Classes.card1}`}>*/}
                    {/*            <img src="..." className="card-img-top" alt="..."/>*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5 className="card-title">Card title</h5>*/}
                    {/*                <p className="card-text">Some quick example text to build on the card title and make up*/}
                    {/*                    the bulk of the card's content.</p>*/}
                    {/*                <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className={`card ${Classes.card1}`}>*/}
                    {/*            <img src="..." className="card-img-top" alt="..."/>*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5 className="card-title">Card title</h5>*/}
                    {/*                <p className="card-text">Some quick example text to build on the card title and make up*/}
                    {/*                    the bulk of the card's content.</p>*/}
                    {/*                <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <a className={`carousel-control-prev ${Classes.prev_button}`} href="#carouselExampleControls"
                   role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className={`carousel-control-next ${Classes.next_button}`} href="#carouselExampleControls"
                   role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    </>
}

export default ProductSlider;