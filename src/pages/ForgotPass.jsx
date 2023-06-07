import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
const ForgotPass = () => {

  const formik = useFormik({
    initialValues:{
      email:""
    },
    validationSchema:Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <section className="login-container">
      <div className="login-form">
        <div className="login-heading">
          <h1>Forgot Password</h1>
          <p>Enter your email address to reset password</p>
        </div>
        <form className="login-inputs" onSubmit={formik.handleSubmit}>
          <label for="email">Email Address</label>
          <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange("email")}/>
          <div className="btn">
            <button type="submit" className="login-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPass;
