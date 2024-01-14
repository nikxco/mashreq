import {
  Alert,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContentProps,
} from "@mui/material";
import { SyntheticEvent } from "react";

interface AppSnackbarProps extends SnackbarContentProps {
  open: boolean;
  severity?: "info" | "error" | "warning" | "success";
  onClose?: (
    e?: Event | SyntheticEvent<any>,
    reason?: SnackbarCloseReason
  ) => void;
}
const AppSnackbarComponent = ({
  open,
  message,
  sx,
  action,
  severity,
  onClose,
}: AppSnackbarProps) => {
  const handleClose = (
    e?: Event | SyntheticEvent<any>,
    reason?: SnackbarCloseReason
  ) => {
    if (onClose) {
      onClose(e, reason);
    }
  };
  return (
    <Snackbar
      autoHideDuration={6000}
      open={open}
      sx={{ ...sx }}
      message={message}
      action={action}
      TransitionComponent={Slide}
      onClose={handleClose}
    />

  );
};

export default AppSnackbarComponent;
