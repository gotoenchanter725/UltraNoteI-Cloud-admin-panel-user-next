import React from "react";
import Nav from "../jsx/layouts/nav";
import Footer from "../jsx/layouts/Footer";
import SettingsComponent from "../jsx/components/Settings/Settings";
const SettingsPage = (props) => (
  <div id="main-wrapper" className="show mh100vh ">
    <Nav token={props.token} portalURL={props.portalURL}/>
    <div className="content-body">
      <div
        className="container-fluid"
        style={{ minHeight: window.screen.height - 60 }}
      >
        <SettingsComponent {...props}/>
      </div>
    </div>
    <Footer />
  </div>
);

export default SettingsPage;
