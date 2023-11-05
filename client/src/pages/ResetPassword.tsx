import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { AuthState } from "../components/UI/AuthModal";

const ResetPassword = () => {
  useEffect(() => {
    modals.openContextModal({
      modal: "auth",
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
      innerProps: {
        intitialState: AuthState.RESET_PASSWORD,
      },
    });
  }, []);
  return <></>;
};

export default ResetPassword;
