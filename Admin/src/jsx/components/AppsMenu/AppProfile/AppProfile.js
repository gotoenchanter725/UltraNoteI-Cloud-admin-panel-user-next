import React, { Fragment, useState, useRef, useEffect } from "react";
import { Button, Dropdown, Modal, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { connect } from "react-redux";
import { selectProfileData } from "../../../../redux/user/user.selectors";
import { selectUserToken } from "../../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import "./AppProfile.css";
//** Import Image */
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile08 from "../../../../images/profile/8.jpg";
import profile09 from "../../../../images/profile/9.jpg";
import profile from "../../../../images/profile/profile.png";
import googleauth from "../../../../images/googleauth/unnamed.png";
import PageTitle from "../../../layouts/PageTitle";
import { setUserProfileData } from "../../../../redux/user/user.actions";
const AppProfile = ({
  userProfileData,
  token,
  setUserProfileData,
  portalURL,
}) => {
  userProfileData = !userProfileData ? token.profiledata : userProfileData;
  const [activeToggle, setActiveToggle] = useState("profile");
  const [sendMessage, setSendMessage] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [replayModal, setReplayModal] = useState(false);
  const [checked, setChecked] = useState(userProfileData.twofastatus);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    axios
      .get(`${portalURL}api/admin/profiledetails`, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        // console.log('user data:', res.data.users[0]);
        const userData = res.data.users[0];
        setValue("firstname", userData.firstname);
        setValue("lastname", userData.lastname);
        // setValue("phonenumber", userData.phonenumber);

        setUserProfileData(userData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleOnChange = () => {
    const url = portalURL + "api/admin/2faactive-inactive";
    axios
      .post(
        url,
        { name: "foo", surname: "bar" },
        {
          headers: {
            Authorization: token.token,
          },
        }
      )
      .then((res) => {})
      .catch((error) => console.log(error));
    setChecked(!checked);
  };

  const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    formState: { errors: errors2 },
  } = useForm();
  const password = useRef({});
  password.current = watch2("password", "");
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("userImage", data.Imageupload[0]);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    // formData.append("phonenumber", data.phonenumber);
    formData.append("_id", userProfileData._id);
    const url = portalURL + "api/admin/updateprofile";
    axios
      .post(url, formData, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.message === "Profile Updated Successfully") {
          setToastMessage("Profile updated successfully...");
          setShowToast(true);
          axios
            .get(`${portalURL}api/admin/profiledetails`, {
              headers: {
                Authorization: token.token,
              },
            })
            .then((res) => {
              const userprofiledata = res.data;
              console.log("User Profile DATA =>", userprofiledata.users[0]);
              setUserProfileData(userprofiledata.users[0]);
              // window.location.reload();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
      })
      .catch((error) => console.log(error));
  };

  const resetPassword = async (event) => {
    // event.preventDefault();
    event._id = userProfileData._id;
    const url = portalURL + "api/admin/updatepassword";
    axios
      .post(url, event, {
        headers: {
          Authorization: token.token,
        },
      })
      .then((res) => {
        if (res.data.message == "Password Changed") {
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  };

  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };
  return (
    <Fragment>
      <PageTitle activeMenu="User Profile" motherMenu="App" />
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item mav-item-width"
                      onClick={() => setActiveToggle("profile")}
                    >
                      <Link
                        to="#profile"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "profile" ? "active show" : ""
                        }`}
                      >
                        Profile Details
                      </Link>
                    </li>
                    <li
                      className="nav-item mav-item-width"
                      onClick={() => setActiveToggle("editprofile")}
                    >
                      <Link
                        to="#editprofile"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "editprofile" ? "active show" : ""
                        }`}
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li className="nav-item mav-item-width">
                      <Link
                        to="#changepassword"
                        data-toggle="tab"
                        onClick={() => setActiveToggle("changepassword")}
                        className={`nav-link ${
                          activeToggle === "passwordchange" ? "active show" : ""
                        }`}
                      >
                        Password Change
                      </Link>
                    </li>
                    <li className="nav-item mav-item-width">
                      <Link
                        to="#2FAactive"
                        data-toggle="tab"
                        onClick={() => setActiveToggle("2faactive")}
                        className={`nav-link ${
                          activeToggle === "2faactive" ? "active show" : ""
                        }`}
                      >
                        2 FA Active Inactive
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="my-posts"
                      className={`tab-pane fade ${
                        activeToggle === "profile" ? "active show" : ""
                      }`}
                    >
                      <br />

                      <div className="profile-personal-info">
                        <h4 className="text-primary mb-4">
                          Personal Information
                        </h4>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              First Name<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6">
                            <span>{userProfileData.firstname}</span>
                          </div>
                          <div className="col-3">
                            <img
                              src={userProfileData.userImage}
                              alt="HTML5"
                              className="profile-image"
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              Last Name<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6">
                            <span>{userProfileData.lastname}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              Email<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6">
                            <span>{userProfileData.email}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h5 className="f-w-500">
                              User Name<span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6">
                            <span>{userProfileData.username}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="about-me"
                      className={`tab-pane fade ${
                        activeToggle === "editprofile" ? "active show" : ""
                      }`}
                    >
                      <div className="pt-3">
                        <div className="settings-form">
                          <h4 className="text-primary">Edit Profile</h4>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  {...register("firstname", { required: true })}
                                  placeholder="First Name"
                                  className="form-control"
                                />
                                {errors.firstname && (
                                  <span>This Field is required</span>
                                )}
                              </div>
                              <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  {...register("lastname", { required: true })}
                                  className="form-control"
                                />
                                {errors.lastname && (
                                  <span>This Field is required</span>
                                )}
                              </div>
                            </div>
                            <div className="form-row">
                              {/* <div className="form-group col-md-6">
                                <label>Phone No</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register("phonenumber", {
                                    required: true,
                                  })}
                                  placeholder="Phone No"
                                />
                                {errors.phonenumber && (
                                  <span>This Field is required</span>
                                )}
                              </div> */}
                              <div className="form-group col-md-4">
                                <label>Image</label>
                                <input
                                  type="file"
                                  ref={register}
                                  name="Imageupload"
                                  {...register("Imageupload", {
                                    required: true,
                                  })}
                                  className="form-control"
                                />
                                {errors.Imageupload && (
                                  <span>This Field is required</span>
                                )}
                              </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                              Update Profile
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      id="profile-settings"
                      className={`tab-pane fade ${
                        activeToggle === "changepassword" ? "active show" : ""
                      }`}
                    >
                      <div className="pt-3">
                        <div className="settings-form">
                          <h4 className="text-primary">Password Reset</h4>
                          <form onSubmit={handleSubmit2(resetPassword)}>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label>Email</label>
                                <input
                                  type="email"
                                  {...register2("email", { required: true })}
                                  placeholder="Email"
                                  className="form-control"
                                />
                                {errors2.email && (
                                  <span>This Field is Required</span>
                                )}
                              </div>
                              <div className="form-group col-md-6">
                                <label>Current Password</label>
                                <input
                                  type="password"
                                  {...register2("currentpassword", {
                                    required: true,
                                  })}
                                  placeholder="Current Password"
                                  className="form-control"
                                />
                                {errors2.currentpassword && (
                                  <span>This Field is Required</span>
                                )}
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label>Password</label>
                                <input
                                  type="password"
                                  {...register2("password", {
                                    required: "You must specify a password",
                                    minLength: {
                                      value: 8,
                                      message:
                                        "Password must have at least 8 characters",
                                    },
                                  })}
                                  placeholder="Password"
                                  className="form-control"
                                />
                                {errors2.password && (
                                  <span>{errors2.password.message}</span>
                                )}
                              </div>
                              <div className="form-group col-md-6">
                                <label>Conform Password</label>
                                <input
                                  type="password"
                                  {...register2("conformpassword", {
                                    validate: (value) =>
                                      value === password.current ||
                                      "The passwords do not Match",
                                  })}
                                  placeholder="Password"
                                  className="form-control"
                                />
                                {errors2.conformpassword && (
                                  <span>{errors2.conformpassword.message}</span>
                                )}
                              </div>
                            </div>

                            <button
                              className="btn btn-primary"
                              type="submit"
                              htmlType="submit"
                            >
                              Reset Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      id="my-posts"
                      className={`tab-pane fade ${
                        activeToggle === "2faactive" ? "active show" : ""
                      }`}
                    >
                      <div className="row mb-2">
                        <div className="col-6">
                          <img
                            src={googleauth}
                            alt="HTML5"
                            className="google-auth-icon"
                          />
                        </div>

                        <div className="col-5">
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={handleOnChange}
                              checked={checked}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Toast
              onClose={() => setShowToast(false)}
              className="d-inline-block m-1"
              bg="primary"
              show={showToast}
              delay={3000}
              autohide
            >
              <Toast.Body style={{ background: "#5a387a" }}>
                {toastMessage}
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  userProfileData: selectProfileData,
  token: selectUserToken,
});
const mapDispatchToProps = (dispatch) => ({
  setUserProfileData: (profile) => dispatch(setUserProfileData(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppProfile);
