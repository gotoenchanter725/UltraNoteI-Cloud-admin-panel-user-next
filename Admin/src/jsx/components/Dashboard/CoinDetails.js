import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { Dropdown } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import {CoinIcon1, CoinIcon2, CoinIcon3, CoinIcon4	} from "../zenix/Transactions/TableData";
import {TabDataOrder, TabDataTrade, DropdownButton} from "../zenix/CoinDetails/TabData";

//Images
import btc1 from './../../../images/svg/btc1.svg';
import eth2 from './../../../images/svg/eth2.svg';
import monero from './../../../images/svg/monero.svg';
import lit3 from './../../../images/svg/lit3.svg';

const ChartBarRunning = loadable(() =>
	pMinDelay(import("../zenix/CoinDetails/ChartBarRunning"), 1000)
);
const ChartBarRunning2 = loadable(() =>
	pMinDelay(import("../zenix/CoinDetails/ChartBarRunning2"), 1000)
);
const ChartBarRunning3 = loadable(() =>
	pMinDelay(import("../zenix/CoinDetails/ChartBarRunning3"), 1000)
);
const ChartBarRunning4 = loadable(() =>
	pMinDelay(import("../zenix/CoinDetails/ChartBarRunning4"), 1000)
);

const CoinDetails = () => {
	const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
	const [crrency1, setCrrency1] = useState("USD ($ US Dollar)");
	const [crrency2, setCrrency2] = useState("BTC ($ US Dollar)");
	const [crrency3, setCrrency3] = useState("USD ($ US Dollar)");
	
	return(
		<>
			<div className=" form-head d-flex flex-wrap mb-4 align-items-center">
				<h2 className="text-black mr-auto font-w600 mb-3">Coin Details</h2>
				<div className="card-action coin-tabs mt-3 mt-sm-0">
					<ul className="nav nav-tabs" role="tablist">
						<li className="nav-item">
							<Link to ={"#"} className= {classnames({ active : activeTab === '1'}) + ' nav-link'} onClick={() => { toggle('1'); }}>
								<CoinIcon4 />
							</Link>
						</li>
						<li className="nav-item">
							<Link to ={"#"} className= {classnames({ active : activeTab === '2'}) + ' nav-link'} onClick={() => { toggle('2'); }}>
								<CoinIcon3 />
							</Link>
						</li>
						<li className="nav-item">
							<Link to ={"#"} className= {classnames({ active : activeTab === '3'}) + ' nav-link'} onClick={() => { toggle('3'); }}>
								<CoinIcon2 />
							</Link>
						</li>
						<li className="nav-item">
							<Link to ={"#"} className= {classnames({ active : activeTab === '4'}) + ' nav-link'} onClick={() => { toggle('4'); }}>
								<CoinIcon1 />
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="tab-content">
				<div className="tab-pane active show fade " id="Bitcoin">
					<TabContent activeTab={activeTab}>
						<TabPane tabId="1">
							<div className="row">
								<div className="col-xl-3 col-xxl-4 mt-4">
									<div className="card">
										<div className="card-header pb-0 border-0">
											<h4 className="mb-0 text-black fs-20">About</h4>
											<DropdownButton />
										</div>
										<PerfectScrollbar className="card-body dz-scroll height400">
											<div className="d-flex align-items-start mb-3 about-coin">
												<div><img src={btc1} alt="" /></div>
												<div className="ml-3">
													<h2 className="font-w600 text-black mb-0 title">Digital Cash</h2>
													<p className="font-w600 text-black sub-title">BTC</p>
													<span>1 BTC = 68.48 USD</span>
												</div>	
											</div>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
										</PerfectScrollbar>		
										<div className="card-footer border-0 p-0 caret">
											<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-xxl-8 mt-4">
									<div className="card">
										<div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center select-btn">
											<div className="mr-auto mb-3">
												<h4 className="fs-20 text-black">Coin Chart</h4>
												<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
											</div>
											
											{/* <div className="input-group detault-daterange mr-3  mb-3" >
												<span className="input-group-text"><i className="las la-calendar"></i></span>
												<input type="text" className="form-control input-daterange-timepicker" name="daterange" value="04/01/2015 1:30 PM - 01/01/2015 2:00 PM" />
											</div> */}
											<div className="input-group detault-daterange mr-3  mb-3 coinDetails-datepiker">
												<span className="input-group-text"> <i className="las la-calendar" /></span>
												<DateRangePicker>
													<input type="text" className="form-control input-daterange-timepicker" />
												</DateRangePicker>
											</div>
											<Dropdown>
												<Dropdown.Toggle variant="" className="form-control style-1 default-select  mb-3">{crrency1}</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("BTC ($ US Dollar)")}>BTC ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
												 </Dropdown.Menu>
											</Dropdown>
										</div>
										<div className="card-body pb-0 pt-sm-3 pt-0">
											<div className="row sp20 mb-4 align-items-center">
												<div className="col-lg-4 col-xxl-4 col-sm-4 d-flex flex-wrap align-items-center">
													<div className="px-2 info-group">
														<p className="fs-18 mb-1">Price</p>
														<h2 className="fs-28 font-w600 text-black">$11,898.15</h2>
													</div>
												</div>
												<div className="d-flex col-lg-8 col-xxl-8 col-sm-8 align-items-center mt-sm-0 mt-3 justify-content-end">
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">28h% change</p>
														<h3 className="fs-20 font-w600"><span className="text-success">1.64%</span>
														<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0 7L7.00001 -8.77983e-06L14 7H7.00001H0Z" fill="#2BC155"></path>
														</svg>
														</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Volume (28h)</p>
														<h3 className="fs-20 font-w600 text-black">$67.58B</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Market Cap</p>
														<h3 className="fs-20 font-w600 text-black">$549.84B</h3>
													</div>
												</div>
											</div>
											<div id="chartBarRunning" className="bar-chart market-line">
												<ChartBarRunning />
											</div>
										</div>
									</div>
								</div>
								{ /* Sell Order and Buy Order Section */}
									<TabDataTrade />
								{ /* Sell Order and Buy Order Section  End*/}			
								{ /* Sell Order and Buy Order Section */}
									<TabDataOrder />
								{ /* Sell Order and Buy Order Section  End*/}
								
							</div>	
						</TabPane>
						<TabPane tabId="2">
							<div className="row">
								<div className="col-xl-3 col-xxl-4 mt-4">
									<div className="card">
										<div className="card-header pb-0 border-0">
											<h4 className="mb-0 text-black fs-20">About</h4>
											<DropdownButton />
										</div>
										<PerfectScrollbar className="card-body dz-scroll height400">
											<div className="d-flex align-items-start mb-3 about-coin">
												<div><img src={eth2} alt="" /></div>
												<div className="ml-3">
													<h2 className="font-w600 text-black mb-0 title">Digital Cash</h2>
													<p className="font-w600 text-black sub-title">ETH</p>
													<span>1 ETH = 68.48 USD</span>
												</div>	
											</div>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
										</PerfectScrollbar>		
										
										<div className="card-footer border-0 p-0 caret">
											<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-xxl-8 mt-4">
									<div className="card">
										<div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center select-btn">
											<div className="mr-auto mb-3">
												<h4 className="fs-20 text-black">Coin Chart</h4>
												<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
											</div>
											<div className="input-group detault-daterange mr-3  mb-3 coinDetails-datepiker">
												<span className="input-group-text"> <i className="las la-calendar" /></span>
												<DateRangePicker>
													<input type="text" className="form-control input-daterange-timepicker" />
												</DateRangePicker>
											</div>
											<Dropdown>
												<Dropdown.Toggle variant="" className="form-control style-1 default-select  mb-3">{crrency1}</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("BTC ($ US Dollar)")}>BTC ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
												 </Dropdown.Menu>
											</Dropdown>
										</div>
										<div className="card-body pb-0 pt-sm-3 pt-0">
											<div className="row sp20 mb-4 align-items-center">
												<div className="col-lg-4 col-xxl-4 col-sm-4 d-flex flex-wrap align-items-center">
													<div className="px-2 info-group">
														<p className="fs-18 mb-1">Price</p>
														<h2 className="fs-28 font-w600 text-black">$15,456.43</h2>
													</div>
												</div>
												<div className="d-flex col-lg-8 col-xxl-8 col-sm-8 align-items-center mt-sm-0 mt-3 justify-content-end">
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">24h% change</p>
														<h3 className="fs-20 font-w600"><span className="text-success">3.29%</span>
														<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0 7L7.00001 -8.77983e-06L14 7H7.00001H0Z" fill="#2BC155"></path>
														</svg>
														</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Volume (24h)</p>
														<h3 className="fs-20 font-w600 text-black">$47.22B</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Market Cap</p>
														<h3 className="fs-20 font-w600 text-black">$219.24B</h3>
													</div>
												</div>
											</div>
											<div id="chartBarRunning1" className="bar-chart market-line">
												<ChartBarRunning2 />
											</div>
										</div>
									</div>
								</div>
								{ /* Sell Order and Buy Order Section */}
									<TabDataTrade />
								{ /* Sell Order and Buy Order Section  End*/}			
								{ /* Sell Order and Buy Order Section */}
									<TabDataOrder />
								{ /* Sell Order and Buy Order Section  End*/}
								
							</div>	
						</TabPane>
						<TabPane tabId="3">
							<div className="row">
								<div className="col-xl-3 col-xxl-4 mt-4">
									<div className="card">
										<div className="card-header pb-0 border-0">
											<h4 className="mb-0 text-black fs-20">About</h4>
											<DropdownButton />
										</div>
										<PerfectScrollbar className="dz-scroll card-body height400">
											<div className="d-flex align-items-start mb-3 about-coin">
												<div><img src={monero} alt="" /></div>
												<div className="ml-3">
													<h2 className="font-w600 text-black mb-0 title">Digital Cash</h2>
													<p className="font-w600 text-black sub-title">XMR</p>
													<span>1 XMR = 68.48 USD</span>
												</div>	
											</div>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
										</PerfectScrollbar>		
										
										<div className="card-footer border-0 p-0 caret">
											<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-xxl-8 mt-4">
									<div className="card">
										<div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center select-btn">
											<div className="mr-auto mb-3">
												<h4 className="fs-20 text-black">Coin Chart</h4>
												<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
											</div>
											
											<div className="input-group detault-daterange mr-3  mb-3 coinDetails-datepiker">
												<span className="input-group-text"> <i className="las la-calendar" /></span>
												<DateRangePicker>
													<input type="text" className="form-control input-daterange-timepicker" />
												</DateRangePicker>
											</div>
											<Dropdown>
												<Dropdown.Toggle variant="" className="form-control style-1 default-select  mb-3">{crrency1}</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("BTC ($ US Dollar)")}>BTC ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
												 </Dropdown.Menu>
											</Dropdown>
										</div>
										<div className="card-body pb-0 pt-sm-3 pt-0">
											<div className="row sp20 mb-4 align-items-center">
												<div className="col-lg-4 col-xxl-4 col-sm-4 d-flex flex-wrap align-items-center">
													<div className="px-2 info-group">
														<p className="fs-18 mb-1">Price</p>
														<h2 className="fs-28 font-w600 text-black">$09,123.37</h2>
													</div>
												</div>
												<div className="d-flex col-lg-8 col-xxl-8 col-sm-8 align-items-center mt-sm-0 mt-3 justify-content-end">
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">56h% change</p>
														<h3 className="fs-20 font-w600"><span className="text-success">3.48%</span>
														<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0 7L7.00001 -8.77983e-06L14 7H7.00001H0Z" fill="#2BC155"></path>
														</svg>
														</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Volume (56h)</p>
														<h3 className="fs-20 font-w600 text-black">$54.33B</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Market Cap</p>
														<h3 className="fs-20 font-w600 text-black">$728.56B</h3>
													</div>
												</div>
											</div>
											<div id="chartBarRunning2" className="bar-chart market-line">
												<ChartBarRunning3 />
											</div>
										</div>
									</div>
								</div>
								{ /* Sell Order and Buy Order Section */}
									<TabDataTrade />
								{ /* Sell Order and Buy Order Section  End*/}			
								{ /* Sell Order and Buy Order Section */}
									<TabDataOrder />
								{ /* Sell Order and Buy Order Section  End*/}
								
							</div>	
						</TabPane>
						<TabPane tabId="4">
							<div className="row">
								<div className="col-xl-3 col-xxl-4 mt-4">
									<div className="card">
										<div className="card-header pb-0 border-0">
											<h4 className="mb-0 text-black fs-20">About</h4>
											<DropdownButton />
										</div>
										<PerfectScrollbar className="card-body dz-scroll height400">
											<div className="d-flex align-items-start mb-3 about-coin">
												<div><img src={lit3} alt="" /></div>
												<div className="ml-3">
													<h2 className="font-w600 text-black mb-0 title">Digital Cash</h2>
													<p className="font-w600 text-black sub-title">LTC</p>
													<span>1 LTC = 68.48 USD</span>
												</div>	
											</div>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
											<p className="fs-14">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO) run by a subset of its users, which are called "masternodes". The currency permits transactions that can be untraceable.</p>
										</PerfectScrollbar>		
										
										<div className="card-footer border-0 p-0 caret">
											<Link to={"./coin-details"} className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-xxl-8 mt-4">
									<div className="card">
										<div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center select-btn">
											<div className="mr-auto mb-3">
												<h4 className="fs-20 text-black">Coin Chart</h4>
												<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
											</div>
											
											<div className="input-group detault-daterange mr-3  mb-3 coinDetails-datepiker">
												<span className="input-group-text"> <i className="las la-calendar" /></span>
												<DateRangePicker>
													<input type="text" className="form-control input-daterange-timepicker" />
												</DateRangePicker>
											</div>
											<Dropdown>
												<Dropdown.Toggle variant="" className="form-control style-1 default-select  mb-3">{crrency1}</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("BTC ($ US Dollar)")}>BTC ($ US Dollar)</Dropdown.Item>
													<Dropdown.Item onClick={() => setCrrency1("USD ($ US Dollar)")}>USD ($ US Dollar)</Dropdown.Item>
												 </Dropdown.Menu>
											</Dropdown>
										</div>
										<div className="card-body pb-0 pt-sm-3 pt-0">
											<div className="row sp20 mb-4 align-items-center">
												<div className="col-lg-4 col-xxl-4 col-sm-4 d-flex flex-wrap align-items-center">
													<div className="px-2 info-group">
														<p className="fs-18 mb-1">Price</p>
														<h2 className="fs-28 font-w600 text-black">$25,741.21</h2>
													</div>
												</div>
												<div className="d-flex col-lg-8 col-xxl-8 col-sm-8 align-items-center mt-sm-0 mt-3 justify-content-end">
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">34h% change</p>
														<h3 className="fs-20 font-w600"><span className="text-success">2.45%</span>
														<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0 7L7.00001 -8.77983e-06L14 7H7.00001H0Z" fill="#2BC155"></path>
														</svg>
														</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Volume (34h)</p>
														<h3 className="fs-20 font-w600 text-black">$36.11B</h3>
													</div>
													<div className="px-2 info-group">
														<p className="fs-14 mb-1">Market Cap</p>
														<h3 className="fs-20 font-w600 text-black">$756.35B</h3>
													</div>
												</div>
											</div>
											<div id="chartBarRunning3" className="bar-chart market-line">
												<ChartBarRunning4 />
											</div>
										</div>
									</div>
								</div>
								{ /* Sell Order and Buy Order Section */}
									<TabDataTrade />
								{ /* Sell Order and Buy Order Section  End*/}			
								{ /* Sell Order and Buy Order Section */}
									<TabDataOrder />
								{ /* Sell Order and Buy Order Section  End*/}
								
							</div>	
						</TabPane>
					</TabContent>
				</div>
			</div>	
		</>
	)
}
export default CoinDetails;