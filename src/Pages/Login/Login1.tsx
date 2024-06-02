import Classes from '../SignUp/SignUp.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import EcommerceClient from "../../axios/helper";
import {CartContext} from "../../Store/CartContextProvider";
import {WishlistContext} from '../../Store/WishlistContextProvider'
import {fetchCart, fetchWishlist} from "../../axios/api";
import {success,error} from "../../Toast/toast";

const SignUp:React.FC = ():JSX.Element=>{
    const {SetItemvalues,setIslogin} = useContext(CartContext);
    const {SetWishlistvalues} = useContext(WishlistContext)
    const [user,setUser] = useState({email:'',password:''});
    const navigate = useNavigate();

    const handleInputChange = (event:any)=>{
        const {name,value} = event.target;
        setUser((prev)=>{
            return {...prev,[name]:value};
        })
    }

    const handleSubmit = async (event:any)=>{
        event.preventDefault()

        const data = {
            email:user.email,
            password:user.password,
        }
        const response = await EcommerceClient.post('/user/login',data,{
            withCredentials: true,
            headers:{
                'content-type':'application/json'
            }
        })
        if(response.status===200){
            try {
                success("Login Successfully !!")
                setIslogin(true)
                setUser({email:'',password:''})
                const fetchCartProduct = async ()=>{
                    const cartItems = await fetchCart();
                    SetItemvalues(cartItems)
                };

                const fetchWishlistProduct = async()=>{
                    const wishlistItems = await fetchWishlist()
                    SetWishlistvalues(wishlistItems);
                }
                fetchCartProduct();
                fetchWishlistProduct();
                navigate('/')
            }catch(err){
                console.log(err)
                error("SOME ERROR OCCURED")
            }
        }
    }

    return(
        <>
            <div className={Classes.body}>
                <div className={Classes.wrapper}>
                    <h2>Login</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className={Classes.input_box}>
                            <input name="email" value={user.email} onChange={handleInputChange} type="text" placeholder="Enter your email" required/>
                        </div>
                        <div className={Classes.input_box}>
                            <input name="password" value={user.password} onChange={handleInputChange} type="password" placeholder="Enter your password" required/>
                        </div>
                         <div className={`${Classes.input_box} ${Classes.button}`}>
                            <input type="Submit" value="LOGIN"/>
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

export default SignUp;