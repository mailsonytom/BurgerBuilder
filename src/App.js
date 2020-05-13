import React, { Component } from 'react';
import Builder from './Containers/Builder/Builder';
import Layout from './Components/Layout/Layout';
import Checkout from './Containers/Checkout/Checkout';
import { Route, withRouter } from 'react-router';
import Orders from './Containers/Orders/Orders';
import Logout from './Containers/Authentication/Logout/Logout';
import Auth from './Containers/Authentication/Auth';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/Index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={Builder} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
