import Classes from './Profile.module.css'
import ProfilePhoto from "./Components/ProfilePhoto";
import PersonalDetails from "./Components/PersonalDetails";
import Password from "./Components/Password";
import TopPortion from "../ItemPage/Components/TopPortion"
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../Store/CartContextProvider";
import {ToastContainer} from "react-toastify";
import {userDetails} from "../../Interface/userDetails";
import {fetchUserDetails} from "../../axios/userapi";

const Profile:React.FC = ():JSX.Element=>{
    const {  isLogin,isAuthorised } = useContext(CartContext);
    const [userDetails,setUserDetails] = useState<userDetails>({
        name:"",
        phone:"",
        address:"",
        postcode:"",
        state:"",
        email:"",
        country:"",
        gender:"",
        age:""
    });

    useEffect(() => {
        const fetchdetails = async()=>{
            const {name,phone,postcode,address,age,country,email,gender,state} = await fetchUserDetails();
            setUserDetails({name,phone,address,postcode,state,email,country,gender,age});
        }
        if(isAuthorised())
           fetchdetails();

    }, []);

    if (!isLogin) {return (<h1 style={{ position: 'absolute', top: '50%', left: '35%' }}>Please Login to view your profile..</h1>)}

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
            <TopPortion item="profile" />
            <div className={Classes.body}>
                <div className={Classes.container}>
                    <div className={Classes.row}>
                        <ProfilePhoto userDetails={userDetails}/>
                        <PersonalDetails userDetails={userDetails} setUserDetails={setUserDetails}/>
                        <Password/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;