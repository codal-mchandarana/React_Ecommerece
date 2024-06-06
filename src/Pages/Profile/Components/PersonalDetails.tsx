import Classes from "../Profile.module.css";
import {fetchUserDetails, updateUserDetails} from "../../../axios/userapi";
import {userDetails} from "../../../Interface/userDetails";
import {error, success} from "../../../Toast/toast";

interface props{
    userDetails:userDetails,
    setUserDetails:any
}
const PersonalDetails:React.FC<props> = ({userDetails,setUserDetails}):JSX.Element=>{

    const handleSubmit = async(event:any)=>{
        try {
            const response = await updateUserDetails(userDetails);
            if(response.status===200){
                const {name,phone,postcode,address,age,country,email,gender,state} = await fetchUserDetails();
                success("Update Successful !!");
                setUserDetails({name,phone,address,postcode,state,email,country,gender,age});
            }else
                throw new Error();
        }catch(err){
            error("SOME ERROR OCCURED");
        }
    };

    const handleChange = (event:any)=>{
        const {name,value} = event.target;
        setUserDetails((prev:any)=>{return {...prev,[name]:value};});
    };

    return <>
        <div className={`${Classes.col_md_5} ${Classes.border_right}`}>
            <div className={Classes.settings}>
                <div className={Classes.header}>
                    <h4>Profile Settings</h4>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Name</label>
                    <input onChange={handleChange} name="name" type="text" className={Classes.form_control} placeholder="Enter Name" value={userDetails.name}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Mobile Number</label>
                    <input onChange={handleChange} name="phone" type="text" className={Classes.form_control} placeholder="Enter phone number" value={userDetails.phone}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Address Line</label>
                    <input onChange={handleChange} name="address" type="text" className={Classes.form_control} placeholder="Enter address line " value={userDetails.address}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Postcode</label>
                    <input onChange={handleChange} name="postcode" type="text" className={Classes.form_control} placeholder="Enter Postcode" value={userDetails.postcode}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>State</label>
                    <input onChange={handleChange} name="state" type="text" className={Classes.form_control} placeholder="Enter state" value={userDetails.state}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Email ID</label>
                    <input onChange={handleChange} name="email" type="email" className={Classes.form_control} placeholder="Enter email id" value={userDetails.email} disabled/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Country</label>
                    <input onChange={handleChange} name="country" type="text" className={Classes.form_control} placeholder="Enter Country" value={userDetails.country}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Gender</label>
                    <input onChange={handleChange} name="gender" type="text" className={Classes.form_control} placeholder="Enter Gender" value={userDetails.gender}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Age</label>
                    <input onChange={handleChange} name="age" type="text" className={Classes.form_control} placeholder="Enter Age" value={userDetails.age}/>
                </div>
                <div className={Classes.text_center}>
                    <button onClick={handleSubmit} className={Classes.profile_button} type="button">Save Profile</button>
                </div>
            </div>
        </div>
    </>
};

export default PersonalDetails;