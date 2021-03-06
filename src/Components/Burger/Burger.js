import React from 'react';
import styles from '../Burger/Burger.module.css';
import BurgerIngredients from './BurgerIngredents/Burgeringredients';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredients key={igKey + 1} type={igKey} />
        });
    })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default Burger;