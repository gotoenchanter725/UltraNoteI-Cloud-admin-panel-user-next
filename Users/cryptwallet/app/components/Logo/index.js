import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Image from '../uiStyle/Images';

const Logo = ({ logo, alt, link, className = '' }) => (
  <Grid className={`logoWrap ${className}`}>
    <NavLink to={link}>
      <img src={logo} alt={alt} style={{width:"80px"}} />
    </NavLink>
  </Grid>
);
export default Logo;
