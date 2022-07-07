import React from 'react';
import GoogleSecretCode from '../jsx/pages/GoogleauthSecretcode';

const GoogleAuthEnticatorSecretCodePage = (props) => (
<div className="container-fluid" style={{ minHeight: window.screen.height - 60 }} >
<GoogleSecretCode {...props}/>
</div>
);

export default GoogleAuthEnticatorSecretCodePage;