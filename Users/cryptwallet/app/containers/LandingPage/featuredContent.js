import React from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import Link from 'react-router-dom/es/Link';

const FeaturedContent = ({ button, title, text, link }) => (
  <Grid item md={5}>
    <Grid className="featuredContent">
      <Typography variant="h2">{title}</Typography>
      <Typography paragraph>{text}</Typography>
      <Link to={link}>{button}</Link>
    </Grid>
  </Grid>
);
export default FeaturedContent;
