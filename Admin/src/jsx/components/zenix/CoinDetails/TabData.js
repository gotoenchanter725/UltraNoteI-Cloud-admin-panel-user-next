import React from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";

const orderdataBlog = [
  { price: "82.1", amount: "58.9", total: "134.10" },
  { price: "85.2", amount: "55.8", total: "136,12" },
  { price: "87.3", amount: "53.7", total: "138,12" },
  { price: "89.4", amount: "51.6", total: "139,12" },
  { price: "91.9", amount: "47.1", total: "140,12" },
  { price: "93.8", amount: "46.2", total: "142,12" },
  { price: "94.7", amount: "45.3", total: "145,12" },
  { price: "97.6", amount: "44.4", total: "147,12" },
];

const TabDataTrade = () => {
	return(
		<>
			<div className="col-xl-6 col-xxl-12">
				<div className="card">
					<div className="card-header d-sm-flex d-block pb-0 border-0">
						<div>
							<h4 className="fs-20 text-black">Quick Trade</h4>
							<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
						</div>
						<Dropdown className="custom-dropdown d-block mt-3 mt-sm-0 mb-0">
							<Dropdown.Toggle variant="" className="btn border border-warning btn-sm d-flex align-items-center svg-btn i-false" data-toggle="dropdown">
								<svg className="mr-2" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M28.5 16.5002C28.4986 14.844 27.156 13.5018 25.5003 13.5H16.5002V19.4999H25.5003C27.156 19.4985 28.4986 18.1559 28.5 16.5002Z" fill="#FFAB2D"/>
									<path d="M16.5002 28.5H25.5003C27.1569 28.5 28.5 27.1569 28.5 25.5003C28.5 23.8432 27.1569 22.5001 25.5003 22.5001H16.5002V28.5Z" fill="#FFAB2D"/>
									<path d="M21 9.15527e-05C9.40213 9.15527e-05 0.00012207 9.4021 0.00012207 21C0.00012207 32.5979 9.40213 41.9999 21 41.9999C32.5979 41.9999 41.9999 32.5979 41.9999 21C41.9867 9.40759 32.5924 0.0133667 21 9.15527e-05ZM31.5002 25.4998C31.4961 28.8122 28.8122 31.4961 25.5003 31.4997V32.9998C25.5003 33.8284 24.8283 34.4999 24.0002 34.4999C23.1717 34.4999 22.5001 33.8284 22.5001 32.9998V31.4997H19.5004V32.9998C19.5004 33.8284 18.8284 34.4999 18.0003 34.4999C17.1718 34.4999 16.5002 33.8284 16.5002 32.9998V31.4997H12.0004C11.1718 31.4997 10.5003 30.8282 10.5003 30.0001C10.5003 29.1715 11.1718 28.5 12.0004 28.5H13.5V13.5H12.0004C11.1718 13.5 10.5003 12.8285 10.5003 11.9999C10.5003 11.1714 11.1718 10.4998 12.0004 10.4998H16.5002V9.00018C16.5002 8.17163 17.1718 7.50009 18.0003 7.50009C18.8289 7.50009 19.5004 8.17163 19.5004 9.00018V10.4998H22.5001V9.00018C22.5001 8.17163 23.1717 7.50009 24.0002 7.50009C24.8288 7.50009 25.5003 8.17163 25.5003 9.00018V10.4998C28.7999 10.4861 31.486 13.1494 31.5002 16.4489C31.5075 18.1962 30.7499 19.8593 29.4265 21C30.7376 22.1279 31.4943 23.7699 31.5002 25.4998Z" fill="#FFAB2D"/>
								</svg>
								<span className="text-black fs-16">23,511 LTC</span>
								<i className="fa fa-angle-down text-black scale3 ml-2"></i>
							</Dropdown.Toggle>
							<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
								<Link className="dropdown-item" to="#">345,455 ETH</Link>
								<Link className="dropdown-item text-danger" to="#">789,123 BTH</Link>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="card-body">
						<div className="basic-form">
							<form className="form-wrapper">
								<div className="form-group">
									<div className="input-group input-group-lg">
										<div className="input-group-prepend">
											<span className="input-group-text">Amount BTC</span>
										</div>
										<input type="number" className="form-control" placeholder="52.5" />
									</div>
								</div>
								<div className="form-group">
									<div className="input-group input-group-lg">
										<div className="input-group-prepend">
											<span className="input-group-text ">Price BPL</span>
										</div>
										<input type="number" className="form-control" placeholder="0,000000" />
									</div>
								</div>
								<div className="form-group">
									<div className="input-group input-group-lg">
										<div className="input-group-prepend">
											<span className="input-group-text">Fee (1%)</span>
										</div>
										<input type="number" className="form-control" placeholder="0,000000" />
									</div>
								</div>
								<div className="form-group">
									<div className="input-group input-group-lg">
										<div className="input-group-prepend">
											<span className="input-group-text">Total BPL</span>
										</div>
										<input type="number" className="form-control" placeholder="0,000000"/>
									</div>
								</div>
								<div className="row mt-4 align-items-center">
									<div className="col-sm-6 mb-3">
										<p className="mb-0 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
									</div>
									<div className="col-sm-6 text-sm-right text-left">
										<Link to={"#"} className="btn  btn-success text-white mb-2">BUY
											<svg className="ml-4 scale3" width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M16.9638 11.5104L16.9721 14.9391L3.78954 1.7565C3.22815 1.19511 2.31799 1.19511 1.75661 1.7565C1.19522 2.31789 1.19522 3.22805 1.75661 3.78943L14.9392 16.972L11.5105 16.9637L11.5105 16.9637C10.7166 16.9619 10.0715 17.6039 10.0696 18.3978C10.0677 19.1919 10.7099 19.8369 11.5036 19.8388L11.5049 19.3388L11.5036 19.8388L18.3976 19.8554L18.4146 19.8555L18.4159 19.8555C18.418 19.8555 18.42 19.8555 18.422 19.8555C19.2131 19.8533 19.8528 19.2114 19.8555 18.4231C19.8556 18.4196 19.8556 18.4158 19.8556 18.4117L19.8389 11.5035L19.8389 11.5035C19.8369 10.7097 19.1919 10.0676 18.3979 10.0695C17.604 10.0713 16.9619 10.7164 16.9638 11.5103L16.9638 11.5104Z" fill="white" stroke="white"></path>
											</svg>
										</Link>
										<Link to={"#"} className="btn btn-danger ml-4 mb-2">SELL
											<svg className="ml-4 scale5" width="16" height="16" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M5.35182 13.4965L5.35182 13.4965L5.33512 6.58823C5.33508 6.5844 5.3351 6.58084 5.33514 6.57759M5.35182 13.4965L5.83514 6.58306L5.33514 6.58221C5.33517 6.56908 5.33572 6.55882 5.33597 6.5545L5.33606 6.55298C5.33585 6.55628 5.33533 6.56514 5.33516 6.57648C5.33515 6.57684 5.33514 6.57721 5.33514 6.57759M5.35182 13.4965C5.35375 14.2903 5.99878 14.9324 6.79278 14.9305C7.58669 14.9287 8.22874 14.2836 8.22686 13.4897L8.22686 13.4896L8.21853 10.0609M5.35182 13.4965L8.21853 10.0609M5.33514 6.57759C5.33752 5.789 5.97736 5.14667 6.76872 5.14454C6.77041 5.14452 6.77217 5.14451 6.77397 5.14451L6.77603 5.1445L6.79319 5.14456L13.687 5.16121L13.6858 5.66121L13.687 5.16121C14.4807 5.16314 15.123 5.80809 15.1211 6.6022C15.1192 7.3961 14.4741 8.03814 13.6802 8.03626L13.6802 8.03626L10.2515 8.02798L23.4341 21.2106C23.9955 21.772 23.9955 22.6821 23.4341 23.2435C22.8727 23.8049 21.9625 23.8049 21.4011 23.2435L8.21853 10.0609M5.33514 6.57759C5.33513 6.57959 5.33514 6.58159 5.33514 6.5836L8.21853 10.0609M6.77407 5.14454C6.77472 5.14454 6.77537 5.14454 6.77603 5.14454L6.77407 5.14454Z" fill="white" stroke="white"></path>
											</svg>
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
const TabDataOrder = () => {
	return(
		<>
			<div className="col-xl-6 col-xxl-12">
				<div className="row">
					<div className="col-sm-6">
						<div className="card">
							<div className="card-header border-0 pb-0">
								<h4 className="mb-0 text-black fs-20">Sell Order</h4>
								<Dropdown className="dropdown custom-dropdown mb-0 tbl-orders-style">
									<Dropdown.Toggle variant="" className="btn sharp tp-btn i-false" data-toggle="dropdown">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</Dropdown.Toggle>
									<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
										<Link className="dropdown-item" to="#">Details</Link>
										<Link className="dropdown-item text-danger" to="#">Cancel</Link>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="card-body p-3">
								<div className="table-responsive">
									<table className="table text-center bg-warning-hover tr-rounded order-tbl">
										<thead>
											<tr>
												<th className="text-left">Price</th>
												<th className="text-center">Amount</th>
												<th className="text-right">Total</th>
											</tr>
										</thead>
										<tbody>
											{orderdataBlog.map((data,index)=>(
												<tr>
													<td className="text-left">{data.price}</td>
													<td>{data.amount}</td>
													<td className="text-right">${data.total}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="card-footer border-0 p-0 caret">
								<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
							</div>
						</div>
					</div>
					<div className="col-sm-6 m-t25">
						<div className="card">
							<div className="card-header border-0 pb-0">
								<h4 className="mb-0 text-black fs-20">Buy Order</h4>
								<Dropdown className="dropdown custom-dropdown mb-0 tbl-orders-style">
									<Dropdown.Toggle variant="" className="btn sharp tp-btn i-false" data-toggle="dropdown">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</Dropdown.Toggle>
									<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
										<Link className="dropdown-item" to="#">Details</Link>
										<Link className="dropdown-item text-danger" to="#">Cancel</Link>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="card-body p-3">
								<div className="table-responsive">
									<table className="table text-center bg-warning-hover tr-rounded order-tbl">
										<thead>
											<tr>
												<th className="text-left">Price</th>
												<th className="text-center">Amount</th>
												<th className="text-right">Total</th>
											</tr>
										</thead>
										<tbody>
											{orderdataBlog.map((data,index)=>(
												<tr>
													<td className="text-left">{data.amount}</td>
													<td>{data.price}</td>
													<td className="text-right">${data.total}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="card-footer border-0 p-0 caret">
								<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
} 

const DropdownButton = () => {
	return(
		<>
			<Dropdown className="custom-dropdown mb-0 tbl-orders-style">
				<Dropdown.Toggle variant="" className="btn sharp tp-btn i-false" data-toggle="dropdown">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
					<Link className="dropdown-item" to="#">Details</Link>
					<Link className="dropdown-item text-danger" to="#">Cancel</Link>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

export  {TabDataOrder, TabDataTrade,DropdownButton};