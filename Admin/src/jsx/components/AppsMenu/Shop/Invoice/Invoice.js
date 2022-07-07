import React, { Fragment } from "react";

// images
import qrcode from "../../../../../images/qr.png";
import logo from "../../../../../images/logo.png";
import logoText from "../../../../..//images/logo-text.png";
import { Link } from "react-router-dom";
import PageTitle from "../../../../layouts/PageTitle";

const Invoice = () => {
  return (
    <Fragment>
      <PageTitle activeMenu="Blank" motherMenu="Layout" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              {" "}
              Invoice <strong>01/01/01/2018</strong>{" "}
              <span className="float-right">
                <strong>Status:</strong> Pending
              </span>{" "}
            </div>
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <h6>From:</h6>
                  <div>
                    {" "}
                    <strong>Webz Poland</strong>{" "}
                  </div>
                  <div>Madalinskiego 8</div>
                  <div>71-101 Szczecin, Poland</div>
                  <div>Email: info@webz.com.pl</div>
                  <div>Phone: +48 444 666 3333</div>
                </div>
                <div className="mt-4 col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <h6>To:</h6>
                  <div>
                    {" "}
                    <strong>Bob Mart</strong>{" "}
                  </div>
                  <div>Attn: Daniel Marek</div>
                  <div>43-190 Mikolow, Poland</div>
                  <div>Email: marek@daniel.com</div>
                  <div>Phone: +48 123 456 789</div>
                </div>
                <div className="mt-4 col-xl-6 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                  <div className="row align-items-center">
                    <div className="col-sm-9">
                      <div className="brand-logo mb-3">
                        <img className="logo-abbr mr-3" src={logo} alt="" style={{width:'50px'}}  />
                        <svg className="" width="110" height="35" viewBox="0 0 74 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path className="svg-logo-path"  d="M0.784 17.556L10.92 5.152H1.176V1.12H16.436V4.564L6.776 16.968H16.548V21H0.784V17.556ZM25.7399 21.28C24.0785 21.28 22.6599 20.9347 21.4839 20.244C20.3079 19.5533 19.4025 18.6387 18.7679 17.5C18.1519 16.3613 17.8439 15.1293 17.8439 13.804C17.8439 12.3853 18.1519 11.088 18.7679 9.912C19.3839 8.736 20.2799 7.79333 21.4559 7.084C22.6319 6.37467 24.0599 6.02 25.7399 6.02C27.4012 6.02 28.8199 6.37467 29.9959 7.084C31.1719 7.79333 32.0585 8.72667 32.6559 9.884C33.2719 11.0413 33.5799 12.2827 33.5799 13.608C33.5799 14.1493 33.5425 14.6253 33.4679 15.036H22.6039C22.6785 16.0253 23.0332 16.7813 23.6679 17.304C24.3212 17.808 25.0585 18.06 25.8799 18.06C26.5332 18.06 27.1585 17.9013 27.7559 17.584C28.3532 17.2667 28.7639 16.8373 28.9879 16.296L32.7959 17.36C32.2172 18.5173 31.3119 19.46 30.0799 20.188C28.8665 20.916 27.4199 21.28 25.7399 21.28ZM22.4919 12.292H28.8759C28.7825 11.3587 28.4372 10.6213 27.8399 10.08C27.2612 9.52 26.5425 9.24 25.6839 9.24C24.8252 9.24 24.0972 9.52 23.4999 10.08C22.9212 10.64 22.5852 11.3773 22.4919 12.292ZM49.7783 21H45.2983V12.74C45.2983 11.7693 45.1116 11.0693 44.7383 10.64C44.3836 10.192 43.9076 9.968 43.3103 9.968C42.6943 9.968 42.069 10.2107 41.4343 10.696C40.7996 11.1813 40.3516 11.8067 40.0903 12.572V21H35.6103V6.3H39.6423V8.764C40.1836 7.90533 40.949 7.23333 41.9383 6.748C42.9276 6.26267 44.0663 6.02 45.3543 6.02C46.3063 6.02 47.0716 6.19733 47.6503 6.552C48.2476 6.888 48.6956 7.336 48.9943 7.896C49.3116 8.43733 49.517 9.03467 49.6103 9.688C49.7223 10.3413 49.7783 10.976 49.7783 11.592V21ZM52.7548 4.62V0.559999H57.2348V4.62H52.7548ZM52.7548 21V6.3H57.2348V21H52.7548ZM63.4657 6.3L66.0697 10.444L66.3497 10.976L66.6297 10.444L69.2337 6.3H73.8537L68.9257 13.608L73.9657 21H69.3457L66.6017 16.884L66.3497 16.352L66.0977 16.884L63.3537 21H58.7337L63.7737 13.692L58.8457 6.3H63.4657Z" fill="black"/>
						</svg>
                      </div>
                      <span>
                        Please send exact amount:{" "}
                        <strong className="d-block">0.15050000 BTC</strong>
                        <strong>1DonateWffyhwAjskoEwXt83pHZxhLTr8H</strong>
                      </span>
                      <br />
                      <small className="text-muted">
                        Current exchange rate 1BTC = $6590 USD
                      </small>
                    </div>
                    <div className="col-sm-3 mt-3">
                      {" "}
                      <img
                        src={qrcode}
                        className="img-fluid width110"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">#</th>
                      <th>Item</th>
                      <th>Description</th>
                      <th className="right">Unit Cost</th>
                      <th className="center">Qty</th>
                      <th className="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="center">1</td>
                      <td className="left strong">Origin License</td>
                      <td className="left">Extended License</td>
                      <td className="right">$999,00</td>
                      <td className="center">1</td>
                      <td className="right">$999,00</td>
                    </tr>
                    <tr>
                      <td className="center">2</td>
                      <td className="left">Custom Services</td>
                      <td className="left">
                        Instalation and Customization (cost per hour)
                      </td>
                      <td className="right">$150,00</td>
                      <td className="center">20</td>
                      <td className="right">$3.000,00</td>
                    </tr>
                    <tr>
                      <td className="center">3</td>
                      <td className="left">Hosting</td>
                      <td className="left">1 year subcription</td>
                      <td className="right">$499,00</td>
                      <td className="center">1</td>
                      <td className="right">$499,00</td>
                    </tr>
                    <tr>
                      <td className="center">4</td>
                      <td className="left">Platinum Support</td>
                      <td className="left">1 year subcription 24/7</td>
                      <td className="right">$3.999,00</td>
                      <td className="center">1</td>
                      <td className="right">$3.999,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ml-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Subtotal</strong>
                        </td>
                        <td className="right">$8.497,00</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Discount (20%)</strong>
                        </td>
                        <td className="right">$1,699,40</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>VAT (10%)</strong>
                        </td>
                        <td className="right">$679,76</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">
                          <strong>$7.477,36</strong>
                          <br />
                          <strong>0.15050000 BTC</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Invoice;
