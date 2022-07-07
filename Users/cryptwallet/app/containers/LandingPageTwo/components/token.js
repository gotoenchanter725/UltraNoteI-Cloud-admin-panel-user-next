import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'


import roadmap from 'images/landing/roadmap.png'


const roadmaps = [
    { color: "#CDDAF4", value: '28', text: 'Others Company' },
    { color: "#050448", value: '20', text: 'Crypto Reserved' },
    { color: "#FFCB33", value: '07', text: 'Pre-Sale Token Sold' },
    { color: "#45CC86", value: '65', text: 'Enterprise Partnership' },
    { color: "#F4F9FF", value: '35', text: 'Advisor Share' },
    { color: "#CCD9F4", value: '50', text: 'Total Promotion' },
]

const LandingPageToken = () => {
    return (
        <Grid className="landingPageTokenArea" id="token">
            <Grid
                container
                alignItems="center"
                spacing={32}
                className="container">
                <Grid item lg={3} xs={12}></Grid>
                <Grid item lg={6} xs={12}>
                    <Grid className="landingSectionTitle">
                        <h2>Token Distribution Goal</h2>
                        <p>ICO seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.</p>
                    </Grid>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Grid container spacing={32}>
                        {roadmaps.map((roadmap, i) => (
                            <Grid key={i} item sm={6} xs={12}>
                                <Grid className="tokenWrap">
                                    <Grid style={{ background: `${roadmap.color}` }} className="tokenIcon"></Grid>
                                    <Grid className="tokenContent">
                                        <h3>{`${roadmap.value}%`}</h3>
                                        <p>{roadmap.text}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Grid className="tokenImg">
                        <img src={roadmap} alt="" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default LandingPageToken