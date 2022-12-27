import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { isAuthenticated } from "./store/action/index";
import PrivateRoute from "./store/util/privateRoute";

import LandingPage from "./component/Main/LandingPage";
import Login from "./component/Main/Auth/login";
import ForgotPassword from "./component/Main/Auth/fpassword";
import RegistrationForm from "./component/Main/Auth/register";
import Create from "./component/Main/Project/Create";
import Manage from "./component/Main/Project/Manage/index";
import Calendar from "./component/Main/Calendar/index";
import Profile from "./component/Main/Profile/Profile";
import Account from "./component/Main/Settings/Account";
import Admin from "./component/Main/Admin";
import MyProjects from "./component/Main/Project";
import UserList from "./component/Main/Admin/Users";
import EditUser from "./component/Main/Admin/Users/Manage";
import Logs from "./component/Main/Admin/Logs";

const userLevelNames = {
  csm: "Costumer",
  emp: "Employee",
  owner: "Owner",
};

const { csm, emp, owner } = userLevelNames;

const Routes = (props) => {
  const { isAccessibleFor } = props;

  return (
    <Switch>
      <Route path={`/login`} component={Login} />
      <Route path={`/register`} component={RegistrationForm} />
      <Route path={"/fpassword"} component={ForgotPassword} />
      <PrivateRoute
        exact
        path={`/profile`}
        component={Profile}
        accessFunction={() => isAccessibleFor([csm])}
      />
      <PrivateRoute
        exact
        path={`/account`}
        component={Account}
        accessFunction={() => isAccessibleFor([csm, emp, owner])}
      />
      <PrivateRoute
        path={"/calendar"}
        component={Calendar}
        accessFunction={() => isAccessibleFor([csm, owner])}
      />
      <PrivateRoute
        path={"/create"}
        component={Create}
        accessFunction={() => isAccessibleFor([csm, owner])}
      />
      <PrivateRoute
        path={"/projects"}
        component={MyProjects}
        accessFunction={() => isAccessibleFor([csm, owner])}
      />
      <PrivateRoute
        path={"/admin"}
        component={Admin}
        accessFunction={() => isAccessibleFor([owner])}
      />
      <PrivateRoute
        exact
        path={"/users"}
        component={UserList}
        accessFunction={() => isAccessibleFor([owner])}
      />
      <PrivateRoute
        exact
        path={"/users/manage/:userId"}
        component={EditUser}
        accessFunction={() => isAccessibleFor([owner])}
      />
      <PrivateRoute
        exact
        path={"/logs"}
        component={Logs}
        accessFunction={() => isAccessibleFor([owner])}
      />
      <PrivateRoute
        exact
        path={"/manage/:project_id"}
        component={Manage}
        accessFunction={() => isAccessibleFor([csm, emp, owner])}
      />
      <Route exact path="/" component={LandingPage} />
      {/* <Route path={`/logout`} component={Logout} />  */}
    </Switch>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    authUser: state.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isAccessibleFor: (props) => dispatch(isAuthenticated(props)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Routes);
