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
        localStorage.removeItem('currentUser')
        setIslogin(false);
    }

    const stylenavElements = { textDecoration: 'none', color: 'white' };

    return (
        <div className={styles.container}>
            <div className={styles.topnav}>
                <div className={styles.heading}><p>Free shipping, 30-day return or refund guarantee. </p></div>
                <div className={styles.innerPortion}>
                    {isLogin&&<Link style={stylenavElements}  to="/profile"><p>PROFILE</p></Link>}
                    <Link style={stylenavElements} to="/faq" ><p>FAQS</p></Link>
                    <p>{!isLogin? <Link style={stylenavElements} to='/login'><span style={{marginLeft:'10px'}}>Login</span></Link> : <a href='#' style={{ textDecoration: 'none', color: 'white' }} onClick={logout} ><span style={{marginLeft:'10px'}}>SIGN OUT</span></a>}</p>
                </div>

            </div>
        </div>
    )
}
export default TopNav;