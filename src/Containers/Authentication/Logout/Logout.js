import React, { useEffect } from "react";
import * as actions from "../../../Store/Actions/Index";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const logout = (props) => {
  const { onLogout } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(logout);
