import Classes from "../Profile.module.css";
import {useState} from "react";
import {updateUserPassword} from "../../../axios/userapi";
import {error, success} from "../../../Toast/toast";

const Password:React.FC = ():JSX.Element=>{

    const [UserPass,setUserPass] = useState({
        newPassword:'',
        verifyPassword:''
    });

    const handleChange = (event:any)=>{
      const {name,value} = event.target;
      setUserPass((prev)=>{return {...prev,[name]:value}})
    };

    const handleSubmit = async()=>{
        try {
            const response = await updateUserPassword(UserPass);
            if(response.status===200){
                success("Password changes succssfully !!");
                setUserPass({newPassword: '',verifyPassword: ''});
            }
        }catch(err){
            console.log(err);
            error("SOME ERROR OCCURED");
        }
    }

    return <>
        <div className={Classes.col_md_4}>
            <div className={Classes.experience_section}>
                <div className={Classes.header}>
                    <span>Edit Password</span>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>New Password</label>
                    <input onChange={handleChange} name="newPassword" type="password" className={Classes.form_control} placeholder="Enter New Password"
                           value={UserPass.newPassword}/>
                </div>
                <div className={Classes.form_group}>
                    <label className={Classes.labels}>Verify Password</label>
                    <input onChange={handleChange} name="verifyPassword" type="password" className={Classes.form_control} placeholder="Enter Verify Password"
                           value={UserPass.verifyPassword}/>
                </div>
                <div className={Classes.text_center}>
                    <button onClick={handleSubmit} className={Classes.profile_button} type="button">Save Password</button>
                </div>
            </div>
        </div>
    </>
}
export default Password