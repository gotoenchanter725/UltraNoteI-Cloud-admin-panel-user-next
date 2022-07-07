import React , {useState} from "react";
import { Link } from "react-router-dom";
// image
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import axios from 'axios';
import logo from "../../images/Ultralogo/logo150.png";
import './allresponsivestyle/pages.styles.css';
const ForgotPassword = ({portalURL}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (e) => {
   
    console.log('Clicking',inputValues);
  
    axios.post(`${portalURL}api/admin/forgotpassword`,{
      email: e.email,
    
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      if (res.data.message === "Email Has Been Send"){
      
      console.log("Email send");
      setInputValues({ ...inputValues,error: "Email Has Been Send"})
      }  else {
        console.log("Email Failed");
        setInputValues({ ...inputValues,error: "Email Has Been Send Error"})
      }


    });
  };

  const [inputValues, setInputValues] = useState({
  email: '',capcha:false
  });
  
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(inputValues);
  };
  const onCapchaChange = event => {
    setInputValues({ ...inputValues,capcha:true})
    }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {inputValues.error != null && <p style={{margin:"0px  130px",color:"#ffffff"}}>{inputValues.error}</p> }  
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={handleOnChange}
                          {...register('email', { required: true })} 

                        />
                        {errors.email && errors.email.type === "required" && <span>Email is required</span>}
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
                          SUBMIT
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


export default ForgotPassword;
