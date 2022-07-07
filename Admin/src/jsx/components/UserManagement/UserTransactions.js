import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../AppsMenu/AppProfile/AppProfile.css";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Tabs, Tab } from "react-bootstrap";

const UserTransactions = (props) => {
  const { id } = props.match.params;
  const { token } = props;
  const paginationOptions = paginationFactory({
    sizePerPage: 8,
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
  });
  useEffect(() => {
    axios
      .post(props.portalURL + "api/users/user_profile", {
        userId: id,
      })
      .then((res) => {
        setUserData(res.data.user);
        axios
          .post(props.portalURL + "api/wallets/wallet_list")
          .then((resp) => {
            const { wallets } = resp.data;
            const wallet = wallets.filter(
              (wallet) => wallet.walletHolder == res.data.user._id
            );
            setWalletData(wallet[0]);
            return wallet[0]?.address || null;
          })
          .then((address) => {
            axios
              .get(
                "https://cloud.ultranote.org/api/wallets/transactions/" +
                  address
              )
              .then((res) => {
                setTransactions(res.data);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("deposits");
  const [walletData, setWalletData] = useState([]);
  const handleBack = () => {
    props.history.goBack();
  };
  const renderTable = (type) => {
    let columns = [
      {
        dataField: "recipientAdress",
        text: "Address",
        width: "20px",
        formatter: (cell, row) => {
          return (
            <p
              style={{
                maxWidth: "200px",
              }}
            >
              {row.recipientAdress}
            </p>
          );
        },
      },
      {
        dataField: "amount",
        text: "Amount",
      },
      {
        dataField: "hash",
        text: "Transaction Hash",
        formatter: (cell, row) => {
          return (
            <p
              style={{
                maxWidth: "200px",
              }}
            >
              <a
                href={`https://explorer.ultranote.org/index.html?hash=${row.hash}`}
                target="_blank"
              >
                {row.hash}
              </a>
            </p>
          );
        },
      },
      {
        dataField: "updatedAt",
        text: "Updated At",
        formatter: (cell, row) => {
          let date = new Date(row.updatedAt);
          return <span>{date.toLocaleString()}</span>;
        },
      },
    ];
    return (
      <Fragment>
        <BootstrapTable
          keyField="id"
          data={transactions[type] || []}
          columns={columns}
          pagination={paginationOptions}
          striped
          hover
          wrapperClasses="table-responsive m-0"
          classes="mb-4 dataTablesCard short-one card-table text-black dataTable no-footer "
          noDataIndication={() => "No Transactions Found"}
        />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Transaction List" motherMenu="App" />
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <Tabs
                defaultActiveKey="deposit"
                transition={false}
                className="mb-3"
              >
                <Tab eventKey="deposit" title="Deposit">
                  {renderTable("deposit")}
                </Tab>
                <Tab eventKey="withdraw" title="Withdraw">
                  {renderTable("withdraw")}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserTransactions;
