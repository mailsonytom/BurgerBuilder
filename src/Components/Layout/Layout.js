import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";

const layout = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const SidedrawerClosedHandler = (props) => {
    setSideDrawerIsVisible(false);
  };

  const SidedrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        DrawerToggleClicked={SidedrawerToggleHandler}
      />
      <Sidedrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={SidedrawerClosedHandler}
      />
      <main className={styles.content} role="main">
        {props.children}
      </main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
