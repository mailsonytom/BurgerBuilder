/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import Buildcontrols from "../../Components/Burger/Buildcontrols/Buildcontrols";
import Modal from "../../Components/UI/Modal/Modal";
import Ordersummary from "../../Components/Burger/Ordersummary/Ordersummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import WrappedComponent from "../../hoc/ErrorHandler/ErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../Store/Actions/Index";
import axios from "axios";

const builder = (props) => {
  // constructor(props) {
  //     super.props;
  //     this.state = { ...}
  // }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [purchasing, setpurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => state.Burger.ingredients);
  const price = useSelector((state) => state.Burger.totalPrice);
  const error = useSelector((state) => state.Burger.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onAddIngredient = (ingName) => dispatch(Actions.addIngredient(ingName));
  const onRemoveIngredient = (ingName) =>
    dispatch(Actions.removeIngredient(ingName));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInitIngredient = useCallback(() =>
    dispatch(Actions.initIngredients()), [dispatch]
  );
  const onInitPurchase = () => dispatch(Actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(Actions.setAuthRedirectPath(path));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    onInitIngredient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onInitIngredient]);

  const updatePurchaseState = (ingredients) => {
    // const ingredients = {
    //     ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setpurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
      // Direct to auth component
    }
  };

  const purchaseCancelHandler = () => {
    setpurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let ordersummary = null;

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <Buildcontrols
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </Aux>
    );
    ordersummary = (
      <Ordersummary
        ingredients={ings}
        price={price}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {ordersummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default WrappedComponent(builder, axios);
