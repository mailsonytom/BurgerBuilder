import React from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Aux";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const ErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default ErrorHandler;
