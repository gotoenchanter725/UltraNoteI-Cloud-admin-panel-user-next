import React from "react";
import Login from "../jsx/pages/Login";

const LoginPage = (props) => (
  <div
    className="container-fluid"
    style={{ minHeight: window.screen.height - 60 }}
  >
    <Login {...props}/>
  </div>
);

export default LoginPage;
