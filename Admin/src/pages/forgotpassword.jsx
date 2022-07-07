import React from 'react';
import ForgotPassword from '../jsx/pages/ForgotPassword';

const ForgotPasswordPage = (props) => (
<div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >
<ForgotPassword {...props}/>
</div>
);

export default ForgotPasswordPage;