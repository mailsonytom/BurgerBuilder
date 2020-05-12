import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import Buildcontrols from '../../Components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../Components/UI/Modal/Modal';
import Ordersummary from '../../Components/Burger/Ordersummary/Ordersummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WrappedComponent from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as Actions from '../../Store/Actions/Index';
import axios from 'axios';

class Builder extends Component {
    // constructor(props) {
    //     super.props;
    //     this.state = { ...}
    // }

    state = {
        purchasing: false,

    }
    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredient();
    }

    updatePurchaseState(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
            // Direct to auth component
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let ordersummary = null;


        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <Buildcontrols
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Aux>
            );
            ordersummary =
                <Ordersummary ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.Burger.ingredients,
        price: state.Burger.totalPrice,
        error: state.Burger.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(Actions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(Actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(Actions.initIngredients()),
        onInitPurchase: () => dispatch(Actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WrappedComponent(Builder, axios));