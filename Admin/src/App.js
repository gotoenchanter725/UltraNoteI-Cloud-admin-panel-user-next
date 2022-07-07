import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
/// Components
import Markup from "./jsx";

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { connect } from "react-redux";
import { withResizeDetector } from "react-resize-detector";
import LoginPage from "./pages/Login";
import ThemeContextProvider from "./context/ThemeContext";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/Register";
import UserList from "./pages/UserManagement/UserList";
import UserEdit from "./pages/UserManagement/UserEdit";
import UserTransactions from "./pages/UserManagement/UserTransactions";
import ForgotPasswordPage from "./pages/forgotpassword";
import { createStructuredSelector } from "reselect";
import ResetPasswordPage from "./pages/resetpassword";
import GoogleAuthEmailPage from "./pages/GoogleEmail";
import GoogleAuthEnticatorSecretCodePage from "./pages/GoogleAuthticatorSecretCode";
import { selectUserToken } from "./redux/user/user.selectors";
import MassEmailPage from "./pages/MassEmail/MassEmail";
import SettingsPage from "./pages/Settings";
import NotificationsContextProvider from "./context/NotificationsContext";

// import {setCurrentUser} from './redux/user/user.actions';
const App = (props) => {
  const {width, token} = props;
  const body = document.querySelector("body");
  //useEffect(() => {
  //   body.setAttribute("data-typography", "poppins");
  //   body.setAttribute("data-theme-version", "light");
  //   body.setAttribute("data-layout", "vertical");
  //   body.setAttribute("data-nav-headerbg", "color_1");
  //   body.setAttribute("data-headerbg", "color_1");
  //   body.setAttribute("data-sidebar-style", "overlay");
  //   body.setAttribute("data-sibebarbg", "color_1");
  //   body.setAttribute("data-primary", "color_1");
  //   body.setAttribute("data-sidebar-position", "fixed");
  //   body.setAttribute("data-header-position", "fixed");
  //   body.setAttribute("data-container", "wide");
  //   body.setAttribute("direction", "ltr");

  //   width >= 768 && width < 1300
  //     ? body.setAttribute("data-sidebar-style", "mini")
  //     : width <= 768
  //     ? body.setAttribute("data-sidebar-style", "overlay")
  //     : body.setAttribute("data-sidebar-style", "full");
  // }, [width]);
  
  return (
    <ThemeContextProvider>
      <NotificationsContextProvider portalURL={props.portalURL} token={token}>
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route
          exact
          path="/"
          render={(props1) => (token ? <Redirect to="/dashboard" /> : <LoginPage {...props1} {...props} />)}
        />
        <Route
          exact
          path="/dashboard"
          render={(props1) => (token ? <DashboardPage {...props} {...props1} /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/profile-details"
          // render={(props1) => (token ? <ProfilePage/> : <Redirect to="/" />)}
        >
          {token ? <ProfilePage {...props}/> : <Redirect to="/" />}
          </Route>
        <Route
         exact
         path="/settings"
         render={(props1)=>(token ? <SettingsPage {...props} {...props1}/>: <Redirect to="/" />)}
        />
        <Route exact path="/users">
          {token ? <UserList {...props}/>: <Redirect to="/" />}
        </Route>
        
        <Route
          path="/users/:id/transactions"
          render={(props1) => {
            props1.token = token ? token : null;
            return <UserTransactions {...props1} {...props} />;
          }}
        />
        <Route
          path="/users/:id"
          render={(props1) => {
            props1.token = token ? token : null;
            return <UserEdit {...props} {...props1} />;
          }}
        />
        <Route
          exact
          path="/mass-email"
          render={(props1) =>
            token ? <MassEmailPage token={token.token} portalURL={props.portalURL} {...props1} /> : <Redirect to="/" />
          }
        />
        <Route path="/forgotpassword" 
        // component={ForgotPasswordPage} 
        render={(props1)=><ForgotPasswordPage {...props} {...props1}/>}
        />
        <Route
          path="/reset-password/:id/:token"
//          component={ResetPasswordPage}
          render = {(props1)=><ResetPasswordPage {...props1} {...props}/>}
        />
        <Route path="/googleauthicator" 
        //component={GoogleAuthEmailPage} 
        render = {(props1)=><GoogleAuthEmailPage {...props} {...props1}/>}
        />
        <Route
          path="/googleverifycode"
          // component={GoogleAuthEnticatorSecretCodePage}
          render = {(props1)=><GoogleAuthEnticatorSecretCodePage {...props} {...props1}/>}
        />
        {/* <Route path="/markmili" component={Markup} />  */}
      </Switch>
      </NotificationsContextProvider>
    </ThemeContextProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectUserToken,
});
// const mapDispatchToProps = dispatch => ({
//   setCurrentUser:user => dispatch(setCurrentUser(user))
//   });

export default connect(mapStateToProps)(withResizeDetector(App));
