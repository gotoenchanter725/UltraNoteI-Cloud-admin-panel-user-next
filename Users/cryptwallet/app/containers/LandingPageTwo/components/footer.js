import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

// images 
import logo from 'images/logo.svg';

const importantLink = [
    { menu: 'Home', link: '#' },
    { menu: 'Feature', link: '#' },
    { menu: 'Integrations', link: '#' },
    { menu: 'About', link: '#' },
];
const awesomeFeature = [
    { menu: 'Security', link: '#' },
    { menu: 'Customization', link: '#' },
    { menu: 'Support', link: '#' },
    { menu: 'Integrations', link: '#' },
];
const socialLink = [
    { menu: 'Facebook', link: '#' },
    { menu: 'Dribbble', link: '#' },
    { menu: 'Behance', link: '#' },
    { menu: 'LinkedIn', link: '#' },
];

class LandingPageFooter extends Component {
    render() {
        return (
            <footer className="footerArea">
                <Grid className="container" spacing={32} container>
                    <Grid item md={4} xs={12}>
                        <Grid className="footerLogo">
                            <img src={logo} alt="footer logo" />
                            <p> Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been text ever since. </p>
                        </Grid>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={32}>
                            <Grid item sm={4}>
                                <Grid className="footerMenu">
                                    <h3>Important Link</h3>
                                    <ul>
                                        {importantLink.map((footer, i) => (
                                            <li key={i}>
                                                <a href={footer.link}>{footer.menu}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item sm={4}>
                                <Grid className="footerMenu">
                                    <h3>Awesome Feature</h3>
                                    <ul>
                                        {awesomeFeature.map((footer, i) => (
                                            <li key={i}>
                                                <a href={footer.link}>{footer.menu}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item sm={4}>
                                <Grid className="footerMenu">
                                    <h3>Social Link</h3>
                                    <ul>
                                        {socialLink.map((footer, i) => (
                                            <li key={i}>
                                                <a href={footer.link}>{footer.menu}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid className="footerBottom">
                            <p> 2019 | All Right Reserved By<span>Cryptwallet</span></p>
                        </Grid>
                    </Grid>
                </Grid>
            </footer>
        )
    }
}
export default LandingPageFooter