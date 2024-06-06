import Classes from '../SignUp/SignUp.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import EcommerceClient from "../../axios/helper";
import {CartContext} from "../../Store/CartContextProvider";
import {WishlistContext} from '../../Store/WishlistContextProvider'
import {fetchCart, fetchWishlist} from "../../axios/api";
import {success, error} from "../../Toast/toast";
import {ToastContainer} from "react-toastify";
import LoginButton from "./Components/LoginButton";
import {helper_Fetching_cartProducts, helper_Fetching_wishlistProducts} from "../../utils/helpter";

const Login1: React.FC = (): JSX.Element => {
    const {SetItemvalues, setIslogin} = useContext(CartContext);
    const {SetWishlistvalues} = useContext(WishlistContext)
    const [user, setUser] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleClick = async()=>{
        try {
            const response = await EcommerceClient.get('auth/google');
            console.log(response)
        }catch(err){
            console.log(err);
        }
    }

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setUser((prev) => {
            return {...prev, [name]: value};
        })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = {
            email: user.email,
            password: user.password,
        };
        try {
            const response = await EcommerceClient.post('/user/login', data, {
                withCredentials: true,
                headers: {'content-type': 'application/json'}
            });
            if (response.status === 200) {
                try {
                    success("Login Successfully !!")
                    setIslogin(true);
                    setUser({email: '', password: ''})
                    const fetch = async()=>{
                        const cart_values = await helper_Fetching_cartProducts();
                        const wishList_values = await helper_Fetching_wishlistProducts();

                        SetItemvalues(cart_values);
                        SetWishlistvalues(wishList_values);
                    }
                    fetch();
                    setTimeout(() => {
                        navigate('/');
                    }, 1000)
                } catch (err) {
                    console.log(err)
                    error("SOME ERROR OCCURED");
                }
            } else if (response.status === 401) error("Invalid Crendials");

            else throw new Error();

        } catch (err) {
            error("LOGIN FAILED");
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <div className={Classes.body}>
                <div className={Classes.wrapper}>
                    <h2>Login</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className={Classes.input_box}>
                            <input name="email" value={user.email} onChange={handleInputChange} type="text"
                                   placeholder="Enter your email" required/>
                        </div>
                        <div className={Classes.input_box}>
                            <input name="password" value={user.password} onChange={handleInputChange} type="password"
                                   placeholder="Enter your password" required/>
                        </div>
                        <div className={`${Classes.input_box} ${Classes.button}`}>
                            <input type="Submit" value="LOGIN"/>
                        </div>
                        <div onClick={handleClick} className={`${Classes.input_box} ${Classes.button}`}>
                            <LoginButton/>
                        </div>
                        <div className={Classes.text}>
                            <h3>Don't have an account? <Link to='/signUp'>Register Now</Link></h3>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login1;