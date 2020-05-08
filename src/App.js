import React, { Component } from 'react';
import Builder from './Containers/Builder/Builder';
import Layout from './Components/Layout/Layout';
import Checkout from './Containers/Checkout/Checkout';
import { Route } from 'react-router';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Authentication/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={Builder} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </div>
    );
  }
}
export default App;
