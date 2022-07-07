import React from "react";
import Nav from "../jsx/layouts/nav";
import Footer from "../jsx/layouts/Footer";
import AppProfile from "../jsx/components/AppsMenu/AppProfile/AppProfile";
const ProfilePage = (props) => { 
return ( <div id="main-wrapper" className="show mh100vh ">
    <Nav portalURL={props.portalURL}  token={props.token}/>
    <div className="content-body">
      <div
        className="container-fluid"
        style={{ minHeight: window.screen.height - 60 }}
      >
        <AppProfile {...props}/>
      </div>
    </div>
    <Footer />
  </div>
)};

export default ProfilePage;
