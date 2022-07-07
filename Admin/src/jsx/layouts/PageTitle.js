import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, activeMenu, pageContent }) => {
  let path = window.location.pathname.split("/");

  return (
    <div className="row page-titles mx-0">
      <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
        <h2>{activeMenu}</h2>
     </div>
      </div>
      <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/${path[path.length - 1]}`}>{motherMenu}</Link>
          </li>
          <li className="breadcrumb-item active c">
            <Link to={`/${path[path.length - 1]}`}>{activeMenu}</Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PageTitle;
