import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { AuthState } from "../components/UI/AuthModal";

const Register = () => {
  useEffect(() => {
    modals.openContextModal({
      modal: "auth",
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
      innerProps: {
        intitialState: AuthState.REGISTER,
      },
    });
  }, []);
  return <></>;
};

export default Register;
