import React, { Component, Fragment } from 'react'
import { Grid, Button, Tab, Tabs } from '@material-ui/core'

// images 
import team1 from 'images/landing/team/team-img1.jpg'
import team2 from 'images/landing/team/team-img2.jpg'
import team3 from 'images/landing/team/team-img3.jpg'
import team4 from 'images/landing/team/team-img4.jpg'

const teams = [
    { image: team1, name: 'Andrew Markony', designation: 'Business Head' },
    { image: team2, name: 'Andrew Markony', designation: 'Frontend Developer' },
    { image: team3, name: 'Andrew Markony', designation: 'React Developer' },
    { image: team4, name: 'Andrew Markony', designation: 'Backend Developer' },
]
const teams2 = [
    { image: team1, name: 'Andrew Markony', designation: 'Business Head' },
    { image: team4, name: 'Andrew Markony', designation: 'Backend Developer' },
    { image: team3, name: 'Andrew Markony', designation: 'React Developer' },
    { image: team2, name: 'Andrew Markony', designation: 'Frontend Developer' },
]
const teams3 = [
    { image: team4, name: 'Andrew Markony', designation: 'Backend Developer' },
    { image: team2, name: 'Andrew Markony', designation: 'Frontend Developer' },
    { image: team1, name: 'Andrew Markony', designation: 'Business Head' },
    { image: team3, name: 'Andrew Markony', designation: 'React Developer' },
]

class LandingPageTeam extends Component {
    state = {
        tab: 0,
    };
    tabChangeHandler = (event, value) => {
        this.setState({ tab: value });
    };
    render() {
        const { tab } = this.state;
        return (
            <Grid className="landingPageTeamArea" id="team">
                <Grid
                    container
                    alignItems="center"
                    spacing={32}
                    className="container">
                    <Grid item lg={3} xs={12}></Grid>
                    <Grid item lg={6} xs={12}>
                        <Grid className="landingSectionTitle">
                            <h2>Our Awesome Team</h2>
                            <p>ICO seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.</p>
                        </Grid>
                    </Grid>
                    <Grid item lg={3} xs={12}></Grid>
                    <Grid item lg={2} xs={12}></Grid>
                    <Grid item lg={8} xs={12}>
                        <Tabs
                            value={tab}
                            onChange={this.tabChangeHandler}

                            classes={{
                                root: 'teamTabWrap',
                                indicator: 'noIndigator',
                                flexContainer: 'teamTabContainer',
                            }}>
                            <Tab label="Director" />
                            <Tab label="Advisor" />
                            <Tab label="Supervisor" />
                        </Tabs>
                    </Grid>
                    {tab === 0 && <Grid item xs={12}>
                        <Grid container spacing={32}>
                            {teams.map((team, i) => (
                                <Grid key={i} item lg={3} sm={6} xs={12}>
                                    <div className="singleTeam">
                                        <img src={team.image} alt="team image" />
                                        <div className="teamInfo">
                                            <h2>{team.name}</h2>
                                            <p>{team.designation}</p>
                                        </div>
                                        <ul className="socialLink">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>}
                    {tab === 1 && <Grid item xs={12}>
                        <Grid container spacing={32}>
                            {teams2.map((team, i) => (
                                <Grid key={i} item lg={3} sm={6} xs={12}>
                                    <div className="singleTeam">
                                        <img src={team.image} alt="team image" />
                                        <div className="teamInfo">
                                            <h2>{team.name}</h2>
                                            <p>{team.designation}</p>
                                        </div>
                                        <ul className="socialLink">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>}
                    {tab === 2 && <Grid item xs={12}>
                        <Grid container spacing={32}>
                            {teams3.map((team, i) => (
                                <Grid key={i} item lg={3} sm={6} xs={12}>
                                    <div className="singleTeam">
                                        <img src={team.image} alt="team image" />
                                        <div className="teamInfo">
                                            <h2>{team.name}</h2>
                                            <p>{team.designation}</p>
                                        </div>
                                        <ul className="socialLink">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>}
                </Grid>
            </Grid >
        )
    }
}
export default LandingPageTeam