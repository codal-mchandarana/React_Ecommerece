import Classes from "../Profile.module.css";
import { updateUserPassword } from "../../../axios/userapi";
import { error, success } from "../../../Toast/toast";
import { useFormik } from "formik";
import { passwordSchema } from "../../../schemas";

const initialValues = {
  newPassword: "",
  verifyPassword: "",
};

const Password: React.FC = (): JSX.Element => {
  const handleSubmit1 = async (value: any, action: any) => {
    try {
      const response = await updateUserPassword(values);
      if (response.status === 200) {
        success("Password changes succssfully !!");
      }
    } catch (err) {
      console.log(err);
      error("SOME ERROR OCCURED");
    }
    action.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: passwordSchema,
      onSubmit: handleSubmit1,
    });

  return (
    <>
      <div className={Classes.col_md_4}>
        <div className={Classes.experience_section}>
          <div className={Classes.header}>
            <span>Edit Password</span>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div
              style={
                errors.newPassword && touched.newPassword
                  ? { marginBottom: "2rem" }
                  : {}
              }
              className={Classes.form_group}
            >
              <label className={Classes.labels}>New Password</label>
              <input
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                className={Classes.form_control}
                placeholder="Enter New Password"
              />
              {errors.newPassword && touched.newPassword ? (
                <div className="error-message">{errors.newPassword}</div>
              ) : null}
            </div>
            <div
              style={
                errors.verifyPassword && touched.verifyPassword
                  ? { marginBottom: "2rem" }
                  : {}
              }
              className={Classes.form_group}
            >
              <label className={Classes.labels}>Verify Password</label>
              <input
                name="verifyPassword"
                value={values.verifyPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                className={Classes.form_control}
                placeholder="Enter Verify Password"
              />
              {errors.verifyPassword && touched.verifyPassword ? (
                <div className="error-message">{errors.verifyPassword}</div>
              ) : null}
            </div>
            <div className={Classes.text_center}>
              <button className={Classes.profile_button} type="submit">
                Save Password
              </button>
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
export default Password;
