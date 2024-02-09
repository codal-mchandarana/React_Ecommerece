import Classes from './Card.module.css'
import { ProductItem } from '../../../../Interface/ProductItem';

const List = (rating : string)=>{
    
    const renderList = ()=>{
        const listItems = [];
        let iteration : number  = Math.round(parseInt(rating))

        for (let index = 0; index < iteration; index++) {
            listItems.push(<i style={{color:"#FF9529"}} className="fa-solid fa-star"></i>)
        }

        for (let index = 0; index < 5 - iteration; index++) {
            listItems.push(<i className="fa-regular fa-star"></i>)
        }
        return listItems;
    }

    return renderList()
}

const Card: React.FC<ProductItem> = ({ id, rating, brand, description, title, price, images }): JSX.Element => {

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className={Classes.product__item}>
                <div className={Classes.product__item__pic}>
                    <img className={Classes.img} src={`${images[0]}`} alt="" />
                </div>
                <div className={Classes.product__item__text}>
                    <h6>{title}</h6>
                    <a href="#">+ Add To Cart</a>
                    <div className={Classes.rating}>
                        {List(rating)}
                    </div>
                    <p>{description.slice(0,50)}...</p>
                    <p>{brand}</p>
                    <h5>&#8377;{price}</h5>
                </div>
            </div>
        </div>

    )
}
export default Card;