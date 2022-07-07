import React , { useState } from "react";
import { Link , withRouter   } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { connect } from 'react-redux';
import {SetEmailfortwofa} from '../../redux/user/user.actions'; 
import './allresponsivestyle/pages.styles.css';
// image

import logo from "../../images/Ultralogo/logo150.png";

const GoogleAuthEmail = ({ history  , SetEmailfortwofa, portalURL }) => {
  
  const submitHandler = (e) => {
   
    console.log('Clicking',inputValues);
    e.preventDefault();

    axios.post(`${portalURL}api/admin/googleauthapp`,{
      email: inputValues.email,
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      if(res.data.message == "Email is not exist" ){
      setInputValues({ ...inputValues,error: "Your Account Email is not Exist"})    

      } else if (res.data.message == "Your 2FA Authentication Failed") {
      setInputValues({ ...inputValues,error: "Your 2FA Authentication Deactive "})
      } 
      else {
      SetEmailfortwofa(inputValues.email);
      history.push('/googleverifycode')
      }
      
      
 
    }).catch( err => {
    console.log('err=>',err);
    })

  };
  const [inputValues, setInputValues] = useState({
    email: '',capcha:false
  });
  
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const onCapchaChange = event => {
  setInputValues({ ...inputValues,capcha:true})
  }

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <div to="/">
                        <img src={logo} alt="" />
                      </div>
                    </div>
                  
                    <h4 className="text-center mb-4 ">Sign in your account</h4>
                    {inputValues.error != null && <p style={{margin:"0px  80px",color:"#ffffff"}}>{inputValues.error}</p> }
                    <form onSubmit={(e) => submitHandler(e)}>
                      <div className="form-group">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleOnChange}
                        />
                      </div>
                      <div className="form-group">
                      <ReCAPTCHA className="chapcha-position"
                      sitekey="6LfN0jQUAAAAACcSczpthe_DmTth_FYpfV3jhEzr"
                       onChange={onCapchaChange} 
                      />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={!inputValues.capcha}
                        >
                         Enter Your Email
                        </button>
                      </div>

                    </form>
     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

const mapDispatchToProps = dispatch => ({
SetEmailfortwofa: emailaddress => dispatch(SetEmailfortwofa(emailaddress))
});

export default connect(null, mapDispatchToProps)(withRouter(GoogleAuthEmail));
