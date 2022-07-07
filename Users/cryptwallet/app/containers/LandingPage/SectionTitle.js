import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const SectionTitle = ({ title, text }) => {
    return (
        <Grid className="sectionTitle">
            <Typography variant="h2">{title}</Typography>
            <Typography paragraph>{text}</Typography>
        </Grid>
    )
}
export default SectionTitle