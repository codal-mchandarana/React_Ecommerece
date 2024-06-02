import { Link, useLocation } from 'react-router-dom';
import Classes from './bottomnav.module.css'
import { useContext } from 'react';
import { CartContext } from '../../Store/CartContextProvider';

const BottomNav: React.FC = (): JSX.Element => {
    const location = useLocation();
    const { pathname } = location;
    const { carts, isLogin,TotalPrice } = useContext(CartContext);

    const TotalQuantity:number = carts.reduce((accumulate,item)=>accumulate+(item.qty),0)


    return (
        <div className={Classes.container}>

            <div className={Classes.header__logo}>
                <Link to="/"><img src="./img/logo.png" alt="" /></Link>
            </div>

            <div className={Classes.header_menu}>
                <ul>
                    <li className={pathname === "/" ? Classes.active : undefined}><Link to="/">Home</Link></li>
                    <li className={pathname === "/shop" ? Classes.active : undefined}><Link to="/shop">Shop</Link></li>
                    <li><a href="/#">Pages</a></li>
                    <li><a href="/#">Blog</a></li>
                </ul>

            </div>

            <div className={Classes.thirdportion}>
                <a href="/#"><img src="./img/icon/search.png" alt="" /></a>
                <Link to="/wishlist"><img src="./img/icon/heart.png" alt="" /></Link>
                <Link style={{ textDecoration: 'none' }} to="/cart"><img src="./img/icon/cart.png" alt="" /><span className={Classes.number}>{isLogin ? TotalQuantity : 0}</span></Link>
                <div>&#8377;{isLogin && TotalQuantity!==0 ? TotalPrice.toFixed(2) : 0}</div>
            </div>

        </div>
    )
}
export default BottomNav;