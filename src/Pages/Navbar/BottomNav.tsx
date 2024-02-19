import { Link, useLocation } from 'react-router-dom';
import Classes from './bottomnav.module.css'
import { useContext } from 'react';
import { CartContext } from '../../Store/CartContextProvider';

const BottomNav: React.FC = ():JSX.Element => {
    const location = useLocation();
    const { pathname } = location;
    const {carts,isLogin} = useContext(CartContext);

    let sum:number = 0;

    for (let index = 0; index < carts.length; index++) {
        sum += parseInt(carts[index].price)
    }

    return (
        <div className={Classes.container}>

            <div className={Classes.header__logo}>
                <a href="/#"><img src="./img/logo.png" alt="" /></a>
            </div>

            <div className={Classes.header_menu}>
                <ul>
                    <li className={pathname==="/"?Classes.active:undefined}><Link to="/">Home</Link></li>
                    <li className={pathname==="/shop"?Classes.active:undefined}><Link to="/shop">Shop</Link></li>
                    <li><a href="/#">Pages</a></li>
                    <li><a href="/#">Blog</a></li>
                </ul>

            </div>

            <div className={Classes.thirdportion}>
                <a href="/#"><img src="./img/icon/search.png" alt="" /></a>
                <a href="/#"><img src="./img/icon/heart.png" alt="" /></a>
                <Link style={{textDecoration:'none'}} to="/cart"><img src="./img/icon/cart.png" alt="" /><span className={Classes.number}>{isLogin?carts.length:0}</span></Link>
                <div>&#8377;{isLogin?sum:0}</div>
            </div>

        </div>
    )
}
export default BottomNav;