import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter you email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const signUpSchema = Yup.object({
  email: Yup.string().email().required("Please enter you email"),
  otp: Yup.string()
    .required("Please enter otp")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, "Must be exactly 4 digits")
    .max(4, "Must be exactly 4 digits"),
  password: Yup.string().min(6).max(25).required("Please enter your password"),
  verifypassword: Yup.string()
    .min(6)
    .max(25)
    .oneOf([Yup.ref("password"), null], "Password not match")
    .required("Please enter Confirm password"),
});

export const personalDetailsSchema = Yup.object({
  name: Yup.string().min(6).max(25),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  address: Yup.string().min(5).max(200),
  postcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
  state: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must be alphabet only")
    .min(2),
  email: Yup.string().email(),
  country: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must be alphabet only")
    .min(2),
  gender: Yup.string()
    .min(2)
    .max(10)
    .matches(/^[a-zA-Z]+$/, "Must be alphabet only"),
  age: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(1)
    .max(3),
});

export const passwordSchema = Yup.object({
  newPassword: Yup.string().min(6).max(25),
  verifyPassword: Yup.string()
    .min(6)
    .max(25)
    .oneOf([Yup.ref("newPassword"), null], "Password not match"),
});
