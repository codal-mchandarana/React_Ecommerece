import { Link } from 'react-router-dom';
import styles from './topnav.module.css';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../Store/CartContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <div className={styles.container}>
            <div className={styles.topnav}>
                <div className={styles.heading}><p>Free shipping, 30-day return or refund guarantee. </p></div>
                <div className={styles.innerPortion}>
                    <p>{!isLogin? <Link style={{ textDecoration: 'none', color: 'white' }} to='/login'><FontAwesomeIcon icon={faUser} /><span style={{marginLeft:'10px'}}>Login</span></Link> : <a href='#' style={{ textDecoration: 'none', color: 'white' }} onClick={logout} ><FontAwesomeIcon icon={faUser} /><span style={{marginLeft:'10px'}}>SIGN OUT</span></a>}</p>
                    <p>FAQS</p>
                </div>

            </div>
        </div>
    )
}
export default TopNav;