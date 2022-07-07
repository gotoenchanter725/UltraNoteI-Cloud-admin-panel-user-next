import React from "react";
import Nav from "../../jsx/layouts/nav";
import Footer from "../../jsx/layouts/Footer";
import UserTransactions from "../../jsx/components/UserManagement/UserTransactions";
const UserTransactionsPage = (props) => (
  <div id="main-wrapper" className="show mh100vh ">
    <Nav portalURL={props.portalURL}  token={props.token}/>
    <div className="content-body">
      <div
        className="container-fluid"
        style={{ minHeight: window.screen.height - 60 }}
      >
        <UserTransactions {...props} />
      </div>
    </div>
    <Footer />
  </div>
);

export default UserTransactionsPage;
