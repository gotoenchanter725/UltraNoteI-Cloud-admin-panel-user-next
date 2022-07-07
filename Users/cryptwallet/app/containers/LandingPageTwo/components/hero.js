import React, { useState, Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import ModalVideo from 'react-modal-video'
// images 
import hero from 'images/landing/hero.png'

class LandingPageHero extends Component {
    state = {
        video: false
    }
    modalVideoOpen = () => {
        this.setState({
            video: true
        })
    }
    modalVideoClose = () => {
        this.setState({
            video: false
        })
    }
    render() {
        return (
            <Grid className="landingPageHeroArea" id="home" >
                <Grid container alignItems="center" spacing={32} className="container">
                    <Grid item md={7}>
                        <Grid className="heroContent">
                            <h2>ICO Solution Page for Your Business</h2>
                            <p>Tempory incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudquat.</p>
                            <ul>
                                <li><Button>Sign Up</Button></li>
                                <li><Button>Whitepaper</Button></li>
                            </ul>
                            <Grid className="hrVideo">
                                <Button onClick={this.modalVideoOpen}><i className="fa fa-play"></i></Button>
                                <span className="text">Enjoy Our Video</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={5}>
                        <Grid className="heroRightThumb">
                            <img src={hero} alt="image" />
                        </Grid>
                    </Grid>
                </Grid>
                <ModalVideo
                    channel='youtube'
                    isOpen={this.state.video}
                    videoId="4Zu6MCrfUug"
                    onClose={this.modalVideoClose}
                />
            </Grid>
        )
    }

}
export default LandingPageHero