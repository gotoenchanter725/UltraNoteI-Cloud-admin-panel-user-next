import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUserToken } from "../../../redux/user/user.selectors";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { toast, ToastContainer } from "react-toastify";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.tokem.token,
      data: [],
      filter: "all",
      sort: 8,
      activePag: 0,
      test: 0,
      allUsers: [],
      activeUsers: [],
      inactiveUsers: [],
      suspendedUsers: [],
      totalUsers: 0,
    };
    this.paggination = Array(
      Math.ceil(this.state.data.length / this.state.sort)
    );
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get(`${this.props.portalURL}api/users/user_list`, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then(({ data: { users } }) => {
        console.log({
          walletUsers: users.filter((user) => user.isWalletCreated === true),
        });
        this.setState({
          allUsers: users,
          data: users,
          activeUsers: users.filter((user) => user.isActive === true),
          inactiveUsers: users.filter((user) => user.isActive === false),
          suspendedUsers: users.filter((user) => user.suspended === true),
          deletedUsers: users.filter((user) => user.deleted === true),
          totalUsers: users.length,
          walletUsers: users.filter((user) => user.isWalletCreated === true),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  chageData = (frist, sec) => {
    for (var i = 0; i < this.state.data.length; ++i) {
      if (i >= frist && i < sec) {
        this.state.data[i].classList.remove("d-none");
      } else {
        this.state.data[i].classList.add("d-none");
      }
    }
  };

  onClick = (i) => {
    this.state.activePag.current = i;
    this.chageData(
      this.state.activePag.current * this.state.sort,
      (this.state.activePag.current + 1) * this.state.sort
    );
  };

  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .put(
          `${this.props.portalURL}api/users/delete_user`,
          {
            userId: id,
          },
          {
            headers: {
              Authorization: this.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.getUsers();
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  searchHandler = (e) => {
    const search = e.target.value.trim();
    if (search === "") {
      this.setState({
        data: this.state.allUsers,
      });
      return;
    }
    const searchUsers = this.state.data.filter((user) => {
      return (
        user.mail?.toLowerCase().includes(search.toLowerCase()) ||
        user?.wallet?.[0]?.address
          ?.toLowerCase()
          ?.includes(search?.toLowerCase())
      );
    });
    this.setState({
      data: searchUsers,
    });
  };

  changeFilter = (filter) => {
    switch (filter) {
      case "all":
        this.setState({
          data: this.state.allUsers,
        });
        break;
      case "active":
        this.setState({
          data: this.state.activeUsers,
        });
        break;
      case "inactive":
        this.setState({
          data: this.state.inactiveUsers,
        });
        break;
      case "suspended":
        this.setState({
          data: this.state.suspendedUsers,
        });
        break;
      case "wallet":
        this.setState({
          data: this.state.walletUsers,
        });
        break;
      case "deleted":
        this.setState({
          data: this.state.deletedUsers,
        });
        break;
      default:
        break;
    }
    this.setState({
      filter: filter,
    });
  };

  render() {
    const { data, totalUsers, filter } = this.state;
    return (
      <Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
        />
        <div className="form-head d-flex align-items-center flex-wrap mb-3">
          <h2 className="font-w600 mb-0 text-black">
            Users List ({filter.toUpperCase()})
          </h2>
          <div className="d-flex align-items-center ml-auto">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Enter email / wallet number"
              onChange={this.searchHandler}
            />
            <div className="form-group mb-0">
              <select
                className="form-control w-auto"
                onChange={(e) => {
                  this.changeFilter(e.target.value);
                }}
              >
                Search filters
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="deleted">Deleted</option>
                <option value="wallet">Has Wallet</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="table-responsive table-hover fs-14">
              <div
                id="example5_wrapper"
                className="dataTables_wrapper no-footer"
              >
                {totalUsers > 0 && (
                  <BootstrapTable
                    data={data}
                    keyField="_id"
                    wrapperClasses="table-responsive m-0"
                    classes="mb-4 dataTablesCard short-one card-table text-black dataTable no-footer "
                    pagination={paginationFactory({
                      sizePerPage: this.state.sort,
                      hideSizePerPage: true,
                      hidePageListOnlyOnePage: true,
                      alwaysShowAllBtns: true,
                      withFirstAndLast: false,
                      firstPageText: "First",
                      prePageText: "Prev",
                      nextPageText: "Next",
                      lastPageText: "Last",
                      nextPageTitle: "First page",
                      prePageTitle: "Pre page",
                      firstPageTitle: "Next page",
                      lastPageTitle: "Last page",
                      showTotal: true,
                      paginationTotalRenderer: (from, to, size) => (
                        <span className="pagination-total">
                          Showing {from} to {to} of {size} results
                        </span>
                      ),
                    })}
                    columns={[
                      {
                        dataField: "rowIndex",
                        text: "ID",
                        formatter: (cell, row, rowIndex) => {
                          return <span>{rowIndex + 1}</span>;
                        },
                      },
                      {
                        dataField: "mail",
                        text: "Email",
                      },
                      {
                        dataField: "isActive",
                        text: "Status",
                        formatter: (cell, row) => {
                          if (row.isActive && !row.suspended) {
                            return (
                              <span className="badge badge-success">
                                Active
                              </span>
                            );
                          } else {
                            return (
                              <span className="badge badge-danger">
                                Inactive
                              </span>
                            );
                          }
                        },
                      },
                      {
                        dataField: "isWalletCreated",
                        text: "Wallet",
                        formatter: (cell, row) => {
                          if (row.isWalletCreated) {
                            return (
                              <span className="badge badge-success">
                                Created
                              </span>
                            );
                          } else {
                            return (
                              <span className="badge badge-danger">
                                Not Created
                              </span>
                            );
                          }
                        },
                      },
                      {
                        dataField: "options",
                        text: "Options",
                        formatter: (cell, row) => {
                          return (
                            <div className="d-flex align-items-center">
                              <Link
                                to={`/users/${row._id}`}
                                className="btn btn-sm btn-secondary mr-1"
                              >
                                Edit
                              </Link>
                              <button
                                className="btn btn-sm btn-secondary mr-1"
                                onClick={() => this.onDelete(row._id)}
                              >
                                Delete
                              </button>
                              <Link
                                to={`/users/${row._id}/transactions`}
                                className="btn btn-sm btn-secondary"
                              >
                                Transactions
                              </Link>
                            </div>
                          );
                        },
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tokem: selectUserToken,
});

export default connect(mapStateToProps)(UserList);
