import { Link } from 'react-router-dom';
import styles from './topnav.module.css';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../Store/CartContextProvider';

const TopNav: React.FC = (): JSX.Element => {

    const {isLogin,setIslogin,isAuthorised} = useContext(CartContext);

    useEffect(()=>{
        isAuthorised();
    },[])

    const logout=()=>{
        localStorage.removeItem('token');
        setIslogin(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.topnav}>
                <div className={styles.heading}><p>Free shipping, 30-day return or refund guarantee. </p></div>
                <div className={styles.innerPortion}>
                    <p>{!isLogin? <Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>SIGN IN</Link> : <a href='#' style={{ textDecoration: 'none', color: 'white' }} onClick={logout} >SIGN OUT</a>}</p>
                    <p>FAQS</p>
                </div>

            </div>
        </div>
    )
}
export default TopNav;