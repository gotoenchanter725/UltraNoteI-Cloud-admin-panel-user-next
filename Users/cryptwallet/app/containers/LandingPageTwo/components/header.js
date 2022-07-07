import React, { Fragment, Component } from 'react'
import {
    Grid,
    Button,
    List,
    ListItem,
    Hidden,
    IconButton,
    Typography,
    MenuList
} from '@material-ui/core'
import { Link, animateScroll as scroll } from 'react-scroll';
import FontAwesome from 'components/uiStyle/FontAwesome';
import Image from 'components/uiStyle/Images';

// images 
import logo from 'images/logo.svg';


const mainMenu = [
    { menu: 'Home', id: 'home' },
    { menu: 'About', id: 'about' },
    { menu: 'Token', id: 'token' },
    { menu: 'Team', id: 'team' },
    { menu: 'Blog', id: 'blog' },
];

class LandingPageHeader extends Component {
    state = {
        sideMenu: false,
    }
    sMenuHandler = () => {
        const sideMenu = this.state.sideMenu;
        this.setState({
            sideMenu: !sideMenu,
        });
    };

    sMenuHandleClose = () => {
        this.setState({
            sideMenu: false,
        });
    };
    render() {
        return (
            <Fragment>
                <header className="headerArea" >
                    <Grid
                        container
                        spacing={32}
                        className="container">
                        <Grid item xs={6}>
                            <Grid className="logoWrap">
                                <Image src={logo} alt="logo" />
                            </Grid>
                        </Grid>
                        <Hidden smDown>
                            <Grid item lg={6}>
                                <List className="mainMenu">
                                    {mainMenu.map(menu => (
                                        <ListItem key={menu.id}>
                                            <Link
                                                activeClass="active"
                                                spy
                                                smooth
                                                offset={0}
                                                duration={1000}
                                                to={menu.id}
                                            >
                                                {menu.menu}
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Hidden>
                        <Hidden mdUp>
                            <Grid item xs={6}>
                                <IconButton
                                    className="hamBurger"
                                    onClick={this.sMenuHandler}
                                >
                                    <FontAwesome name={this.state.sideMenu ? 'times' : 'bars'} />
                                </IconButton>
                            </Grid>
                        </Hidden>
                    </Grid>
                </header>
                <Typography
                    onClick={this.sMenuHandleClose}
                    component="div"
                    className="backDrop"
                />
                <Hidden mdUp>
                    <Grid
                        className={`sidebarMenu ${
                            this.state.sideMenu ? 'showSidebar' : ''
                            }`}
                    >
                        <MenuList>
                            {mainMenu.map(menu => (
                                <ListItem key={menu.id}>
                                    <Link
                                        activeClass="active"
                                        spy
                                        smooth
                                        offset={0}
                                        duration={1000}
                                        to={menu.id}
                                    >
                                        {menu.menu}
                                    </Link>
                                </ListItem>
                            ))}
                        </MenuList>
                    </Grid>
                </Hidden>
            </Fragment>
        )
    }

}
export default LandingPageHeader