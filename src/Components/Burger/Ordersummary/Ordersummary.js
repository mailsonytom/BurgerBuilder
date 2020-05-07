import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class Ordersummary extends Component {
    componentWillUpdate(){
        console.log('[Ordersummary]')
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igKey => {
                return <li key={igKey}><span>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            }
        );
        return (
            <Aux>
                <h3>Your order</h3>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}


export default Ordersummary;