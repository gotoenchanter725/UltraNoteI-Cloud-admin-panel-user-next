/// Menu
import MetisMenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import profile from "../../../images/Untitled-1.jpg";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProfileData } from "../../../redux/user/user.selectors";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    //  this.mm("dispose");
    // console.log(this.mm);
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = ({ userProfileData, portalURL }) => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }

    handleheartBlast.addEventListener("click", heartBlast);
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/")[1];

  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <div className="main-profile">
          {userProfileData ? (
            <img src={portalURL + userProfileData.userImage} alt="" />
          ) : (
            <img src={profile} alt="" />
          )}
          <Link to={"#"}>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </Link>
          {userProfileData ? (
            <h5 className="mb-0 fs-20 text-black ">
              <span className="font-w400">Hello,</span>{" "}
              {userProfileData.firstname}
            </h5>
          ) : (
            <h5 className="mb-0 fs-20 text-black ">
              <span className="font-w400">Hello,</span> Steve
            </h5>
          )}
          {userProfileData ? (
            <p className="mb-0 fs-14 font-w400">{userProfileData.email}</p>
          ) : (
            <p className="mb-0 fs-14 font-w400">steve@email.com</p>
          )}
        </div>
        <MM className="metismenu" id="menu">
          <li className={`${path === "dashboard" ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/dashboard">
              <i className="flaticon-144-layout"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          {/* <li className={`${path === "wallets" ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-008-credit-card"></i>
              <span className="nav-text">Wallets</span>
            </Link>
          </li> */}
          <li className={`${path === "profile-details" ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-028-user-1"></i>
              <span className="nav-text">Profile</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "profile-details" ? "mm-active" : ""}`}
                  to="/profile-details"
                >
                  Edit Profile
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${path === "users" ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/users">
              <i className="flaticon-019-add-user"></i>
              <span className="nav-text">User Management</span>
            </Link>
          </li>
          <li className={`${path === "settings" ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-073-settings"></i>
              <span className="nav-text">Settings</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "settings" ? "mm-active" : ""}`}
                  to="/settings">
                  Wallet/RPC Settings
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${path === "mass-email" ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/mass-email">
              <i className="flaticon-076-email-1"></i>
              <span className="nav-text">Mass email</span>
            </Link>
          </li>
        </MM>
        <div className="copyright">
          <p>
            <strong>UltraNote</strong> © 2021 All Rights Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by UltraNote
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userProfileData: selectProfileData,
});

export default connect(mapStateToProps)(SideBar);
