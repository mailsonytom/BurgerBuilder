import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/Index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let Orders = <Spinner />
        if (!this.props.loading) {
            Orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
                {Orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.Order.orders,
        loading: state.Order.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));