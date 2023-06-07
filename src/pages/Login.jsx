import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { setToken } from "../utils/token.js";
const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, message } = useSelector(
    (state) => state.auth
  );

  useEffect(()=>{
    if(user){
      setToken(user?.token)
      navigate("admin")
    }else if(message){
      toast.error(message)
    }
  },[user,message,navigate,dispatch])

  return (
    <section className="login-container">
      <ToastContainer />
      <div className="login-form">
        <div className="login-heading">
          <h1>Sign In</h1>
          <p>Login to your account to continue</p>
        </div>
        <form className="login-inputs" onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="formik-error">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="pass"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="formik-error">{formik.errors.password}</div>
          ) : null}
          <div className="remember">
            <Link className="forgot" to={"/forgotPass"}>
              Forgot password?
            </Link>
          </div>
          <div className="btn">
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
