import Classes from './SignUp.module.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import EcommerceClient from "../../axios/helper";
import {success,error} from "../../Toast/toast";

const SignUp:React.FC = ():JSX.Element=>{
    const navigate = useNavigate();
    const [expand,setexpand] = useState<Boolean>(false);
    const [user,setUser] = useState({email:'',otp:'',password:'',verifypassword:''});

    const handleOtpClick = async ()=>{
        setexpand(!expand);
        try {
            const repsonse = await EcommerceClient.post('/sendOtp',{email:user.email},{
                headers:{
                    'content-type':'application/json'
                }
            });
            if(repsonse.status===200)
                success("OTP SEND SUCCESSFULLY !!");
            else
                throw new Error();
        }catch (err){
            console.log(err);
            error("SOME ERROR OCCURED");
        }
    };

    const handleInputChange = (event:any)=>{
        const {name,value} = event.target;
        setUser((prev)=>{
            return {...prev,[name]:value};
        })
    }

    const handleSubmit = async (event:any)=>{
        event.preventDefault()
        console.log("hello")

        const data = {
            email:user.email,
            password:user.password,
            verifypassword:user.verifypassword,
            otp:user.otp
        }
        try {
            const response = await EcommerceClient.post('/user/signUp',data,{
                headers:{
                    'content-type':'application/json'
                }
            })
            if(response.status===200){
                setUser({email:'',otp:'',password:'',verifypassword:''})
                navigate('/')
                success("Successful SignUp !!")
            }
            else
                throw new Error()
        }catch(err){
            console.log(err);
            error('SOME ERROR OCCURED');
        }
    }

    return(
        <>
            <div className={Classes.body}>
            <div className={Classes.wrapper}>
                <h2>Registration</h2>
                <form action="#" onSubmit={handleSubmit}>
                    <div className={Classes.input_box}>
                        <input name='email' type="text" value={user.email} onChange={handleInputChange} placeholder="Enter your email" required/>
                    </div>
                    {expand &&
                        <>
                            <div className={Classes.input_box}>
                                <input name='otp' type="text" value={user.otp} onChange={handleInputChange} placeholder="Enter OTP" required/>
                            </div>
                            <div className={Classes.input_box}>
                                <input name='password' type="password" value={user.password} onChange={handleInputChange} placeholder="Create password" required/>
                            </div>
                            <div className={Classes.input_box}>
                                <input name="verifypassword" type="password" value={user.verifypassword} onChange={handleInputChange} placeholder="Confirm password" required/>
                            </div>
                            {/*<div className={Classes.policy}>*/}
                            {/*    <input type="checkbox"/>*/}
                            {/*    <h3>I accept all terms & condition</h3>*/}
                            {/*</div>*/}
                        </>
                    }
                    <div className={`${Classes.input_box} ${Classes.button}`}>
                        <input style={{cursor: expand && 'not-allowed', opacity: expand && 0.6}} onClick={handleOtpClick} type="button" value="GENERATE OTP" disabled={expand ? true : false}/>
                    </div>
                    {expand&&<div className={`${Classes.input_box} ${Classes.button}`}>
                        <input type="Submit" value="Register Now"/>
                    </div>}

                    <div className={Classes.text}>
                        <h3>Already have an account? <Link to='/login'>Login now</Link></h3>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default SignUp;