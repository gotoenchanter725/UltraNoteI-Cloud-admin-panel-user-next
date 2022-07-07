import React,{Fragment,useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { ThemeContext } from "../../../context/ThemeContext";


import Donut from "../zenix/MyWallets/Donut";
import WalletTab from "../zenix/MyWallets/WalletTab";
import ContactSlider from "../zenix/Home/ContactSlider";
import SwiperSlider2 from "../zenix/MyWallets/SwiperSlider2";


const CoinChart = loadable(() =>
  pMinDelay(import("../zenix/MyWallets/CoinChart"), 1000)
);

const Wallet = () => {
	const { background } = useContext(ThemeContext);
	const [crrency1, setCrrency1] = useState("Monthly (2021)");
	const [crrency2, setCrrency2] = useState("Monthly (2021)");
	const [crrency3, setCrrency3] = useState("Monthly (2021)");
	const [crrency4, setCrrency4] = useState("Monthly (2021)");
	return(
		<Fragment>
			<div className="form-head mb-sm-5 mb-3 d-flex align-items-center flex-wrap">
				<h2 className="font-w600 mb-0 mr-auto mb-2 text-black">My Wallet</h2>
				<Link to={"#"} className="btn btn-outline-secondary mr-3 mb-2"><i className="las la-calendar scale5 mr-2"></i>Filter Periode</Link>
				<Link to={"#"} className="btn btn-secondary mb-2">+ Add Wallet</Link>
			</div>
			<div className="row">
				<div className="col-xl-3 col-xxl-4">
					<div className="swiper-box">
						<SwiperSlider2 />
					</div>
				</div>
				<div className="col-xl-9 col-xxl-8">
					<div className="row">
						<div className="col-xl-12">
							<div className="d-block d-sm-flex mb-4">
								<h4 className="mb-0 text-black fs-20 mr-auto">Card Details</h4>
								<div className="d-flex mt-sm-0">
									<Link to={"#"} className="btn-link mr-3 underline">Generate Number</Link>
									<Link to={"#"} className="btn-link underline">Edit</Link>
								</div>
							</div>
						</div>	
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body">
									<div className="row align-items-end">
										<div className="col-xl-6 col-lg-12 col-xxl-12">
											<div className="row">
												<div className="col-sm-6">
													<div className="mb-4">
														<p className="mb-2">Card Name</p>
														<h4 className="text-black">Main Balance</h4>
													</div>
													<div className="mb-4">
														<p className="mb-2">Valid Date</p>
														<h4 className="text-black">08/21</h4>
													</div>
													<div>
														<p className="mb-2">Card Number</p>
														<h4 className="text-black">**** **** **** 1234</h4>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="mb-4">
														<p className="mb-2">Bank Name</p>
														<h4 className="text-black">ABC Center Bank</h4>
													</div>
													<div className="mb-4">
														<p className="mb-2">Card Holder</p>
														<h4 className="text-black">Marquezz Silalahi</h4>
													</div>
													<div>
														<p className="mb-2">Card Theme</p>
														<div className="btn-group theme-colors" data-toggle="buttons">
															<label className="btn btn-primary btn-sm active"><input type="radio" className="position-absolute invisible" name="options" id="option5" /> <i className="las la-check-circle"></i></label>
															<label className="btn btn-warning btn-sm"><input type="radio" className="position-absolute invisible" name="options" id="option1" checked="" /><i className="las la-check-circle"></i></label>
															<label className="btn btn-success btn-sm"><input type="radio" className="position-absolute invisible" name="options" id="option2" /> <i className="las la-check-circle"></i></label>
															<label className="btn btn-info btn-sm"><input type="radio" className="position-absolute invisible" name="options" id="option3" /> <i className="las la-check-circle"></i></label>
															<label className="btn btn-secondary btn-sm"><input type="radio" className="position-absolute invisible" name="options" id="option4" /> <i className="las la-check-circle"></i></label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-6 col-lg-12 col-xxl-12 mb-lg-0 mb-3">
											<p>Monthly Limits</p>
											<div className="row">
												<div className="col-sm-4 mb-sm-0 mb-4 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={66}
															backgroundColor="#FF6826"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={66} backgroundColor="#FF6826" />
														)}
														<small>66%</small>
													</div>
													<h5 className="fs-18 text-black">Main Limits</h5>
													<span>$10,000</span>
												</div>
												<div className="col-sm-4 mb-sm-0 mb-4 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={31}
															backgroundColor="#1DC624"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={31} backgroundColor="#1DC624" />
														)}
														<small>31%</small>
													</div>
													<h5 className="fs-18 text-black">Seconds</h5>
													<span>$500</span>
												</div>
												<div className="col-sm-4 text-center">
													<div className="d-inline-block position-relative donut-chart-sale mb-3">
														{background.value === "dark" ? (
														  <Donut
															value={7}
															backgroundColor="#9E9E9E"
															backgroundColor2="#F0F0F0"
														  />
														) : (
														  <Donut value={7} backgroundColor="#9E9E9E" />
														)}
														<small>7%</small>
													</div>
													<h5 className="fs-18 text-black">Others</h5>
													<span>$100</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header d-block d-sm-flex border-0 pb-sm-0 pb-0 align-items-center select-btn">
									<div className="mr-auto mb-sm-0 mb-3">
										<h4 className="fs-20 text-black">Coin Chart</h4>
										<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
									</div>
									<Dropdown>
										<Dropdown.Toggle variant="" className="form-control style-1 default-select">{crrency1}</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item onClick={() => setCrrency1("Monthly (2021)")}>Monthly (2021)</Dropdown.Item>
											<Dropdown.Item onClick={() => setCrrency1("Daily (2021)")}>Daily (2021)</Dropdown.Item>
											<Dropdown.Item onClick={() => setCrrency1("Weekly (2021)")}>Weekly (2021)</Dropdown.Item>
										 </Dropdown.Menu>
									</Dropdown>
								</div>
								<div className="card-body pt-3">
									<div className="flex-wrap mb-sm-4 mb-2 align-items-center">
										<div className="d-flex align-items-center">
											<span className="fs-32 text-black font-w600 pr-3">$557,235.31</span>
											<span className="fs-22 text-success">7% <i className="fa fa-caret-up scale5 ml-2 text-success" aria-hidden="true"></i></span>
										</div>
										<p className="mb-0 text-black mr-auto">Last Week <span className="text-success">$563,443</span></p>
									</div>
									<div id="chartTimeline" className="timeline-chart market-line">
										<CoinChart />	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6  mt-4">
					<div className="row">
						<div className="col-xl-12">
							<WalletTab  activeMenu ="Wallet Activity" />
						</div>
					</div>
				</div>
				<div className="col-xl-6 mt-4">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header d-sm-flex d-block pb-0 border-0">
									<div>
										<h4 className="fs-20 text-black">Quick Transfer</h4>
										<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
									</div>
									<Dropdown className="custom-dropdown d-block mt-3 mt-sm-0 mb-0">
										<Dropdown.Toggle variant="" className="btn border border-warning btn-sm d-flex align-items-center svg-btn i-false" data-toggle="dropdown">
											<svg className="mr-2" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M21 0C9.40213 0 0.00012207 9.40201 0.00012207 20.9999C0.00012207 32.5978 9.40213 41.9998 21 41.9998C32.5979 41.9998 41.9999 32.5978 41.9999 20.9999C41.9867 9.4075 32.5924 0.0132751 21 0ZM28.5 31.5001H16.5002C15.6717 31.5001 15.0001 30.8286 15.0001 30C15.0001 29.929 15.0052 29.8581 15.0152 29.7876L16.1441 21.8843L13.864 22.4547C13.7449 22.4849 13.6227 22.5 13.5 22.5C12.6715 22.4991 12.0009 21.8271 12.0013 20.9985C12.0022 20.311 12.4701 19.7122 13.137 19.5447L16.6018 18.6786L18.015 8.78723C18.1321 7.96692 18.892 7.39746 19.7123 7.51465C20.5327 7.63184 21.1021 8.39172 20.9849 9.21204L19.7444 17.8931L25.1364 16.545C25.9388 16.3403 26.755 16.8251 26.9592 17.6276C27.1638 18.43 26.679 19.2462 25.8766 19.4508C25.872 19.4518 25.8674 19.4531 25.8629 19.454L19.2857 21.0983L18.2287 28.4999H28.5C29.3286 28.4999 30.0001 29.1714 30.0001 30C30.0001 30.8281 29.3286 31.5001 28.5 31.5001Z" fill="#5974D5"/>
											</svg>
											<span className="text-black fs-16">23,511 LTC</span>
											<i className="fa fa-angle-down text-black scale3 ml-2"></i>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu-right" alignRight={true}>
											<Link className="dropdown-item" to="#">345,455 ETH</Link>
											<Link className="dropdown-item" to="#">789,123 BTH</Link>
										</Dropdown.Menu>
									</Dropdown>
								</div>
								<div className="card-body">
									<div className="form-wrapper">
										<div className="form-group">
											<div className="input-group input-group-lg">
												<div className="input-group-prepend">
													<span className="input-group-text">Amount BTC</span>
												</div>
												<input type="number" className="form-control" placeholder="742.2" />
											</div>
										</div>
									</div>
									<div className="d-flex mb-3 justify-content-between align-items-center">
										<h4 className="text-black fs-20 mb-0">Recent Contacts</h4>
										<Link to={"#"} className="btn-link">View more</Link>
									</div>
									<div className="testimonial-one px-4 owl-right-nav owl-carousel owl-loaded owl-drag">
										<ContactSlider />
									</div>
									<div className="row pt-5 align-items-center">
										<div className="col-sm-6 mb-2">
											<p className="mb-0 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
										</div>
										<div className="col-sm-6 mb-2">
											<Link to={"#"} className="btn btn-secondary d-block">TRANSFER NOW</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
		</Fragment>
	)
}		
export default Wallet;