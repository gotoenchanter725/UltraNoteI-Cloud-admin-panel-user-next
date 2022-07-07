import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3, portalURL, token }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  console.log('JobieNav: portalURL:', portalURL);
  return (
    <Fragment>
      <NavHader />
      <Header
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onClick={() => ClickToAddEvent()}
        portalURL = {portalURL}
        token = {token}
      />
      <SideBar portalURL={portalURL}/>
    </Fragment>
  );
};

export default JobieNav;
