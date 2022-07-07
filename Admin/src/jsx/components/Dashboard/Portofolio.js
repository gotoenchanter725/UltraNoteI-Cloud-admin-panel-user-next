import React from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import WalletTab from "../zenix/MyWallets/WalletTab";
import profile from './../../../images/profile/port.jpg';

const CurrentBarGraph = loadable(() =>
  pMinDelay(import("../zenix/Portofolio/CurrentBarGraph"), 1000)
);
const PieChart = loadable(() =>
  pMinDelay(import("../zenix/Portofolio/PieChart"), 1000)
);
const Portofolio = () =>{
	return(
		<>
			<div className="form-head mb-5">
				<h2 className="font-w600 mb-0">Portofolio</h2>
			</div>
			<div className="row">
				<div className="col-xl-9 col-xxl-8">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h4 className="mb-0 fs-20 text-black">Coin Holding</h4>
									<Dropdown className="custom-dropdown mb-0 tbl-orders-style">
										<Dropdown.Toggle variant="" className="i-false btn sharp tp-btn" data-toggle="dropdown">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
											<Link to={"#"} className="dropdown-item" >Details</Link>
											<Link to={"#"} className="dropdown-item text-danger" >Cancel</Link>
										</Dropdown.Menu>
									 </Dropdown>
								</div>
								<div className="card-body">
									<div className="bg-success coin-holding flex-wrap">
										<div className="mb-2 coin-bx">
											<div className="d-flex align-items-center">
												<div>
													<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M30.5437 0.00501883C13.9681 -0.294993 0.305031 12.893 0.00501883 29.4562C-0.294993 46.0194 12.893 59.6949 29.4562 59.9949C46.0194 60.2949 59.6949 47.1069 59.9949 30.5312C60.2949 13.9681 47.1069 0.29253 30.5437 0.00501883ZM29.5562 54.3697C16.1182 54.1197 5.38023 42.9942 5.63024 29.5562C5.86775 16.1182 16.9932 5.38023 30.4312 5.61774C43.8818 5.86775 54.6072 16.9932 54.3697 30.4312C54.1322 43.8693 42.9942 54.6072 29.5562 54.3697Z" fill="white"/>
														<path d="M30.3962 8.12284C18.3333 7.91034 8.34535 17.5482 8.13284 29.6112C7.90784 41.6617 17.5457 51.6496 29.6087 51.8746C41.6717 52.0871 51.6596 42.4492 51.8721 30.3987C52.0846 18.3358 42.4592 8.34785 30.3962 8.12284ZM30.0025 14.3581L36.954 26.7598L30.61 23.2297C30.2312 23.0197 29.7725 23.0197 29.3937 23.2297L23.0497 26.7598L30.0025 14.3581ZM30.0025 45.6381L23.0497 33.2364L29.3937 36.7665C29.5825 36.8715 29.7925 36.924 30.0012 36.924C30.21 36.924 30.42 36.8715 30.6087 36.7665L36.9528 33.2364L30.0025 45.6381ZM30.0025 34.2426L22.3722 29.9975L30.0025 25.7523L37.6315 29.9975L30.0025 34.2426Z" fill="white"/>
													</svg>
												</div>
												<div className="ml-3">
													<h4 className="coin-font font-w600 mb-0 text-white">Ethereum</h4>
													<p className="mb-0 text-white op-6">ETH</p>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<div className="coin-bx-one">
													<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="4.71425" height="34.5712" rx="2.35713" transform="matrix(-1 0 0 1 33 0)" fill="white"/>
														<rect width="4.71425" height="25.1427" rx="2.35713" transform="matrix(-1 0 0 1 23.5713 9.42853)" fill="white"/>
														<rect width="4.71425" height="10.9999" rx="2.35713" transform="matrix(-1 0 0 1 14.1436 23.5713)" fill="white"/>
														<rect width="5.31864" height="21.2746" rx="2.65932" transform="matrix(-1 0 0 1 5.31836 13.2966)" fill="white"/>
													</svg>
												</div>	
												<div className="ml-3">
													<h2 className="mb-0 text-white coin-font-1">$667,224</h2>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#2BC155" stroke-width="2" stroke-linecap="round"/>
												</svg>
												<p className="mb-0 ml-2 text-success">45%</p>
												<p className="mb-0 ml-2 font-w400 text-white">This Week</p>	
											</div>
										</div>
									</div>
									<div className="bg-secondary coin-holding mt-4 flex-wrap">
										<div className="mb-2 coin-bx">
											<div className="d-flex align-items-center">
												<div>
													<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M30.5437 0.00501883C13.9681 -0.294993 0.305031 12.893 0.00501883 29.4562C-0.294993 46.0194 12.893 59.6949 29.4562 59.9949C46.0194 60.2949 59.6949 47.1069 59.9949 30.5312C60.2949 13.9681 47.1069 0.29253 30.5437 0.00501883ZM29.5562 54.3697C16.1182 54.1197 5.38023 42.9942 5.63024 29.5562C5.86775 16.1182 16.9932 5.38023 30.4312 5.61774C43.8818 5.86775 54.6072 16.9932 54.3697 30.4312C54.1322 43.8693 42.9942 54.6072 29.5562 54.3697Z" fill="white"/>
														<path d="M30.3962 8.12284C18.3333 7.91034 8.34535 17.5482 8.13284 29.6112C7.90784 41.6617 17.5457 51.6496 29.6087 51.8746C41.6717 52.0871 51.6596 42.4492 51.8721 30.3987C52.0846 18.3358 42.4592 8.34785 30.3962 8.12284ZM39.4091 42.6992H19.5083L21.9459 29.2112L19.1208 29.7987V27.4986L22.3709 26.8111L24.4835 15.2106H32.4213L30.6212 25.086L33.3964 24.4985V26.7986L30.1962 27.4611L28.3462 37.6615H40.8842L39.4091 42.6992Z" fill="white"/>
													</svg>
												</div>
												<div className="ml-3">
													<h4 className="coin-font font-w600 mb-0 text-white">LiteCoin</h4>
													<p className="mb-0 text-white">LTC</p>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<div className="coin-bx-one">
													<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="4.71425" height="34.5712" rx="2.35713" transform="matrix(-1 0 0 1 33 0)" fill="white"/>
														<rect width="4.71425" height="25.1427" rx="2.35713" transform="matrix(-1 0 0 1 23.5713 9.42853)" fill="white"/>
														<rect width="4.71425" height="10.9999" rx="2.35713" transform="matrix(-1 0 0 1 14.1436 23.5713)" fill="white"/>
														<rect width="5.31864" height="21.2746" rx="2.65932" transform="matrix(-1 0 0 1 5.31836 13.2966)" fill="white"/>
													</svg>
												</div>	
												<div className="ml-3">
													<h2 className="mb-0 text-white coin-font-1">$168,331.09</h2>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
													<g filter="url(#filter0_d)">
													<path d="M5 4C5.91797 5.08433 8.89728 8.27228 10.5 10L16.5 7L23.5 16" stroke="#FF2E2E" stroke-width="2" stroke-linecap="round"/>
													</g>
													<defs>
													<filter id="filter0_d" x="0" y="0" width="28.5001" height="22.0001" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
													<feFlood flood-opacity="0" result="BackgroundImageFix"/>
													<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
													<feOffset dy="1"/>
													<feGaussianBlur stdDeviation="2"/>
													<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.61 0"/>
													<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
													<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
													</filter>
													</defs>
												</svg>

												<p className="mb-0 ml-2 text-danger">45%</p>
												<p className="mb-0 ml-2 font-w400 text-white">This Week</p>	
											</div>
										</div>
									</div>
									<div className="bg-warning coin-holding mt-4 flex-wrap">
										<div className="mb-2 coin-bx">
											<div className="d-flex align-items-center">
												<div>
													<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M30 0C13.4312 0 0 13.4312 0 30C0 46.5688 13.4312 60 30 60C46.5688 60 60 46.5688 60 30C60 13.4312 46.5688 0 30 0ZM30 54.375C16.5587 54.375 5.625 43.44 5.625 30C5.625 16.56 16.5587 5.625 30 5.625C43.4413 5.625 54.375 16.5587 54.375 30C54.375 43.4413 43.44 54.375 30 54.375Z" fill="white"/>
														<path d="M31.5488 30.9737H27.61V36.825H31.5488C32.3438 36.825 33.0813 36.5025 33.5988 35.9612C34.14 35.4425 34.4625 34.7062 34.4625 33.8875C34.4638 32.2862 33.15 30.9737 31.5488 30.9737Z" fill="white"/>
														<path d="M30 8.12496C17.9375 8.12496 8.125 17.9375 8.125 30C8.125 42.0625 17.9375 51.875 30 51.875C42.0625 51.875 51.875 42.0612 51.875 30C51.875 17.9387 42.0612 8.12496 30 8.12496ZM34.4512 40.13H31.8712V44.185H29.165V40.13H27.6787V44.185H24.96V40.13H20.18V37.585H22.8175V22.335H20.18V19.79H24.96V15.8162H27.6787V19.79H29.165V15.8162H31.8712V19.79H34.2212C35.5337 19.79 36.7437 20.3312 37.6075 21.195C38.4712 22.0587 39.0125 23.2687 39.0125 24.5812C39.0125 27.15 36.985 29.2462 34.4512 29.3612C37.4225 29.3612 39.8187 31.78 39.8187 34.7512C39.8187 37.7112 37.4237 40.13 34.4512 40.13Z" fill="white"/>
														<path d="M33.2888 27.38C33.7613 26.9075 34.0488 26.2737 34.0488 25.56C34.0488 24.1437 32.8975 22.9912 31.48 22.9912H27.61V28.14H31.48C32.1825 28.14 32.8275 27.84 33.2888 27.38Z" fill="white"/>
													</svg>
												</div>
												<div className="ml-3">
													<h4 className="coin-font font-w600 mb-0 text-white">BitCoin</h4>
													<p className="mb-0 text-white">BTH</p>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<div className="coin-bx-one">
													<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="4.71425" height="34.5712" rx="2.35713" transform="matrix(-1 0 0 1 33 0)" fill="white"/>
														<rect width="4.71425" height="25.1427" rx="2.35713" transform="matrix(-1 0 0 1 23.5713 9.42853)" fill="white"/>
														<rect width="4.71425" height="10.9999" rx="2.35713" transform="matrix(-1 0 0 1 14.1436 23.5713)" fill="white"/>
														<rect width="5.31864" height="21.2746" rx="2.65932" transform="matrix(-1 0 0 1 5.31836 13.2966)" fill="white"/>
													</svg>
												</div>	
												<div className="ml-3">
													<h2 className="mb-0 text-white coin-font-1">$667,224</h2>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#2BC155" stroke-width="2" stroke-linecap="round"/>
												</svg>
												<p className="mb-0 ml-2 text-success">45%</p>
												<p className="mb-0 ml-2 font-w400 text-white">This Week</p>	
											</div>
										</div>
									</div>
									<div className="bg-primary coin-holding mt-4 flex-wrap">
										<div className="mb-2 coin-bx">
											<div className="d-flex align-items-center">
												<div>
													<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M30.5438 0.00501884C13.9681 -0.294993 0.305031 12.893 0.00501884 29.4562C-0.294993 46.0194 12.893 59.695 29.4562 59.995C46.0194 60.295 59.695 47.107 59.995 30.5313C60.295 13.9681 47.107 0.292531 30.5438 0.00501884ZM29.5562 54.3698C16.1182 54.1197 5.38024 42.9943 5.63025 29.5562C5.86776 16.1182 16.9932 5.38024 30.4313 5.61775C43.8818 5.86776 54.6073 16.9932 54.3698 30.4313C54.1322 43.8693 42.9943 54.6073 29.5562 54.3698Z" fill="white"/>
														<path d="M30.3938 8.11785C18.3308 7.90534 8.34286 17.5432 8.13035 29.6062C8.0591 33.4014 8.97039 36.9903 10.623 40.1354H17.4995V18.602C17.4995 17.2857 19.2883 16.867 19.8696 18.0483L30 38.5629L40.1304 18.0495C40.7117 16.867 42.5005 17.2857 42.5005 18.602V40.1354H49.3558C50.8934 37.2128 51.8084 33.9127 51.8696 30.3938C52.0822 18.3308 42.4568 8.34286 30.3938 8.11785Z" fill="white"/>
														<path d="M40.0004 41.3855V23.9573L31.12 41.9392C30.7 42.793 29.2987 42.793 28.8787 41.9392L19.9996 23.9573V41.3855C19.9996 42.0755 19.4408 42.6355 18.7495 42.6355H12.1855C16.0744 48.0995 22.3972 51.7346 29.6062 51.8696C37.1028 52.0022 43.7931 48.327 47.8395 42.6355H41.2505C40.5592 42.6355 40.0004 42.0755 40.0004 41.3855Z" fill="white"/>
													</svg>
												</div>
												<div className="ml-3">
													<h4 className="coin-font font-w600 mb-0 text-white">Monero</h4>
													<p className="mb-0 text-white">XMR</p>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<div className="coin-bx-one">
													<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="4.71425" height="34.5712" rx="2.35713" transform="matrix(-1 0 0 1 33 0)" fill="white"/>
														<rect width="4.71425" height="25.1427" rx="2.35713" transform="matrix(-1 0 0 1 23.5713 9.42853)" fill="white"/>
														<rect width="4.71425" height="10.9999" rx="2.35713" transform="matrix(-1 0 0 1 14.1436 23.5713)" fill="white"/>
														<rect width="5.31864" height="21.2746" rx="2.65932" transform="matrix(-1 0 0 1 5.31836 13.2966)" fill="white"/>
													</svg>
												</div>	
												<div className="ml-3">
													<h2 className="mb-0 text-white coin-font-1">$24,098</h2>
												</div>
											</div>
										</div>
										<div className="mb-2">
											<div className="d-flex align-items-center">
												<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 13C1.91797 11.9157 4.89728 8.72772 6.5 7L12.5 10L19.5 1" stroke="#2BC155" stroke-width="2" stroke-linecap="round"/>
												</svg>
												<p className="mb-0 ml-2 text-success">45%</p>
												<p className="mb-0 ml-2 font-w400 text-white">This Week</p>	
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-8 col-xxl-12">
							<WalletTab  activeMenu ="My Activity" />
						</div>
						<div className="col-xl-4 col-xxl-12">
							<div className="row">
								<div className="col-xl-12 m-t25">
									<div className="card">
										<div className="card-header border-0">
											<h4 className="mb-0 fs-20">Current Graph</h4>
											<Dropdown className="custom-dropdown mb-0 tbl-orders-style">
												<Dropdown.Toggle variant="" className="i-false btn sharp tp-btn" data-toggle="dropdown">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
														<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
														<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
													</svg>
												</Dropdown.Toggle>
												<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
													<Link to={"#"} className="dropdown-item" >Details</Link>
													<Link to={"#"} className="dropdown-item text-danger" >Cancel</Link>
												</Dropdown.Menu>
											 </Dropdown>
										</div>
										<div className="card-body pb-0">
											<div id="CurrentGraph">
												<CurrentBarGraph />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="col-xl-3 col-xxl-4">
					<div className="row">
						<div className="col-xl-12 col-lg-6 col-sm-6">
							<div className="card">
								<div className="card-header border-0">
									<h4 className="mb-0 text-black fs-20">My Profile</h4>
									<Dropdown className="custom-dropdown mb-0 tbl-orders-style">
										<Dropdown.Toggle variant="" className="i-false btn sharp tp-btn" data-toggle="dropdown">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
											<Link to={"#"} className="dropdown-item" >Details</Link>
											<Link to={"#"} className="dropdown-item text-danger" >Cancel</Link>
										</Dropdown.Menu>
									 </Dropdown>
								</div>
								<div className="card-body">
									<div className="text-center">
										<div className="my-profile">
											<img src={profile} alt="" className="rounded" />
											<Link to={"#"}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
										</div>
										<h4 className="mt-3 font-w600 text-black mb-0 name-text">Marquezz Silalahi</h4>
										<span>@thomasdox</span>
										<p className="mb-0 mt-2">Join on 24 March 2017</p>
									</div>
									<ul className="portofolio-social">
										<li><Link to={"#"}><i className="fa fa-phone"></i></Link></li>
										<li><Link to={"#"}><i className="fa fa-envelope-o"></i></Link></li>
										<li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
									</ul>
								</div>
							</div>
						</div>	
						<div className="col-xl-12 col-lg-6 col-sm-6">
							<div className="card">
								<div className="card-header border-0">
									<h4 className="mb-0 text-black fs-20">Current Graph</h4>
									<Dropdown className="custom-dropdown mb-0 tbl-orders-style">
										<Dropdown.Toggle variant="" className="i-false btn sharp tp-btn" data-toggle="dropdown">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
												<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight={true}>
											<Link to={"#"} className="dropdown-item" >Details</Link>
											<Link to={"#"} className="dropdown-item text-danger" >Cancel</Link>
										</Dropdown.Menu>
									 </Dropdown>
								</div>
								<div className="card-body text-center">
									<div id="pieChart" className="d-inline-block">
										<PieChart />
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-left fs-13 mt-4">
												<span className="mb-3 col-6">
													<svg className="mr-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#00ADA3"/>
													</svg>
													Ethereum
												</span>
												<span className="mb-3 col-6">
													<svg className="mr-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#374B96"/>
													</svg>
													Litecoin
												</span>
												<span className="mb-3 col-6">
													<svg className="mr-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#FF782C"/>
													</svg>
													Monero
												</span>
												<span className="mb-3 col-6">
													<svg className="mr-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#F7A62C"/>
													</svg>
													Bitcoin
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>	
					</div>	
				</div>
			</div>
		</>
	)
}
export default Portofolio;