import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'

// images 
import about from 'images/landing/about.png'

const LandingPageAbout = () => {
    return (
        <Grid className="landingPageAboutArea" id="about">
            <Grid
                container
                alignItems="center"
                spacing={32}
                className="container">
                <Grid item lg={3} xs={12}></Grid>
                <Grid item lg={6} xs={12}>
                    <Grid className="landingSectionTitle">
                        <h2>Know About Us</h2>
                        <p>ICO seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.</p>
                    </Grid>
                </Grid>
                <Grid item lg={7} md={7} xs={12}>
                    <Grid className="aboutImg">
                        <img src={about} alt="" />
                    </Grid>
                </Grid>
                <Grid item md={5} xs={12}>
                    <div className="abt-content">
                        <h2>Great Blockchain Business Solutions For Blockchain Business</h2>
                        <p>Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea  to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the.</p>
                        <p>car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming.</p>
                        <Button className="solidBtn">Know About Ourself</Button>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default LandingPageAbout