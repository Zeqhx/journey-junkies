import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { AuthState } from "../components/UI/AuthModal";
const Login = () => {
  useEffect(() => {
    modals.openContextModal({
      modal: "auth",
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
      innerProps: {
        intitialState: AuthState.LOGIN,
      },
    });
  }, []);
  return <></>;
};

export default Login;
