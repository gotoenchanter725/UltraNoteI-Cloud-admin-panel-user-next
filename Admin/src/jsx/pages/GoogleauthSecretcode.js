import React , { useState } from "react";
import { Link , withRouter } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { selectTwoFaEmail } from '../../redux/user/user.selectors';
import logo from "../../images/Ultralogo/logo150.png";
import { createStructuredSelector } from 'reselect';
import ReCAPTCHA from "react-google-recaptcha";
import {setCurrentUser} from '../../redux/user/user.actions'; 
const GoogleSecretCode = (props) => {
  const { setCurrentUser , history , useremail } = props;
  const submitHandler = (e) => {
    console.log(props);
  //  const {setCurrentUser} = props;
    console.log('Clicking',inputValues);
    e.preventDefault();
    axios.post(`${props.portalURL}api/admin/googleauthtokenverify`,{
      email: useremail,
      serect_code:inputValues.secretcode
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    if(res.data.message === "Auth successful" ){
     console.log('Token',res.data.token);
      setCurrentUser({token:res.data.token}); 
     history.push("/dashboard");
    } else {
      setInputValues({ ...inputValues,error: "Your 2FA Authentication Code Incorrect "})
    }
     
     
    }).catch( err => {
    console.log('err=>',err);
    })

  };
  const [inputValues, setInputValues] = useState({
    email: '', secretcode:'',capcha:false
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
                    <h4 className="text-center mb-4 ">Enter Your Google Authenticator Secret Code</h4>
                    {inputValues.error != null && <p style={{margin:"0px  60px",color:"#ffffff"}}>{inputValues.error}</p> }
                    <form onSubmit={(e) => submitHandler(e)}>
                    <div className="form-group">
                        <label className="mb-1 ">
                          <strong>Secret Code</strong>
                        </label>
                        <input
                          type="password"
                          name="secretcode"
                          className="form-control"
                          onChange={handleOnChange}
                        />
                      </div>
                      <div className="form-group">
                      <ReCAPTCHA style={{padding: "0px 60px"}}
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
                         Enter Your Secret Code
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
const mapStateToProps = createStructuredSelector({
  useremail:selectTwoFaEmail
  });

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GoogleSecretCode));
