import Classes from "./SignUp.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EcommerceClient from "../../axios/helper";
import { success, error } from "../../Toast/toast";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas";

const initialValues = {
  email: "",
  otp: "",
  password: "",
  verifypassword: "",
};

const SignUp: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [expand, setexpand] = useState<Boolean>(false);

  const handleSubmit1 = async (value: any,action:any) => {

    const data = {
      email: value.email,
      password: value.password,
      verifypassword: value.verifypassword,
      otp: value.otp,
    };
    try {
      const response = await EcommerceClient.post("/user/signUp", data, {
        headers: {
          "content-type": "application/json",
        },
      });
      action.resetForm();
      if (response.status === 200) {
        success("Successful SignUp !!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else throw new Error();
    } catch (err) {
      console.log(err);
      error("SOME ERROR OCCURED");
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: handleSubmit1
    });

  const handleOtpClick = async () => {
    try {
      const repsonse = await EcommerceClient.post(
        "/sendOtp",
        { email: values.email },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (repsonse.status === 200) {
        success("OTP SEND SUCCESSFULLY !!");
        setexpand(!expand);
      }
      else throw new Error();
    } catch (err) {
      console.log(err);
      error("SOME ERROR OCCURED");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <div className={Classes.body}>
        <div className={Classes.wrapper}>
          <h2>Registration</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div
              style={
                errors.email && touched.email ? { marginBottom: "2rem" } : {}
              }
              className={Classes.input_box}
            >
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
                <div className="error-message">{errors.email}</div>
              ) : null}
            </div>
            {expand && (
              <>
                <div
                  style={
                    errors.otp && touched.otp ? { marginBottom: "2rem" } : {}
                  }
                  className={Classes.input_box}
                >
                  <input
                    name="otp"
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter OTP"
                    required
                  />
                  {errors.otp && touched.otp ? (
                    <div className="error-message">{errors.otp}</div>
                  ) : null}
                </div>
                <div
                  style={
                    errors.password && touched.password
                      ? { marginBottom: "2rem" }
                      : {}
                  }
                  className={Classes.input_box}
                >
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Create password"
                    required
                  />
                  {errors.password && touched.password ? (
                    <div className="error-message">{errors.password}</div>
                  ) : null}
                </div>
                <div
                  style={
                    errors.verifypassword && touched.verifypassword
                      ? { marginBottom: "2rem" }
                      : {}
                  }
                  className={Classes.input_box}
                >
                  <input
                    name="verifypassword"
                    value={values.verifypassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
                  {errors.verifypassword && touched.verifypassword ? (
                    <div className="error-message">{errors.verifypassword}</div>
                  ) : null}
                </div>
                {/*<div className={Classes.policy}>*/}
                {/*    <input type="checkbox"/>*/}
                {/*    <h3>I accept all terms & condition</h3>*/}
                {/*</div>*/}
              </>
            )}
            <div className={`${Classes.input_box} ${Classes.button}`}>
              <input
                style={{
                  cursor: expand && "not-allowed",
                  opacity: expand && 0.6,
                }}
                onClick={handleOtpClick}
                type="button"
                value="GENERATE OTP"
                disabled={expand ? true : false}
              />
            </div>
            {expand && (
              <div className={`${Classes.input_box} ${Classes.button}`}>
                <input type="Submit" value="Register Now" />
              </div>
            )}

            <div className={Classes.text}>
              <h3>
                Already have an account? <Link to="/login">Login now</Link>
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

export default SignUp;
