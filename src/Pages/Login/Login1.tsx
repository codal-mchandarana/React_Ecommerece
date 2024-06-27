import Classes from "../SignUp/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import EcommerceClient from "../../axios/helper";
import { CartContext } from "../../Store/CartContextProvider";
import { WishlistContext } from "../../Store/WishlistContextProvider";
import { success, error } from "../../Toast/toast";
import { ToastContainer } from "react-toastify";
import LoginButton from "./Components/LoginButton";
import {
  helper_Fetching_cartProducts,
  helper_Fetching_wishlistProducts,
} from "../../utils/helpter";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";

const initialValues = { email: "", password: "" };

const Login1: React.FC = (): JSX.Element => {
  const { SetItemvalues, setIslogin } = useContext(CartContext);
  const { SetWishlistvalues } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleSubmit1 = async (values:any,action:any) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await EcommerceClient.post("/user/login", data, {
        withCredentials: true,
        headers: { "content-type": "application/json" },
      });
      if (response.status === 200) {
        try {
          success("Login Successfully !!");
          setIslogin(true);
          const fetch = async () => {
            const cart_values = await helper_Fetching_cartProducts();
            const wishList_values = await helper_Fetching_wishlistProducts();

            SetItemvalues(cart_values);
            SetWishlistvalues(wishList_values);
          };
          fetch();
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (err) {
          console.log(err);
          error("SOME ERROR OCCURED");
        }
      } else if (response.status === 401) error("Invalid Crendials");
      else throw new Error();
    } catch (err) {
      error("LOGIN FAILED");
    }
    action.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: handleSubmit1,
    });

  const handleClick = async () => {
    try {
      window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`,"_self")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <div className={Classes.body}>
        <div className={Classes.wrapper}>
          <h2>Login</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div style={errors.email && touched.email?{marginBottom:"2rem"}:{}} className={`${Classes.input_box}`}>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter your email"
                required
              />
              {errors.email && touched.email ? (
                <div  className="error-message">{errors.email}</div>
              ) : null}
            </div>
            <div style={errors.password && touched.password?{marginBottom:"2rem"}:{}} className={Classes.input_box}>
              <input
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Enter your password"
                required
              />
              {errors.password && touched.password ? (
                <div style={{marginBottom:"2rem"}}  className="error-message">{errors.password}</div>
              ) : null}
            </div>
            <div className={`${Classes.input_box} ${Classes.button}`}>
              <input type="Submit" value="LOGIN" />
            </div>
            <div
              onClick={handleClick}
              className={`${Classes.input_box} ${Classes.button}`}
            >
              <LoginButton />
            </div>
            <div className={Classes.text}>
              <h3>
                Don't have an account? <Link to="/signUp">Register Now</Link>
              </h3>
            </div>
          </form>
        </div>
        <style>
          {`
            .input-group {
               color: #333;
               float: left;
               font-family: Helvetica, Arial, sans-serif;
               font-size: 13px;
               line-height: 20px;
               margin: 0 20px 10px;
               width: 200px;
            }

            label {
              display: block;
              margin-bottom: 2px;
            }

            input[type=text] {
              background: #fff;
              border: 1px solid #999;
              float: left;
              font-size: 13px;
              margin: 0;
              padding: 0 0 0 15px;
              width: 100%;
            }

            .error-message {
              color: #cc0033;
              display: inline-block;
              font-size: 15px;
              line-height: 15px;
              margin: 5px 0 0;
            }

            .input-group .error-message {
              display: none;
            }
            
            
            /* Error Styling */
            
            .error label {
              color: #cc0033;
            }

            .error input[type=text] {
              background-color: #fce4e4;
              border: 1px solid #cc0033;
              outline: none;
            }
            
            .error .error-message {
              display: inline-block;
            }
            `}
        </style>
      </div>
    </>
  );
};

export default Login1;