import React, { useEffect } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/Index";
import Spinner from "../../Components/UI/Spinner/Spinner";

const orders = (props) => {
  const { onFetchOrders } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    onFetchOrders(props.token, props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchOrders]);

  let Orders = <Spinner />;
  if (!props.loading) {
    Orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{Orders}</div>;
};
const mapStateToProps = (state) => {
  return {
    orders: state.Order.orders,
    loading: state.Order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(orders, axios));
