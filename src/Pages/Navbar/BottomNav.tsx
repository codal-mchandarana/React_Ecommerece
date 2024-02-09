import { Link, useLocation } from 'react-router-dom';
import Classes from './bottomnav.module.css'

const BottomNav: React.FC = ():JSX.Element => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className={Classes.container}>

            <div className={Classes.header__logo}>
                <a href=""><img src="./img/logo.png" alt="" /></a>
            </div>

            <div className={Classes.header_menu}>
                <ul>
                    <li className={pathname=="/"?Classes.active:undefined}><Link to="/">Home</Link></li>
                    <li className={pathname=="/shop"?Classes.active:undefined}><Link to="/shop">Shop</Link></li>
                    <li><a href="">Pages</a></li>
                    <li><a href="">Blog</a></li>
                </ul>

            </div>

            <div className={Classes.thirdportion}>
                <a href="#"><img src="./img/icon/search.png" alt="" /></a>
                <a href="#"><img src="./img/icon/heart.png" alt="" /></a>
                <a href="#"><img src="./img/icon/cart.png" alt="" /></a>
                <div>&#8377;0.00</div>
            </div>

        </div>
    )
}
export default BottomNav;