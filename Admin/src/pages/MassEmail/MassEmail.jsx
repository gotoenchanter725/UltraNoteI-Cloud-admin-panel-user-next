import React from "react";
import Nav from "../../jsx/layouts/nav";
import Footer from "../../jsx/layouts/Footer";
import MassEmail from "../../jsx/components/MassEmail/MassEmail";
const MassEmailPage = (props) => (
  <div id="main-wrapper" className="show mh100vh ">
    <Nav portalURL={props.portalURL}  token={props.token}/>
    <div className="content-body">
      <div
        className="container-fluid"
        style={{ minHeight: window.screen.height - 60 }}
      >
        <MassEmail {...props} />
      </div>
    </div>
    <Footer />
  </div>
);

export default MassEmailPage;
