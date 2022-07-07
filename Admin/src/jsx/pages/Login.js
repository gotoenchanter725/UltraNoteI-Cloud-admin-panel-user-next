import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
// image
import { connect } from "react-redux";
import "./allresponsivestyle/pages.styles.css";
import logo from "../../images/Ultralogo/logo150.png";
import ReCAPTCHA from "react-google-recaptcha";
import {
  setCurrentUser,
  setUserProfileData,
} from "../../redux/user/user.actions";
const Login = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [inputValues, setInputValues] = useState({
    capcha: false,
    error: null,
  });

  const submitHandler = (e) => {
    console.log(errors);
    console.log(props);
    const { setCurrentUser } = props;
    console.log("Clicking", inputValues);
    // e.preventDefault();
    axios
      .post(`${props.portalURL}api/admin/login`, {
        email: e.email,
        password: e.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.message === "Auth failed") {
          setCurrentUser(null);
          console.log("Auth failed");
          setInputValues({
            ...inputValues,
            error: "Invalid Email Or Password",
          });
        } else if (res.data.message === "Email is Not Exist") {
          console.log("Email is Not Exist");
          setCurrentUser(null);
          setInputValues({
            ...inputValues,
            error: "Invalid Email Or Password",
          });
        } else {
          console.log("Auth success");
          setCurrentUser({ token: res.data.token, profiledata: res.data.user });
          setUserProfileData(res.data.user);
        }
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const onCapchaChange = (event) => {
    setInputValues({ ...inputValues, capcha: true });
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <div to="/">
                        <img
                          src={logo}
                          alt=""
                          style={{ height: 120, width: 120 }}
                        />
                      </div>
                    </div>
                    <h4 className="text-center mb-4 ">Sign in your account</h4>
                    <form onSubmit={handleSubmit(submitHandler)}>
                      {inputValues.error != null && (
                        <p style={{ margin: "0px  110px", color: "#ffffff" }}>
                          {inputValues.error}
                        </p>
                      )}
                      <div className="form-group">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleOnChange}
                          {...register("email", {
                            required: true,
                          })}
                        />
                        {errors.email && errors.email.type === "required" && (
                          <span>Email is required</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={handleOnChange}
                          {...register("password", {
                            required: true,
                          })}
                        />
                        {errors.password &&
                          errors.password.type === "required" && (
                            <span>Password is required</span>
                          )}
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="custom-control custom-checkbox ml-1 ">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Remember my preference
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <Link className="" to="/forgotpassword">
                            Forgot Password ?
                          </Link>
                        </div>
                      </div>
                      <div className="form-group">
                        <ReCAPTCHA
                          className="chapcha-position"
                          sitekey="6LfZqYoUAAAAAH__yx_8Gei-xBSMewxyhOvTB8ps"
                          onChange={onCapchaChange}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={!inputValues.capcha}
                        >
                          Sign Me In
                        </button>
                      </div>
                      <div
                        style={{ marginTop: "25px" }}
                        className="text-center"
                      >
                        <Link to="/googleauthicator">
                          <button
                            type="button"
                            className="btn  btn-block"
                            style={{
                              backgroundColor: "#b4fee7",
                              color: "black",
                            }}
                          >
                            Google Authenticator Login
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
