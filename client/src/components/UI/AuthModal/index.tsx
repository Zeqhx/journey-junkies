import { Container, Paper } from "@mantine/core";
import Login from "./Login";
import ForgotPassword from "./ResetPassword";
import Register from "./Register";
import { useReducer } from "react";
import { ContextModalProps } from "@mantine/modals";

export enum AuthState {
  LOGIN = "login",
  RESET_PASSWORD = "resetPassword",
  REGISTER = "register",
}

export enum ActionTypes {
  SET_LOGIN = "SET_LOGIN",
  SET_RESET_PASSWORD = "SET_RESET_PASSWORD",
  SET_REGISTER = "SET_REGISTER",
}

const reducer = (state: AuthState, action: ActionTypes) => {
  switch (action) {
    case ActionTypes.SET_LOGIN:
      return AuthState.LOGIN;
    case ActionTypes.SET_RESET_PASSWORD:
      return AuthState.RESET_PASSWORD;
    case ActionTypes.SET_REGISTER:
      return AuthState.REGISTER;
    default:
      return state;
  }
};

const AuthModal = ({
  context: _context,
  id: _id,
  innerProps,
}: ContextModalProps<{ intitialState: AuthState }>) => {
  const [state, dispatch] = useReducer(reducer, innerProps.intitialState);
  const renderCurrentStep = () => {
    switch (state) {
      case AuthState.LOGIN:
        return <Login dispatch={dispatch} />;
      case AuthState.RESET_PASSWORD:
        return <ForgotPassword dispatch={dispatch} />;
      case AuthState.REGISTER:
        return <Register dispatch={dispatch} />;
      default:
        return <Login dispatch={dispatch} />;
    }
  };

  return (
    <Paper>
      <Container size={420} my={24}>
        {renderCurrentStep()}
      </Container>
    </Paper>
  );
};

export default AuthModal;
