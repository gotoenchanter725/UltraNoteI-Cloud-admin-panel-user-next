import React , { useEffect , useState ,useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo-full.png";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import axios from 'axios';
const ResetPasswordPage = (props) => {
const [ message , setMessage ] = useState(null);
const { register, handleSubmit, watch, formState: { errors } } = useForm();

console.log(message);

const password = useRef({});
password.current = watch("password", "");
useEffect( () => {
    console.log('i fire once');
const fetchFunc = async () => {
 const response = await fetch(`${props.portalURL}api/admin/reset-password/${props.match.params.id}/${props.match.params.token}`)
 const rejson = await response.json();
 setMessage(rejson)
 }

fetchFunc();
},[]);



const onSubmit = (e) => {
console.log('aa',e);
axios.post(`${props.portalURL}api/admin/reset-password/${props.match.params.id}/${props.match.params.token}`,{
password: e.password,
conformpassword:e.conformpassword 
})
.then(res => {
console.log(res);
console.log(res.data);
if(res.data.message === "User Password changed" ) {
   props.history.push("/");
}
})
}

const submitHandler = (e) => {
 //   console.log('Clicking',inputValues);
    e.preventDefault();
    // axios.post(`http://localhost:5000/api/admin/login`,{
    //   email: inputValues.email,
    //   password:inputValues.password 
    // })
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
  //  })

  };



if(message == undefined) {
return (     
<div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >    
<div className="authincation h-100 p-meddle">
<div className="container h-100">
   {" "}
   <div className="row justify-content-center h-100 align-items-center">
      <div className="col-md-5">
         <div className="form-input-content text-center error-page">
            <h1 className="error-text font-weight-bold">400</h1>
            <h4>
               <i className="fa fa-thumbs-down text-danger" /> Bad
               Request
            </h4>
            <p>Your Request token is Invalid</p>
            <div>
               <Link className="btn btn-primary" to="/">
                  Back to Home
               </Link>
            </div>
         </div>
      </div>
   </div>
</div>
</div>
</div>
);   
}
else if (message.message === 'user verified' ) {
    return(   
        <div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >
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
                  <h4 className="text-center mb-4 ">Please Reset Your Password</h4>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="form-group">
                      <label className="mb-1 ">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        {...register("password",{
                        required: "You must specify a password",
                        minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                        } 
                       })}
                      />
                  {errors.password && <p >{errors.password.message}</p>}

                    </div>
                    <div className="form-group">
                      <label className="mb-1 ">
                        <strong>Reset Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        {...register("conformpassword",{
                           validate: value =>
                           value === password.current || "The passwords do not match"
                          })}
                      />
                       {errors.conformpassword && <p>{errors.conformpassword.message}</p>}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                       Reset Password
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
  </div>
  );
} else if(message.message === 'jwt expired') {
    // If user is logged out
    return(     
        <div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >    
        <div className="authincation h-100 p-meddle">
    <div className="container h-100">
       {" "}
       <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-5">
             <div className="form-input-content text-center error-page">
                <h1 className="error-text font-weight-bold">400</h1>
                <h4>
                   <i className="fa fa-thumbs-down text-danger" /> Bad
                   Request
                </h4>
                <p>Your Request token expired</p>
                <div>
                   <Link className="btn btn-primary" to="/">
                      Back to Home
                   </Link>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
 </div>
 );
}else{
    return(     
        <div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >    
        <div className="authincation h-100 p-meddle">
    <div className="container h-100">
       {" "}
       <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-5">
             <div className="form-input-content text-center error-page">
                <h1 className="error-text font-weight-bold">400</h1>
                <h4>
                   <i className="fa fa-thumbs-down text-danger" /> Bad
                   Request
                </h4>
                <p>Your Request token is not valid</p>
                <div>
                   <Link className="btn btn-primary" to="/">
                      Back to Home
                   </Link>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
 </div>
 );  
} 



}
export default withRouter(ResetPasswordPage);
