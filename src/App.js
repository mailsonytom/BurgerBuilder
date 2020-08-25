import React, { useEffect, Suspense } from "react";
import Builder from "./Containers/Builder/Builder";
import Layout from "./Components/Layout/Layout";
import { Route, withRouter, Switch, Redirect } from "react-router";
import Logout from "./Containers/Authentication/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./Store/Actions/Index";

const Checkout = React.lazy(() => {
  return import("./Containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./Containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./Containers/Authentication/Auth");
});

const app = (props) => {
  const { onTryAutoSignup } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={Builder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Builder} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
