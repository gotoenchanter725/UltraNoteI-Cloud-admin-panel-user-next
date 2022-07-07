import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import BarChart1 from "../charts/Chartjs/bar1";
import { allUsers } from "../../../redux/home/home.actions";
import { selectUserToken } from "../../../redux/user/user.selectors";
import { selectProfileData } from "../../../redux/user/user.selectors";
import { setUserProfileData } from "../../../redux/user/user.actions";
import { selectHomeUsers } from "../../../redux/home/home.selectors";
import WithSpinner from "../spinner/spinner";
import PageTitle from "../../layouts/PageTitle";

const Home = ({ tokem, saveUsers, users, setUserProfileData, portalURL }) => {
  const state = {
    totalUsersCount: 0,
    activeUsersCount: 0,
    suspendedUsersCount: 0,
    notActiveUsersCount: 0,
    cards: [
      {
        title: "Total Users",
        icon: "la la-users",
        color: "info",
        value: 0,
      },
      {
        title: "Active Users",
        icon: "la la-user-check",
        color: "success",
        value: 0,
      },
      {
        title: "Not Active Users",
        icon: "la la-user-times",
        color: "danger",
        value: 0,
      },
      {
        title: "Suspended Users",
        icon: "la la-user-times",
        color: "warning",
        value: 0,
      },
    ],
  };
  const [data, setData] = useState(state);

  useEffect(() => {
    axios
      .get(portalURL + "api/users/user_list", {
        headers: {
          Authorization: tokem.token,
        },
      })
      .then((res) => {
        let { users } = res.data;
        saveUsers(users);
        let values = {
          totalUsersCount: users.length,
          activeUsersCount: users.filter((user) => user.isActive).length,
          notActiveUsersCount: users.filter((user) => !user.isActive).length,
          suspendedUsersCount: users.filter((user) => user.suspended).length,
        };

        Object.values(values).forEach(
          (value, index) => (data.cards[index].value = value)
        );

        setData({
          ...values,
          cards: [...data.cards],
        });
      })
      .catch((error) => console.log(error));
    axios
      .get(portalURL + "api/admin/profiledetails", {
        headers: {
          Authorization: tokem.token,
        },
      })
      .then((res) => {
        setUserProfileData(res.data.user[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (users) {
    return (
      <Fragment>
        <PageTitle activeMenu="Dashboard" motherMenu="App" />
        <div className="col-12">
          <div className="row">
            {data.cards.map((card, index) => (
              <div className="col-sm-12 col-md-6 col-lg-3 col-xxl-3">
                <div className="widget-stat card">
                  <div className="card-body p-4">
                    <div className="media ai-icon">
                      <span className={`mr-3 text-${card.color}`}>
                        <i className={card.icon} />
                      </span>
                      <div className="media-body">
                        <p className="mb-1">{card.title}</p>
                        <h4 className="mb-0">{card.value}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Registered users by month</h4>
                </div>
                <div className="card-body">
                  <div className="chart-wrapper">
                    <BarChart1 users={users} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <WithSpinner />;
  }
};

const mapStateToProps = createStructuredSelector({
  tokem: selectUserToken,
  users: selectHomeUsers,
  userProfileData: selectProfileData,
});
const mapDispatchToProps = (dispatch) => ({
  saveUsers: (users) => dispatch(allUsers(users)),
  setUserProfileData: (userProfileData) =>
    dispatch(setUserProfileData(userProfileData)),
  selectUserProfileData: (profile) => dispatch(selectProfileData(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
