import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Route Setting
import PrivateRoute from 'containers/_PrivateRoute/Loadable';
import PublicRoute from 'containers/_PublicRoute/Loadable';

// Normal Route
import LandingPage from 'containers/LandingPage/Loadable';
import LandingPageTwo from 'containers/LandingPageTwo/index'

// PrivateRoute

// PublicRoute
import LoginPage from 'components/LoginPage/Loadable';
import SignupPage from 'components/SignupPage/Loadable';
import ForgotPasswordPage from 'components/ForgotPasswordPage/Loadable';
import ConfirmCodePage from 'components/ConfirmCodePage/Loadable';

// icons
import DashboardIcon from 'images/icon/breadcrumb/dashboard.svg';
import UserIcon from 'images/icon/breadcrumb/user.svg';
import BuyCoinIcon from 'images/icon/breadcrumb/buy-coin.svg';
import MyWalletIcon from 'images/icon/breadcrumb/my-wallet.svg';
import SettingsIcon from 'images/icon/breadcrumb/settings.svg';
import AddressBookIcon from 'images/icon/breadcrumb/address-book.png';
import MessageIcon from 'images/icon/breadcrumb/message.png';
import BillingIcon from 'images/icon/breadcrumb/invoice.png';
import ReferralIcon from 'images/icon/breadcrumb/referral.svg';

import MyProfile from '../MyProfile';
import DashboardPage from '../DashboardPage/Loadable';
import BuyCoin from '../BuyCoin';
import MyWallet from '../MyWallet';
import Settings from '../Settings';
import AddressBook from '../AddressBook';
import Messages from '../Messages';
import Billing from '../Billing';
import { Referral } from '../Referral';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute
                path="/dashboard"
                icon={DashboardIcon}
                title="Dashboard"
                component={DashboardPage}
            />
            <PrivateRoute
                path="/my-profile"
                icon={UserIcon}
                title="My Profile"
                component={MyProfile}
            />
            <PrivateRoute
                path="/buy-coin"
                icon={BuyCoinIcon}
                title="Buy Coin"
                component={BuyCoin}
            />
            <PrivateRoute
                path="/my-wallet"
                icon={MyWalletIcon}
                title="My Wallet"
                component={MyWallet}
            />
            <PrivateRoute
                path="/settings"
                icon={SettingsIcon}
                title="Settings"
                component={Settings}
            />
            <PrivateRoute
                path="/address-book"
                icon={AddressBookIcon}
                title="Address Book"
                component={AddressBook}
            />
            <PrivateRoute
                path="/messages"
                icon={MessageIcon}
                title="Messages"
                component={Messages}
            />
            <PrivateRoute
                path="/billing"
                icon={BillingIcon}
                title="Billing"
                component={Billing}
            />
            <PrivateRoute
                path="/referral"
                icon={ReferralIcon}
                title="Referral"
                component={Referral}
            />

            <PublicRoute exact path="/" component={LandingPage} />
            <PublicRoute exact path="/login" component={LoginPage} />
            <PublicRoute exact path="/login/:msg" component={LoginPage} />
            <PublicRoute path="/signup" component={SignupPage} />
            <PublicRoute path="/forgot-password/:token" component={ForgotPasswordPage} />
            <PublicRoute path="/confirm-code/:token" component={ConfirmCodePage} />

            <Route path="/landingpage" component={LandingPage} />
            <Route path="/landingpage-two" component={LandingPageTwo} />

            <Route exact component={LoginPage} />
        </Switch>
    );
}
