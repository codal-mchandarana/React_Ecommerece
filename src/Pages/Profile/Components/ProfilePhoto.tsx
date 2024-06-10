import Classes from "../Profile.module.css";
import { userDetails } from "../../../Interface/userDetails";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EcommerceClient from "../../../axios/helper";
import { error, success } from "../../../Toast/toast";

const ProfilePhoto: React.FC<{ userDetails: userDetails }> = ({
  userDetails,
}): JSX.Element => {
  const fileRef = useRef<any>();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [profileimage, setprofileimage] = useState(userDetails.image_name);

  useEffect(()=>{
    setprofileimage(userDetails.image_name)
  },[userDetails.image_name])

  const handleFileClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const fileName = selectedFile.name;
      const contentType = selectedFile.type;

      // Fetch the presigned URL from the backend
      const response = await EcommerceClient.get(
        "/file/generate-presigned-url",
        {
          withCredentials: true,
          params: {
            fileName,
            contentType,
          },
        }
      );

      const { url } = response.data;

      // Upload the file to S3 using the presigned URL
      const res = await axios.put(url, selectedFile, {
        headers: {
          "Content-Type": contentType,
        },
      });

      if (res.status == 200) {
        const resphoto = await EcommerceClient.post(
          "user/addPhoto",
          { name: fileName },
          {
            withCredentials: true,
            headers: { "content-type": "application/json" },
          }
        );

        if (resphoto.status == 200) {
          setprofileimage(fileName);
          success("PHOTO UPLOADED !!");
        } else error("SOME ERROR OCCURED");
      }

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className={`${Classes.col_md_3} ${Classes.border_right}`}>
        <div className={`${Classes.profile} ${Classes.text_center}`}>
          <input
            onChange={handleFileChange}
            ref={fileRef}
            style={{ display: "none" }}
            type="file"
          ></input>
          <img
            onClick={handleFileClick}
            style={{ margin: "auto",cursor:"pointer" }}
            className="rounded-circle mb-2"
            src={
              profileimage!==""
                ? `https://profile-photo-s3.s3.eu-north-1.amazonaws.com/${profileimage}`
                : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            }
            alt="Profile Picture"
          />
          <button onClick={handleUpload} className="btn btn-primary" type="button">Upload</button>
          <span className={`${Classes.font_weight_bold} mt-3`}>{userDetails.name}</span>
          <span className={Classes.text_black_50}>{userDetails.email}</span>
        </div>
      </div>
    </>
  );
};

export default ProfilePhoto;
