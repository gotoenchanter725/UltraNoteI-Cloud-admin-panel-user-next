import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'


const LandingPageCoinStart = () => {
    return (
        <Grid className="landingPageCoinStartArea">
            <Grid container alignItems="center" spacing={32} className="container">
                <Grid item lg={1} xs={12}></Grid>
                <Grid item lg={5} sm={6} xs={12}>
                    <div className="coin-start coin-s2">
                        <div className="coin-start-inner">
                            <h2>ICO Coin Start</h2>
                            <h5>Discount 70% From The Final Price</h5>
                            <div className="countdown">

                            </div>
                            <div className="goal-area">
                                <h2>Goal
                                    <span>983450.0 BTC</span>
                                </h2>
                                <div className="progress_area">
                                    <div className="progress_bar page_loaded" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                            <div className="coin-collection">
                                <div className="cc-single">
                                    <h3>BTC Collected</h3>
                                    <h2>56789.066</h2>
                                </div>
                                <div className="cc-single">
                                    <h3>ETC Collected</h3>
                                    <h2>233855.957</h2>
                                </div>
                                <div className="cc-single">
                                    <h3>LTC Collected</h3>
                                    <h2>945373.946</h2>
                                </div>
                            </div>
                            <Button>Buy Token</Button>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={5} sm={6} xs={12}>
                    <div className="coin-s2-right">
                        <div className="coin-start coin-s2 mb--30">
                            <div className="coin-start-inner">
                                <h2>Tier 1</h2>
                                <h2 className="amnt-token">$0.70/Token</h2>
                                <p>15450/17000 Token Are Remaining</p>
                                <Button>Buy Token</Button>

                            </div>
                        </div>
                        <div className="coin-start coin-s2">
                            <div className="coin-start-inner">
                                <h2>Tier 1</h2>
                                <h2 className="amnt-token">$0.70/Token</h2>
                                <p>15450/17000 Token Are Remaining</p>
                                <Button>Buy Token</Button>

                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default LandingPageCoinStart