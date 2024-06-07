import Classes from "./Profile.module.css";
import ProfilePhoto from "./Components/ProfilePhoto";
import PersonalDetails from "./Components/PersonalDetails";
import Password from "./Components/Password";
import TopPortion from "../ItemPage/Components/TopPortion";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Store/CartContextProvider";
import { ToastContainer } from "react-toastify";
import { fetchUserDetails } from "../../axios/userapi";
import { useFormik } from "formik";
import { personalDetailsSchema } from "../../schemas";

const initialValues = {
  name: "",
  phone: "",
  address: "",
  postcode: "",
  state: "",
  email: "",
  country: "",
  gender: "",
  age: "",
};

const Profile: React.FC = (): JSX.Element => {
  const { isLogin, isAuthorised } = useContext(CartContext);

  const {
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    handleChange,
  } = useFormik({initialValues: initialValues,
    validationSchema: personalDetailsSchema,
    validateOnChange:true,
    onSubmit: (value, action) => {
      console.log(value);
    },
  });

  useEffect(() => {
    const fetchdetails = async () => {
      const data = await fetchUserDetails();
      for (const [key, value] of Object.entries(initialValues)) {
        setFieldValue(key, data[key]);
      }
    };
    if (isAuthorised()) fetchdetails();
  }, []);

  if (!isLogin) {
    return (
      <h1 style={{ position: "absolute", top: "50%", left: "35%" }}>
        Please Login to view your profile..
      </h1>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <TopPortion item="profile" />
      <div className={Classes.body}>
        <div className={Classes.container}>
          <div className={Classes.row}>
            <ProfilePhoto userDetails={values} />
            <PersonalDetails
              userDetails={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <Password />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
