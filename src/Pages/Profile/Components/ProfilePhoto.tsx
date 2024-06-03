import Classes from "../Profile.module.css";
import {userDetails} from "../../../Interface/userDetails";


const ProfilePhoto:React.FC<{ userDetails: userDetails }> = ({userDetails}):JSX.Element=>{
    return <>
        <div className={`${Classes.col_md_3} ${Classes.border_right}`}>
            <div className={`${Classes.profile} ${Classes.text_center}`}>
                <img style={{margin:"auto"}} className="rounded-circle"
                     src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                     alt="Profile Picture"/>
                <span className={Classes.font_weight_bold}>{userDetails.name}</span>
                <span className={Classes.text_black_50}>{userDetails.email}</span>
            </div>
        </div>
    </>
}

export default ProfilePhoto;