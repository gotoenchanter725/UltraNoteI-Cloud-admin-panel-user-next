import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';

// components
import LandingPageHeader from './components/header';
import LandingPageHero from './components/hero';
import LandingPageCoinStart from './components/coinStart';
import LandingPageAbout from './components/about';
import LandingPageToken from './components/token'
import LandingPageFund from './components/fund'
import LandingPageTeam from './components/team'
import LandingPageFaq from './components/faqs'
import LandingPageBlog from './components/blog'
import LandingPageFooter from './components/footer'
import './style.scss';

const LandingPageTwo = () => (
    <Fragment>
        <Helmet>
            <title>Landing Page</title>
            <meta name="description" content="Description of LandingPageTwo" />
        </Helmet>
        <Grid className="landingPageTwoMain">
            <LandingPageHeader />
            <LandingPageHero />
            <LandingPageCoinStart />
            <LandingPageAbout />
            <LandingPageToken />
            <LandingPageFund />
            <LandingPageTeam />
            <LandingPageFaq />
            <LandingPageBlog />
            <LandingPageFooter />
        </Grid>
    </Fragment>
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(LandingPageTwo);
