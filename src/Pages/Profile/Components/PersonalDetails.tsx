import Classes from "../Profile.module.css";
import { fetchUserDetails, updateUserDetails } from "../../../axios/userapi";
import { userDetails } from "../../../Interface/userDetails";
import { error, success } from "../../../Toast/toast";

interface props {
  userDetails: userDetails;
  setFieldValue: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
}
const PersonalDetails: React.FC<props> = ({
  userDetails,
  setFieldValue,
  errors,
  touched,
  handleBlur,
  handleChange,
}): JSX.Element => {
  const handleSubmit = async () => {
    if (Object.keys(errors).length === 0) {
      try {
        const response = await updateUserDetails(userDetails);
        if (response.status === 200) {
          const data = await fetchUserDetails();
          success("Update Successful !!");
          for (const [key, value] of Object.entries(userDetails)) {
            setFieldValue(key, data[key]);
          }
        } else throw new Error();
      } catch (err) {
        error("SOME ERROR OCCURED");
      }
    }
  };

  return (
    <>
      <div className={`${Classes.col_md_5} ${Classes.border_right}`}>
        <div className={Classes.settings}>
          <div className={Classes.header}>
            <h4>Profile Settings</h4>
          </div>
          <div
            style={errors.name && touched.name ? { marginBottom: "2rem" } : {}}
            className={Classes.form_group}
          >
            <label className={Classes.labels}>Name</label>
            <input
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter Name"
            />
            {errors.name && touched.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Mobile Number</label>
            <input
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter phone number"
            />
            {errors.phone && touched.phone ? (
              <div className="error-message">{errors.phone}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Address Line</label>
            <input
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter address line "
            />
            {errors.address && touched.address ? (
              <div className="error-message">{errors.address}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Postcode</label>
            <input
              name="postcode"
              value={userDetails.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter Postcode"
            />
            {errors.postcode && touched.postcode ? (
              <div className="error-message">{errors.postcode}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>State</label>
            <input
              name="state"
              value={userDetails.state}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter state"
            />
            {errors.state && touched.state ? (
              <div className="error-message">{errors.state}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Email ID</label>
            <input
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              className={Classes.form_control}
              placeholder="Enter email id"
              disabled
            />
            {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Country</label>
            <input
              name="country"
              value={userDetails.country}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter Country"
            />
            {errors.country && touched.country ? (
              <div className="error-message">{errors.country}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Gender</label>
            <input
              name="gender"
              value={userDetails.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter Gender"
            />
            {errors.gender && touched.gender ? (
              <div className="error-message">{errors.gender}</div>
            ) : null}
          </div>
          <div className={Classes.form_group}>
            <label className={Classes.labels}>Age</label>
            <input
              name="age"
              value={userDetails.age}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={Classes.form_control}
              placeholder="Enter Age"
            />
            {errors.age && touched.age ? (
              <div className="error-message">{errors.age}</div>
            ) : null}
          </div>
          <div className={Classes.text_center}>
            <button
              onClick={handleSubmit}
              className={Classes.profile_button}
              type="button"
            >
              Save Profile
            </button>
          </div>
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

export default PersonalDetails;
