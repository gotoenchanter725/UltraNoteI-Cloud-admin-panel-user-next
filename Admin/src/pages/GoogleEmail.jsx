import React from 'react';
import GoogleAuthEmail from '../jsx/pages/GoogleauthEmail';

const GoogleAuthEmailPage = (props) => (
<div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >
<GoogleAuthEmail {...props}/>
</div>
);

export default GoogleAuthEmailPage;